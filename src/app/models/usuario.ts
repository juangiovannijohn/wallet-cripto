import * as internal from "stream";

export class Usuario
{
    idUsuario:number;
    email:string;
    password:string;
    nombre:string;
    apellido:string;

    constructor(idUsuario:number,email:string,password:string,nombre:string,apellido:string){
        this.idUsuario = idUsuario;
        this.email = email;
        this.password = password;
        this.nombre = nombre;
        this.apellido = apellido;
    }
}