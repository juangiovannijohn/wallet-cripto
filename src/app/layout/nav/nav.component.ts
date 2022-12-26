import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  estaAutenticado:boolean=false;

  constructor(private usuarioService:UsuarioService, private router:Router)
   { 

   }

  ngOnInit(): void {

    this.usuarioService.estaAutenticado.subscribe(res=>(this.estaAutenticado=res));
  }

  onCerrarSesion(){
    this.usuarioService.logout();
    this.estaAutenticado=false;
    this.router.navigate(['/home']);
  }

}
