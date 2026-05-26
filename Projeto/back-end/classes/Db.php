<?php
class Db {
    private $host, $porta, $usudb, $nomedb, $senhadb, $conexao, $tabela;

    public function __construct($host="127.0.0.1", $porta="3306", $usudb="root", $nomedb="desculpas_db", $senhadb="") {
        $this->host = $host;
        $this->porta = $porta;
        $this->usudb = $usudb;
        $this->nomedb = $nomedb;
        $this->senhadb = $senhadb;
    }

    public function conectar() {
        $dsn = "mysql:host={$this->host};port={$this->porta};dbname={$this->nomedb}";
        try {
            $this->conexao = new PDO($dsn, $this->usudb, $this->senhadb);
        } catch(PDOException $e) {
            $this->conexao = null;
        }
    }

    public function setTabela($tabela = null) {
        $this->tabela = $tabela;
    }

    public function consultar($campos = '*', $where = null, $order = null, $limit = null) {
        $where = $where ? "WHERE $where" : "";
        $order = $order ? "ORDER BY $order" : "";
        $limit = $limit ? "LIMIT $limit" : "";
        return $this->executaSQL("SELECT $campos FROM {$this->tabela} $where $order $limit");
    }

    public function totalRegistros() {
        return $this->executaSQL("SELECT count(*) as totalReg FROM {$this->tabela}");
    }

    public function executaSQL($query) {
        $dados = [];
        try {
            $this->conexao->beginTransaction();
            $resultado = $this->conexao->query(trim($query));
            $this->conexao->commit();
            if ($resultado) {
                while($row = $resultado->fetch(PDO::FETCH_ASSOC)) $dados[] = $row;
            }
        } catch (PDOException $e) {
            $this->conexao->rollBack();
        }
        return $dados;
    }

    public function gravar($dados = []) {
        $campos = implode(",", array_keys($dados));
        $valores = implode("','", array_values($dados));
        return $this->executaSQL("INSERT INTO {$this->tabela} ($campos) VALUES ('$valores')");
    }

    public function alterar($where = null, $dados = []) {
        if (!$where) return false;
        $valores = [];
        foreach($dados as $k => $v) $valores[] = "$k='$v'";
        return $this->executaSQL("UPDATE {$this->tabela} SET " . implode(',', $valores) . " WHERE $where");
    }

    public function excluir($where = null) {
        return $where ? $this->executaSQL("DELETE FROM {$this->tabela} WHERE $where") : false;
    }
}
?>