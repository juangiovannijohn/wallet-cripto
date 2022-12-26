import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MercadoService {
  
  constructor(private http:HttpClient) { 
    console.log("El servicio mercado está corriendo.")
  }
  
  url:string = 'https://api.coingecko.com/api/v3/simple/price'
  obtenerPrecios():Observable<any>{
    let parametros = new HttpParams();
    parametros = parametros.append('ids', 'bitcoin,ethereum,tether,binancecoin,cardano');
    parametros = parametros.append('vs_currencies', 'ars');
    return this.http.get(this.url, {params: parametros})
  }
}
