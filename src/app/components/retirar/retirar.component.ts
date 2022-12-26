import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Transaccion } from 'src/app/models/transaccion';
//import { Retirar } from 'src/app/models/retirar';
import { TransaccionesService } from 'src/app/services/transacciones.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { formatDate } from '@angular/common';
import { CodigoCuenta } from "../../enums/codigo-cuenta";
import { CodigoTransaccion} from '../../enums/codigo-transaccion'
@Component({
  selector: 'app-retirar',
  templateUrl: './retirar.component.html',
  styleUrls: ['./retirar.component.css'],
})
export class RetirarComponent implements OnInit {

  userId: number = 1;
  beneficiario = '';
  cbuBeneficiario: number = 0;
  montoIngresado: number = 0;
  arsVsBtc: number = 0;
  disponible_ARS: number = 0;
  showAlertMonto: boolean = false;
  showAlertDestino: boolean = false;
  User: any;
  amountState: boolean = false;
  hola: boolean = true;

  form!: FormGroup;

  usuario: any;
  constructor(
    private miServicio: TransaccionesService,
    private userService: UsuarioService,
    private formbuilder: FormBuilder
  ) {
    this.form = this.formbuilder.group({
      nombre: ['', [Validators.required]],
      cbu: ['', [Validators.required]],
      monto: ['', [Validators.required]],
    });
  }


  ngOnInit(): void {
    this.mostrarBeneficiario(this.userId);
    this.getPrecioBTCvsARS();
    this.getTotalARS();
  }

  get nombre() {
    return this.form.get('nombre');
  }

  get cbu() {
    return this.form.get('cbu');
  }

  get monto() {
    return this.form.get('monto');
  }

  getPrecioBTCvsARS() {
    this.miServicio.precioBTCvsUSD().subscribe(
      (data) => {
        this.arsVsBtc = data.market_data.current_price.ars;
      },
      (error) => console.log(error)
    );
  }

  mostrarBeneficiario(userId: number) {
    this.userService.getUsuarioId(userId).subscribe((data) => {
      this.User = data[0];
      this.beneficiario = this.User.Nombre;
      this.cbuBeneficiario = this.User.cbu;
      console.log('cbu: ', this.cbu);
    });
  }

  getTotalARS() {
    this.miServicio.getTodasTransacciones(this.userId).subscribe(
      (data) => {
        let haber_ARS: number = 0;
        let debe_ARS: number = 0;
        let datos = data;

        for (let index = 0; index < datos.length; index++) {
          const element = datos[index];
          if (element.cuenta == CodigoCuenta.pesosArgentinos) {
            haber_ARS += element.haber;
            debe_ARS += element.debe;
          }
        }
        const disponible = haber_ARS - debe_ARS;
        this.disponible_ARS = disponible;
        console.log('Pesos disponibles: ', this.disponible_ARS);
      },
      (error) => console.log(error)
    );
  }

  retirar() {
    //this.getTotalARS();
    //cargamos el obj transacción para retiro de ARS
    let precioBTC: number = this.arsVsBtc;
    let date: number = Date.now();
    let fecha: string = formatDate(date, 'dd/MM/yyyy - HH:mm', 'en') + ' hrs';
    let debe: number = this.form.get('monto')?.value;
    console.log('Pesos disponibles: ', this.disponible_ARS);
    console.log('Monto ingresado atributo de clase: ', this.montoIngresado);
    let tipo: boolean = typeof this.montoIngresado === 'string';
    console.log('El monto ingresado es string: ', tipo);
    //let montoRetiro:number=this.formRetirar.get('retiro')?.value;
    //validación que haría en modal anterior

    //creacion de obj transacción de tipo 'R'

    let retiroT: Transaccion = new Transaccion(
      this.userId,
      CodigoTransaccion.Retiro,
      CodigoCuenta.pesosArgentinos,
      fecha,
      debe,
      0,
      precioBTC
    );

    this.miServicio.retiroTransaccion2(retiroT).subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );
  }

  reset() {
    this.showAlertMonto = false;
    this.showAlertDestino = false;
    this.montoIngresado = 0;
    this.disponible_ARS = 0;
    this.disponible_ARS = 0;
    this.amountState = false;
    location.reload();
  }

  /*onAmountInput(){
    if(this.amount>=this.disponible_ARS||this.amount<=0)
    {
      this.amountState=true;
    }
    else
    {
      this.amountState=false;
    }
    console.log("amount: ", this.amount);
  }*/

  //disable si faltan campos o monto no válido

  Continuar() {}

  checkForm(e: any) {
    const btn = document.getElementById('btn') as HTMLButtonElement | null;
    const chbx = document.getElementById('chbx') as HTMLInputElement | null;
    const nombreInput = document.getElementById(
      'nombreInput'
    ) as HTMLInputElement | null;
    const cbuInput = document.getElementById(
      'cbuInput'
    ) as HTMLInputElement | null;
    const montoInput = document.getElementById(
      'montoInput'
    ) as HTMLInputElement | null;
    if (e.target.checked) {
      if (this.form.valid) {
        this.montoIngresado = this.form.get('monto')?.value;
        if (
          this.disponible_ARS < this.montoIngresado ||
          this.montoIngresado <= 0
        ) {
          //alert('Error en ingreso de datos');
          console.log('Error: no se puede realizar retiro con el monto ingresado',this.montoIngresado);
          this.showAlertMonto = true;
          return;
        } else if (
          this.form.get('cbu')?.value != this.cbuBeneficiario ||
          this.form.get('nombre')?.value != this.beneficiario
        ) {
          console.log('Error: cuenta de destino no registrada');
          this.showAlertDestino = true;
          return;
        } else {
          console.log('datos ingresados correctamente');

          btn?.removeAttribute('disabled');
          nombreInput?.setAttribute('disabled', '');
          cbuInput?.setAttribute('disabled', '');
          montoInput?.setAttribute('disabled', '');
        }
      } else {
        console.log('datos ingresados de manera erronea');
        alert('Error en ingreso de datos');
        if (chbx != null) chbx.checked = false;
        return;
      }
    } else {
      //alert("Todos los datos son requeridos");
      btn?.setAttribute('disabled', '');
      nombreInput?.removeAttribute('disabled');
      cbuInput?.removeAttribute('disabled');
      montoInput?.removeAttribute('disabled');
      return;
    }
  }


  /*retiro()
{
  if(this.form.valid){
  let nombre:string = this.form.get("nombre")?.value;
  let cbu:number = this.form.get("nombre")?.value;
  let monto:number = this.form.get("nombre")?.value;
  let retirar:Retirar = new Retirar(nombre,cbu,monto);
  this.miServicio.retiroTransaccion(retirar).subscribe(respueta=>{})
}}*/
}
