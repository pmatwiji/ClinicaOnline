import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-horarios-profesional',
  templateUrl: './horarios-profesional.component.html',
  styleUrls: ['./horarios-profesional.component.scss']
})
export class HorariosProfesionalComponent implements OnInit {

  diasSemana:any = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];

  constructor() { }

  ngOnInit(): void {
  }

}
