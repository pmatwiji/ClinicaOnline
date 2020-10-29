import { Component, OnInit } from '@angular/core';
import { NgbTimeStruct, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FirebaseService } from "../../servicios/firebase.service";




@Component({
  selector: 'app-sacar-turno',
  templateUrl: './sacar-turno.component.html',
  styleUrls: ['./sacar-turno.component.scss']
})
export class SacarTurnoComponent implements OnInit {

  model: NgbDateStruct;
  date: {year: number, month: number};

  time: NgbTimeStruct = {hour: 8, minute: 0, second: 0};
  hourStep = 1;
  minuteStep = 30;

  listaEspecialidades;
  especialidadSeleccionada = null;
  profesionalesAElegir
  profesionalSeleccionado = null

  constructor(private calendar: NgbCalendar,private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.firebaseService.traerColeccion('especialidades').then(datos=>this.listaEspecialidades = datos)
  }

  traerListadoProfesionales(especialidad){
    this.firebaseService.traerProfesionalesHabilitadosPorEspecialidad(especialidad).then(datos=>this.profesionalesAElegir = datos);
    console.log(this.profesionalesAElegir)
  }





}
