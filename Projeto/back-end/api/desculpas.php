<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit; }

require_once("../classes/Db.php");
require_once("../classes/Desculpa.php");

$db = new Db();
$db->conectar();
$db->setTabela("desculpas");

$desculpa = new Desculpa();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['random'])) {
            $resultado = $desculpa->sortear($db);
            if ($resultado && count($resultado) > 0) {
                echo json_encode(["frase" => $resultado[0]["frase"]]);
            } else {
                echo json_encode(["erro" => "Nenhuma desculpa encontrada."]);
            }
        } else {
            $resultado = $desculpa->consultarTodos($db);
            echo json_encode($resultado);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        if (!empty($data->frase)) {
            $desculpa->setFrase($data->frase);
            if ($desculpa->gravar($db)) {
                echo json_encode(["status" => "success", "message" => "Desculpa criada."]);
            } else {
                echo json_encode(["status" => "error", "message" => "Erro ao criar."]);
            }
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));
        if (!empty($data->id) && !empty($data->frase)) {
            $desculpa->setFrase($data->frase);
            $where = "id = " . intval($data->id);
            if ($desculpa->alterar($where, $db)) {
                echo json_encode(["status" => "success", "message" => "Desculpa atualizada."]);
            } else {
                echo json_encode(["status" => "error", "message" => "Erro ao atualizar."]);
            }
        }
        break;

    case 'DELETE':
        if (!empty($_GET['id'])) {
            $where = "id = " . intval($_GET['id']);
            if ($desculpa->excluir($where, $db)) {
                echo json_encode(["status" => "success", "message" => "Desculpa removida."]);
            } else {
                echo json_encode(["status" => "error", "message" => "Erro ao remover."]);
            }
        }
        break;
}
?>
