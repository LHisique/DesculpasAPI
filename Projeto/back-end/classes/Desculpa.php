<?php
class Desculpa {
    private $id;
    private $frase;

    public function gravar(Db $banco) {
        $dados = [];
        $dados["frase"] = $this->frase;
        return $banco->gravar($dados);
    }

    public function alterar($where, Db $banco) {
        $dados = [];
        if (!empty($this->frase)) $dados["frase"] = $this->frase;
        return $banco->alterar($where, $dados);
    }

    public function excluir($where, Db $banco) {
        return $banco->excluir($where);
    }

    public function consultar(Db $banco, $where) {
        return $banco->consultar("*", $where);
    }

    public function consultarTodos(Db $banco) {
        return $banco->consultar("*", "");
    }
    
    public function sortear(Db $banco) {
        // Ordena aleatoriamente e pega 1 usando o parâmetro $order e $limit do Db.php
        return $banco->consultar("*", "", "RAND()", "1");
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function setFrase($frase) {
        $this->frase = $frase;
    }
}
?>
