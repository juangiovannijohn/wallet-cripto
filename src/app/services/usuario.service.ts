import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from '../models/login';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url:string='https://localhost:7206/api/usuario/login';

  loggedIn = new BehaviorSubject<boolean>(false);
  currentUserSubject:BehaviorSubject<Usuario>;
  currentUser:Observable<Usuario>;


  constructor(private http: HttpClient, private router:Router
    ) {
      console.log("El servicio UsuarioService está funcionando")
      this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('currentUser')||'{}'));
      this.currentUser = this.currentUserSubject.asObservable();
     }

  getUsuario(email: string):Observable<any>
  {  
  let params = new HttpParams().set('email', email);
    return this.http.get("http://localhost:3000/usuario/", {params: params} );  
  }

  setUsuario(email:string, password:string,enteredNombre:string, enteredApellido:string):Observable<any>
   {
  //   let params = new HttpParams().set('email', email);
  //   return this.http.post("http://localhost:3000/usuario/",{params: params})
      return this.http.post("http://localhost:3000/usuario/",{
      
      email:email,
      password:password,
      Nombre:enteredNombre,
      Apellido:enteredApellido,
      cbu: Math.round(Math.random()*10000000000 )
      },{ responseType: "json" , withCredentials: false  });


  }

  getUsuarioId(id: number):Observable<any>
  {  
  let params = new HttpParams().set('id', id);
    return this.http.get("http://localhost:3000/usuario/", {params: params} );  

  }

  get usuarioAutenticado():Usuario{
    return this.currentUserSubject.value}

  get estaAutenticado():Observable<boolean>{
    if(!this.loggedIn.getValue())
    {
      this.router.navigate(['home']);
    }
    return this.loggedIn.asObservable();
  }

  iniciarSesion(login:Login):Observable<any>
  {
      return this.http.post<any>(this.url,login).pipe(map(data=>{
        sessionStorage.setItem('currentUser',JSON.stringify(data));//data.idUsuario
        this.currentUserSubject.next(data);
        this.loggedIn.next(true);
        return data;
      }));
  }

  logout():void
  {
    sessionStorage.removeItem('currentUser');
    this.loggedIn.next(false);
  }



  
}
