import { Component, OnInit } from '@angular/core';
import { HistorialTransaccionesComponent } from '../../components/historial-transacciones/historial-transacciones.component';
import { UsuarioLogueadoService } from 'src/app/services/usuario-logueado.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cuenta-personal',
  templateUrl: './cuenta-personal.component.html',
  styleUrls: ['./cuenta-personal.component.css']
})
export class CuentaPersonalComponent implements OnInit {
  usuarioLogueado:number = this.usuarioLogueadoService.getUsuarioLogueado();
  User : any;


  constructor(private usuarioLogueadoService: UsuarioLogueadoService,
    private usuarioService : UsuarioService) {
    
   }
  

  ngOnInit(): void {
    this.mostrarUsuarioLogueado();
    //JGJ
    this.mostrarDataUsuario(this.usuarioLogueado);
  }
  mostrarUsuarioLogueado(){
    if(this.usuarioLogueado !=-1){
    console.log(this.usuarioLogueado)
    }

  }


  //JGJ
  mostrarDataUsuario(id: number){
    
    this.usuarioService.getUsuarioId(id).subscribe(resp =>{
      
      this.User = resp[0];
      console.log(this.User);

    console.log('El id del usuario es', this.User.userId);
    })
  }
  //JGJ


}
