import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-habilitar-profesional',
  templateUrl: './habilitar-profesional.component.html',
  styleUrls: ['./habilitar-profesional.component.scss']
})
export class HabilitarProfesionalComponent implements OnInit {

  doctores=[{nombre:'Dr',apellido:'Bacon',especialidad:'traumatologia', habilitado:false},
  {nombre:'Dr',apellido:'Bacon',especialidad:'traumatologia', habilitado:false},
  {nombre:'Dr',apellido:'Bacon',especialidad:'traumatologia', habilitado:false}]

  constructor() { }

  ngOnInit(): void {
  }

}
