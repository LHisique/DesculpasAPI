<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once("classes/Db.php");
require_once("classes/Desculpa.php");

// Configuração do banco. Mude caso seu XAMPP tenha outra senha/database.
$db = new Db("127.0.0.1", "3306", "root", "desculpasapi", "");
$db->conectar();
$db->setTabela("desculpas");

$desculpaModel = new Desculpa();
$resultado = $desculpaModel->sortear($db);

if ($resultado && count($resultado) > 0) {
    echo json_encode(["frase" => $resultado[0]["frase"]]);
} else {
    echo json_encode(["erro" => "deu ruim com o database"]);
}
?>
