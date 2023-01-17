<?php
require 'flight/Flight.php';
require 'config.php';

Flight::register('db', 'PDO', array('mysql:host='.SERVIDOR.';dbname='.BASE, USUARIO, PASS));

Flight::route('GET /', function(){
    echo 'I received a GET request.';
});

Flight::route('POST /', function(){
    echo 'I received a POST request.';
});

Flight::route('GET /usuarios', function () {
    $sql= "SELECT * FROM usuarios WHERE usuario_baja is null";
    $sentencia = Flight::db()->prepare($sql);
    $sentencia->execute();
    $datos=$sentencia->fetchAll();

    //response
    $response=[];
    foreach($datos as $row){
        $response[] = [
            "ID"=>$row['id'], 
            "Nombre"=>$row['usuario_nombre'],
            "Apellido"=>$row['usuario_apellido'],
            "Correo"=>$row['usuario_email'],
            "Fecha de Nacimiento"=>$row['usuario_fecha_nac'],
            "Fecha de Alta"=>$row['usuario_alta']
        ];
    }

    Flight::json($response);
});//obtener todos los usuarios

Flight::route('GET /usuarios/@id', function ($id){
    //se verifica que el valor ingresado sea un numero

    if (!ctype_digit($id)) {
        //Flight::json(["msj"=>"ERROR, debe ingresar un numero como parametro"]);
        Flight::halt(400, json_encode(["msj"=>"ERROR, debe ingresar un numero como parametro"]));
    } else {
        

        $sql= "SELECT * FROM usuarios WHERE usuario_baja is null and id =".$id.";";
        $sentencia = Flight::db()->prepare($sql);
        $sentencia->execute();
        $datos=$sentencia->fetch();

        $response[] = [
            "ID"=>$datos['id'], 
            "Nombre"=>$datos['usuario_nombre'],
            "Apellido"=>$datos['usuario_apellido'],
            "Correo"=>$datos['usuario_email'],
            "Fecha de Nacimiento"=>$datos['usuario_fecha_nac'],
            "Fecha de Alta"=>$datos['usuario_alta']
        ];

        Flight::json($response);
    }
});//obtener un solo usuario

Flight::route('POST /usuarios', function () {
    $nombre= (Flight::request()->data->nombre);
    $email= (Flight::request()->data->email);
    $apellido= (Flight::request()->data->apellido);

    //fecha nacimiento
    $fecha_nacimiento= (Flight::request()->data->fecha_nacimiento);
    $fecha_nac = DateTime::createFromFormat('d/m/Y', $fecha_nacimiento);
    $date_string = $fecha_nac->format('Y-m-d');

    //fecha alta usuario
    $hoy = new DateTime();
    $hoy_string = $hoy->format('Y-m-d');

    $password= (Flight::request()->data->password);
    $pas_str = strval($password); //para que no haya injeccion de codigo, se pasa todo a string
    $user_pass =  password_hash($pas_str, PASSWORD_BCRYPT);// se encrypta

    $sql = "INSERT INTO `usuarios`(`id`, `usuario_nombre`, `usuario_apellido`, `usuario_email`, `usuario_pass`,`usuario_fecha_nac`, `usuario_alta`) VALUES (DEFAULT,?,?,?,?,?,?)";
    $sentencia = Flight::db()->prepare($sql);
    $sentencia->bindParam(1,$nombre);
    $sentencia->bindParam(2,$apellido);
    $sentencia->bindParam(3,$email);
    $sentencia->bindParam(4,$user_pass);
    $sentencia->bindParam(5,$date_string);
    $sentencia->bindParam(6,$hoy_string);
    $sentencia->execute();
    $id = Flight::db()->lastInsertId();

    $sql_return= "SELECT `id`, `usuario_nombre`, `usuario_apellido`, `usuario_email`  FROM `usuarios` WHERE `id` = ".$id.";";
    $sentencia_return= Flight::db()->prepare($sql_return);
    $sentencia_return->execute();
    $datos=$sentencia_return->fetch();

    $response = [
        "msj"=>"Usuario creado exitosamente",
        "ID"=>$datos['id'], 
        "Nombre"=>$datos['usuario_nombre'],
        "Apellido"=>$datos['usuario_apellido'],
        "Correo"=>$datos['usuario_email']
    ];
    Flight::json($response);
    
});//agregar nuevo usuario

//actualizar un usuario

//borrar un usuario

//recuperar un usuario

//cambiar clave de un usuario

//recuperar clave de un usuario


Flight::start();
