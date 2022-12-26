import { Component, OnInit } from '@angular/core';
import { TransaccionesService } from 'src/app/services/transacciones.service';
import { CurrencyPipe } from '@angular/common';
import { Portafolio } from 'src/app/interfaces/interfaces';
import { CodigoCuenta } from "../../enums/codigo-cuenta";


@Component({
  selector: 'app-portafolio-cripto',
  templateUrl: './portafolio-cripto.component.html',
  styleUrls: ['./portafolio-cripto.component.css']
})
export class PortafolioCriptoComponent implements OnInit {

  userId:number=1; //harcodeo user id
  billetera :Portafolio = {
    ars:0,
    btc:0,
    ars_img:'../../../assets/img/ARS.png',
    btc_img:'../../../assets/img/BTC.png'
  }; //property publica para el binding con vista


  constructor(
    private miServicio:TransaccionesService
    ) { }

  ngOnInit(): void {
    this.miPortafolio(this.userId);
  }

  miPortafolio(userId: number)
  {
    this.miServicio.getTodasTransacciones(userId).subscribe((data) => {
      let total_ars:number = 0;
      let total_btc:number = 0;

      for(let index = data.length-1;index>=0;index--){
        const element = data[index];

        switch(element.cuenta){
          case CodigoCuenta.pesosArgentinos:
            if(element.haber!=0)
            {
              total_ars += element.haber;
            }
            else
            {
              total_ars -= element.debe;
            }
            break;

          case CodigoCuenta.bitcoin:
            if(element.haber!=0)
            {
              total_btc += element.haber;
            }
            else
            {
              total_btc -= element.debe;
            }
            break;

          default:
            break;
        }
      }

      this.billetera.ars = total_ars;
      this.billetera.btc = total_btc;
      console.log('Objeto a trabajar: ', this.billetera);

    }, error=>{
      console.warn(error.message);
    }
    )
  }

}

