<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../classes/Db.php';
require_once '../classes/Usuario.php';

$data = json_decode(file_get_contents("php://input"));

if(isset($data->nome) && isset($data->login) && isset($data->senha)) {
    
    if(empty(trim($data->nome)) || empty(trim($data->login)) || empty(trim($data->senha))) {
        echo json_encode(["erro" => "Todos os campos são obrigatórios"]);
        exit;
    }

    try {
        $db = new Db();
        $conexao = $db->conectar();
        
        $usuario = new Usuario($conexao);
        $usuario->nome = htmlspecialchars(strip_tags($data->nome));
        $usuario->login = htmlspecialchars(strip_tags($data->login));
        // A senha no nosso login.php usa md5, então vamos salvar usando md5 para ser compatível
        $usuario->senha = md5($data->senha);

        // Verifica se login já existe
        $check = $conexao->prepare("SELECT id FROM usuarios WHERE login = :login");
        $check->bindParam(':login', $usuario->login);
        $check->execute();
        
        if($check->rowCount() > 0) {
            echo json_encode(["erro" => "Este login já está em uso"]);
            exit;
        }

        $query = "INSERT INTO usuarios (nome, login, senha) VALUES (:nome, :login, :senha)";
        $stmt = $conexao->prepare($query);
        $stmt->bindParam(':nome', $usuario->nome);
        $stmt->bindParam(':login', $usuario->login);
        $stmt->bindParam(':senha', $usuario->senha);
        
        if($stmt->execute()) {
            echo json_encode(["sucesso" => true, "mensagem" => "Usuário cadastrado com sucesso"]);
        } else {
            echo json_encode(["erro" => "Erro ao cadastrar usuário"]);
        }
    } catch(PDOException $e) {
        echo json_encode(["erro" => "Erro de banco de dados: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["erro" => "Dados incompletos"]);
}
?>
