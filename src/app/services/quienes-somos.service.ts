import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuienesSomosService {

  constructor(private http:HttpClient) { 
    console.log("Servicio quienes somos está corriendo");
  }
  obtenerDatosQuienesSomos():Observable<any>
  {
    return this.http.get('http://localhost:3000/team');

  }

}
