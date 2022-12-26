import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuentaPersonalComponent } from './pages/cuenta-personal/cuenta-personal.component';
import { HomeComponent } from './pages/home/home.component';
import { IntercambiarComponent } from './components/intercambiar/intercambiar.component';
import { Pagina404Component } from './pages/pagina404/pagina404.component';
import { DepositarComponent } from './components/depositar/depositar.component';
import { RetirarComponent } from './components/retirar/retirar.component';
import { LoginComponent } from './pages/login/login.component';
import { RecuperarContrasenaComponent } from './pages/recuperar-contrasena/recuperar-contrasena.component';
import { PortafolioCriptoComponent } from './components/portafolio-cripto/portafolio-cripto.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { QuienesSomosComponent } from './pages/quienes-somos/quienes-somos.component';
import { MercadoComponent } from './pages/mercado/mercado.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'quienes-somos', component: QuienesSomosComponent},
  {path:'login',component: LoginComponent},
  {path:'registro', component:RegistroComponent},
  {path:'recuperar-contraseña',component:RecuperarContrasenaComponent},
  {path: 'cuenta-personal', component: CuentaPersonalComponent, children:[
    {path:'intercambiar', component: IntercambiarComponent},
    {path:'depositar', component: DepositarComponent},
    {path:'retirar', component: RetirarComponent},
    {path:'portafolio-cripto',component:PortafolioCriptoComponent}
    ]},
  {path: 'mercado', component: MercadoComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: Pagina404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
