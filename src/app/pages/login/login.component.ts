import { APP_BASE_HREF } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router, RouterLink } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioLogueadoService } from 'src/app/services/usuario-logueado.service';
import { Login } from 'src/app/models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  dataUsuario: Array<any> = [];
  enteredEmail: string = '';
  enteredPassword: string = '';
  validezCampo:boolean = true;
  entrarHabilitado:boolean = false;

  constructor(private usuarioService: UsuarioService,private usuarioLogueadoService: UsuarioLogueadoService, private router: Router) {}

  ngOnInit(){
    
    
  }
  validarUsuario(email: string, password: string) {
    this.usuarioService.getUsuario(email).subscribe(
      (resp) => {
        // console.log('La respuesta es',resp);
        for (let i = 0; i < resp.length; i++) {
          const element = resp[i];
          //console.log(element)
          this.dataUsuario.push(element);
        }
        

        if (this.dataUsuario.length == 0) {
          console.log('no se ha encontrado usuario');
          this.validezCampo = false;
        } 
        else {
          if (this.dataUsuario[0].password === password) {
            console.log('usuario ingresado correctamente');
            //this.setUsuarioLogueado(this.dataUsuario[0].userId)
            this.router.navigate(['/cuenta-personal']);
          } else {
            console.log('el usuario o contraseña ingresado no es correcto');
            this.validezCampo = false;

          }
        }
      },
      (error) => {
        console.warn(error.message);
      }
    );
  }

  habilitarBotonEntrar(){
    if(this.enteredEmail.length > 2 && this.enteredPassword.length > 2){
      this.entrarHabilitado = true
    }
  }

  /*setUsuarioLogueado(userId:number){
    this.usuarioLogueadoService.setUsuarioLogueado(userId)
  }*/
  onSubmit(f: NgForm) {
    //this.validarUsuario(this.enteredEmail, this.enteredPassword);
    this.login(this.enteredEmail, this.enteredPassword);
  }


  login(email:string,password:string)
  {
    let login:Login = new Login(email,password);
    //this.usuarioService.usuarioAutenticado;
    //llamar al servicio usuario
    this.usuarioService.iniciarSesion(login).subscribe(
      (data)=>{
        
        if(data!=null)
        {
          if (data.password === password && data.idUsuario!=0) 
          {
            console.log('usuario ingresado correctamente');
            console.log('id usuario=',data.idUsuario);
            this.router.navigate(['/cuenta-personal']);
          }else{
            console.log('el usuario o contraseña ingresado no es correcto');
            this.validezCampo = false;
          }
        }
        else
        {
          console.log('no se ha encontrado usuario');
          this.validezCampo = false;
        }
        
      },(error)=>{
        console.warn(error.message);
      }
    )
  }


}
