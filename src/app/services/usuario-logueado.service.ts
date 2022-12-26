import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioLogueadoService {
  usuarioLogueado: number = -1;
  constructor() { }
  
  getUsuarioLogueado(){
    return this.usuarioLogueado
  }

  setUsuarioLogueado(usuario:number){
    this.usuarioLogueado = usuario
  }

}
