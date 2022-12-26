<?php
class DataBase{
    private $conexion;
    public $error;

function __construct($host, $user, $pass, $database)
{
    if(!$this->_connect($host, $user, $pass,$database)){
        $this->error = $this->conexion->connect_error;
        
    }
    
}
private function _connect($hostname, $username, $password, $database){
    $this->conexion = new mysqli($hostname, $username, $password, $database);
}



}