<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit; }

require_once("../classes/Db.php");
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->login) && !empty($data->senha) && !empty($data->nome)) {
    $db = new Db();
    $db->conectar();
    $db->setTabela("usuarios");
    
    if ($db->consultar("id", "login = '" . addslashes($data->login) . "'")) {
        echo json_encode(["erro" => "Login em uso"]);
        exit;
    }

    $gravou = $db->gravar([
        "nome" => addslashes($data->nome),
        "login" => addslashes($data->login),
        "senha" => md5($data->senha)
    ]);
    
    echo json_encode($gravou !== null ? ["sucesso" => true] : ["erro" => "Erro no cadastro"]);
} else {
    echo json_encode(["erro" => "Dados incompletos"]);
}
?>
