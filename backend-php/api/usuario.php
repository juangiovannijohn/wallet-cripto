<?php
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['id'])) {
        //podria llamat a un metodo de la clase usuarios y traer un solo usuario
        header("HTTP/1.1 201 UN SOLO USUARIO");
        echo json_encode( ['Usuario ID' => $_GET['id']]);
        exit();
    }
    header("HTTP/1.1 200 Todos los usuatios");
    echo json_encode( [ "hola" => 'como estas'] );
    exit();
}
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    if ($_SERVER['CONTENT_TYPE'] == 'application/json') {
        $params = json_decode(file_get_contents('php://input'), true);
        $email = $params['email'];
        $password = $params['password'];
        $nombre = $params['nombre'];
        $apellido = $params['apellido'];
        $cbu = $params['cbu'];
    }else
    if ($_SERVER['CONTENT_TYPE'] == 'multipart/form-data' || $_SERVER['CONTENT_TYPE'] == 'application/x-www-form-urlencoded' ) {
        $email = $_POST['email'];
        $password = $_POST['password'];
        $nombre = $_POST['nombre'];
        $apellido = $_POST['apellido'];
        $cbu = $_POST['cbu'];
    } else{
        $params = ["Error" => "Los formatos permitidos son: application/json y application/x-www-form-urlencoded"];
    }
        //podria llamat a un metodo de la clase usuarios y traer un solo usuario
        header("HTTP/1.1 201");
        echo json_encode($password);
        exit();
    
}

