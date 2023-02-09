<?php
require 'flight/Flight.php';
require 'config.php';

// Incluir archivo usuarios.php
require 'controllers/usuarios.php';

Flight::register('db', 'PDO', array('mysql:host='.SERVIDOR.';dbname='.BASE, USUARIO, PASS));

Flight::route('GET /', function(){
    echo 'I received a GET request.';
});

Flight::start();
