import { Component, OnInit } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TransaccionesService } from '../../services/transacciones.service';


@Component({
  selector: 'app-depositar',
  templateUrl: './depositar.component.html',
  styleUrls: ['./depositar.component.css']
})
export class DepositarComponent implements OnInit {

  nombreUsuario:string = '';
  cbuUsuario: number = 0;
  montoIngresado: number = 0;
  userId: number = 1;
  arsVsBtc: number = 0;

  showAlertMonto:boolean=false;

  form: FormGroup = new FormGroup({
    monto: new FormControl(this.montoIngresado)
  });

  constructor(
    private formbuilder:FormBuilder,
    private transaccionService:TransaccionesService,
    private usuarioService:UsuarioService
    ){
      this.form=this.formbuilder.group({
        monto:['', [Validators.required]]
    })
    }
  
  ngOnInit(): void {
    this.infoUsuarioById(this.userId);
  }
  infoUsuarioById(id:number){
  this.usuarioService.getUsuarioId(id).subscribe(
      (resp) =>{
        let [respuesta] = resp;
        console.log('RESPUESDLASKJ',respuesta)
        this.cbuUsuario = respuesta.cbu;
        this.nombreUsuario = respuesta.Nombre + ' ' + respuesta.Apellido;
      },
      (err)=> console.log(err)
    );
  }
  copyInputMessage(inputElement: any){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  generarDeposito(haber:number){
    let precioBTC: number = this.arsVsBtc;
    haber = this.montoIngresado;

    if (haber <= 0) {
      this.showAlertMonto = true;
      return;
    }

    if (haber > 0) {
      this.transaccionService.depositoTransaccion(this.userId, haber, precioBTC).subscribe(
        (resp) => console.log(resp),
        (error) => console.log(error)
      );
      this.showAlertMonto = false;
      setTimeout(() => {
        location.reload()
      }, 500);  
    }
    else{
      this.showAlertMonto = true;
    }
  }

  reset(){
    this.showAlertMonto = false;
  }
}
