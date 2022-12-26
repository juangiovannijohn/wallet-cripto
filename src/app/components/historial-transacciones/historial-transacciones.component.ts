import { ConditionalExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { DataTransacciones } from 'src/app/interfaces/interfaces';
import { TransaccionesService } from '../../services/transacciones.service';
import { CodigoTransaccion } from "../../enums/codigo-transaccion";
import { CodigoCuenta } from "../../enums/codigo-cuenta";

@Component({
  selector: 'app-historial-transacciones',
  templateUrl: './historial-transacciones.component.html',
  styleUrls: ['./historial-transacciones.component.css'],
})
export class HistorialTransaccionesComponent implements OnInit {
  //variables globales
  dataTransacciones: Array<DataTransacciones> = [];
  userId: number = 1;
  transaccionesTodas: boolean = true;
  arsVsBtc: number = 0;

  constructor(private _servicioTransaccion: TransaccionesService) {}

  ngOnInit(): void {
    this.ultimasTransacciones(this.userId);
  }

  ultimasTransacciones(userId: number) {
    this.transaccionesTodas = true;
    this.dataTransacciones = [];
    this._servicioTransaccion.getTodasTransacciones(userId).subscribe(
      (resp) => {
        let i: number;
        if (resp.length > 5) {
          i = resp.length - 5;
        } else {
          i = 0;
        }
        for (let index = resp.length - 1; index >= i; index--) {
          const element = resp[index];
          switch (element.codigoMovimiento) {
            case CodigoTransaccion.Retiro:
              //retiro
              element.classRed = true;
              element.codigoMovimientoText = 'Retiro de ';

              break;
            case CodigoTransaccion.CambioInicial:
              //Cambio Inicial
              element.classRed = true;
              element.codigoMovimientoText = 'Intercambio de ';

              break;
            case CodigoTransaccion.CambioFinal:
              //Cambio Final
              element.classRed = false;
              element.codigoMovimientoText = 'Intercambio de ';

              break;
            case CodigoTransaccion.Deposito:
              //Deposito
              element.classRed = false;
              element.codigoMovimientoText = 'Deposito de ';

              break;

            default:
              break;
          }
          switch (element.cuenta) {
            case CodigoCuenta.pesosArgentinos:
              element.booleanARS = true;
              element.imgCuenta = '../../../assets/img/ARS.png';
              break;
            case CodigoCuenta.bitcoin:
              element.booleanARS = false;
              element.imgCuenta = '../../../assets/img/BTC.png';
              break;
            default:
              break;
          }
          if (element.debe == 0) {
            //Ingreso de dinero a la cuenta element.cuenta
            element.signo = '+ ';
            element.monto = element.haber;
          }
          if (element.haber == 0) {
            //Egreso de dinero de la cuenta element.cuenta
            element.signo = '- ';
            element.monto = element.debe;
          }
          this.dataTransacciones.push(element);
        }
      },
      (error) => {
        console.warn(error.message);
      }
    );
  }
  todasTransacciones(userId: number) {
    this.transaccionesTodas = false;
    this.dataTransacciones = [];
    this._servicioTransaccion.getTodasTransacciones(userId).subscribe(
      (resp) => {
        for (let index = resp.length - 1; index >= 0; index--) {
          const element = resp[index];
          switch (element.codigoMovimiento) {
            case CodigoTransaccion.Retiro:
              //retiro
              element.classRed = true;
              element.codigoMovimientoText = 'Retiro de ';

              break;
            case CodigoTransaccion.CambioInicial:
              //Cambio Inicial
              element.classRed = true;
              element.codigoMovimientoText = 'Intercambio de ';

              break;
            case CodigoTransaccion.CambioFinal:
              //Cambio Final
              element.classRed = false;
              element.codigoMovimientoText = 'Intercambio de ';

              break;
            case CodigoTransaccion.Deposito:
              //Deposito
              element.classRed = false;
              element.codigoMovimientoText = 'Deposito de ';

              break;

            default:
              break;
          }
          switch (element.cuenta) {
            case CodigoCuenta.pesosArgentinos:
              element.booleanARS = true;
              element.imgCuenta = '../../../assets/img/ARS.png';
              break;
            case CodigoCuenta.bitcoin:
              element.booleanARS = false;
              element.imgCuenta = '../../../assets/img/BTC.png';
              break;
            default:
              break;
          }
          if (element.debe == 0) {
            //Ingreso de dinero a la cuenta element.cuenta
            element.signo = '+ ';
            element.monto = element.haber;
          }
          if (element.haber == 0) {
            //Egreso de dinero de la cuenta element.cuenta
            element.signo = '- ';
            element.monto = element.debe;
          }

          this.dataTransacciones.push(element);
        }
      },
      (error) => {
        console.warn(error.message);
      }
    );
  }


}
