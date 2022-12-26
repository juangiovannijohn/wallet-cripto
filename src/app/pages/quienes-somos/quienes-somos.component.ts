import { Component, OnInit } from '@angular/core';
import { QuienesSomosService } from 'src/app/services/quienes-somos.service';

@Component({
  selector: 'app-quienes-somos',
  templateUrl: './quienes-somos.component.html',
  styleUrls: ['./quienes-somos.component.css']
})
export class QuienesSomosComponent implements OnInit {

  team:any;
  
  constructor(private miServicio:QuienesSomosService) { }

  ngOnInit(): void {
    this.miServicio.obtenerDatosQuienesSomos().subscribe(data =>{
      console.log(data);
      this.team=data;
    })
  }

}
