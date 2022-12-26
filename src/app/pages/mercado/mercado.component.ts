import { Component, OnInit } from '@angular/core';
import { MercadoService } from 'src/app/services/mercado.service';

@Component({
  selector: 'app-mercado',
  templateUrl: './mercado.component.html',
  styleUrls: ['./mercado.component.css']
})
export class MercadoComponent implements OnInit {
  precios: any

  constructor(private mercadoService:MercadoService) { }

  ngOnInit(): void {
    this.getPrecios();
  }
  getPrecios():any{
    this.mercadoService.obtenerPrecios().subscribe({
      next: (v) => this.precios = v,
      error: (e) => console.log(e)
    })
    console.log(this.precios)
  }
  

}
