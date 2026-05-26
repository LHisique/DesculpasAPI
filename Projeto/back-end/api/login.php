<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit; }

require_once("../classes/Db.php");
require_once("../classes/Usuario.php");

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->login) && !empty($data->senha)) {
    $db = new Db();
    $db->conectar();
    $db->setTabela("usuarios");
    
    $usuario = new Usuario();
    $logado = $usuario->login($db, $data->login, $data->senha);
    
    if ($logado) {
        echo json_encode(["status" => "success", "nome" => $logado['nome']]);
    } else {
        echo json_encode(["status" => "error", "message" => "Login ou senha inválidos."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Dados incompletos."]);
}
?>
