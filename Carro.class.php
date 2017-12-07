<?php
session_start();
// session_destroy();


class Carro {

    public $id;
    public $marca;
    public $modelo;
    public $ano;

    public function getId() {
        return $this->id;
    }

    public function setId( $id ) {
        $this->id = $id;
    }

    public function getMarca() {
        return $this->marca;
    }

    public function setMarca( $marca ) {
        $this->marca = $marca;
    }

    public function getModelo() {
        return $this->modelo;
    }

    public function setModelo( $modelo ) {
        $this->modelo = $modelo;
    }

    public function getAno() {
        return $this->ano;
    }

    public function setAno( $ano ) {
        $this->ano = $ano;
    }
}


?>

