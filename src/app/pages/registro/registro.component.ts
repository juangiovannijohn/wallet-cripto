import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Route, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  success:boolean = false;
  enteredEmail:string = '';
  enteredPassword:string='';
  enteredNombre:string='';
  enteredApellido:string='';
  enteredFechaNacimiento:string="";
  
  
  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm){
    
    
      this.usuarioService.setUsuario(this.enteredEmail,this.enteredPassword,this.enteredNombre,this.enteredApellido).subscribe(
        (val) => {
          this.success = true;
          setTimeout( () => { this.router.navigate(['/cuenta-personal']); }, 1000 );
          
      },
      response => {
          alert('Lo sentimos, no pudimos registrar tu usuario. Intentalo mas tarde')
      }
      )
    
   
      
  }

}
