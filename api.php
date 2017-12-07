<?php
require_once('./Carro.class.php');

if( !isset($_SESSION["carros"]) ) {
    $_SESSION["carros"] = array();
}

if( isset($_GET['view_all']) ) {
    echo json_encode($_SESSION['carros']);    
}

if( !isset($_POST['id']) &&
    isset($_POST['marca']) &&
    isset($_POST['modelo']) &&
    isset($_POST['ano']) ) {

    $marca = $_POST['marca'];
    $modelo = $_POST['modelo'];
    $ano = $_POST['ano'];

    $id = count($_SESSION["carros"]);
    $id += 1;
    $carro = new Carro();
    $carro->setId($id);    
    $carro->setMarca($marca);
    $carro->setModelo($modelo);
    $carro->setAno($ano);

    array_push($_SESSION["carros"], $carro);
    echo json_encode($carro);
        
}

if( isset($_POST['id']) &&
    isset($_POST['marca']) &&
    isset($_POST['modelo']) &&
    isset($_POST['ano']) ) {
        
    $id = $_POST['id'];
    $marca = $_POST['marca'];
    $modelo = $_POST['modelo'];
    $ano = $_POST['ano'];

    $carros = $_SESSION["carros"];

    foreach($carros as $carro) {
        if( $carro->id == $id ) {
            $carro->marca = $marca;
            $carro->modelo = $modelo;
            $carro->ano = $ano;
            echo json_encode($carro);
        }
    }   

}

if( isset($_GET['view']) ) {
    $id = $_GET['view'];
    $carros = $_SESSION["carros"];
    foreach($carros as $carro) {
        if( $carro->id == $id ) {
            echo json_encode($carro);    
        }
    }   
}

if( isset($_GET['edit']) ) {
    $id = $_GET['edit'];
    $carros = $_SESSION["carros"];
    foreach($carros as $carro) {
        if( $carro->id == $id ) {
            echo json_encode($carro);    
        }
    }   
}

if( isset($_GET['del']) ) {
    $id = $_GET['del'];
    $carros = $_SESSION["carros"];
    foreach($carros as $carro) {
        if( $carro->id == 1 ) {
            array_shift($_SESSION["carros"]);     
        } else {
            unset($_SESSION["carros"][$id-1]);
        }
    }
}
?>