<?php
class Usuario {
    private $id;
    private $login;
    private $senha;
    private $nome;

    public function login(Db $banco, $login, $senha) {
        $where = "login = '" . addslashes($login) . "' AND senha = '" . md5($senha) . "'";
        $resultado = $banco->consultar("*", $where);
        if ($resultado && count($resultado) > 0) {
            return $resultado[0];
        }
        return false;
    }

    public function getId() { return $this->id; }
    public function getLogin() { return $this->login; }
    public function getNome() { return $this->nome; }
}
?>
