import { Component, OnInit, Input } from '@angular/core';

import { FirebaseService } from "../../servicios/firebase.service";

import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-sacar-turno',
  templateUrl: './sacar-turno.component.html',
  styleUrls: ['./sacar-turno.component.scss']
})
export class SacarTurnoComponent implements OnInit {

  @Input() inputCurrentUser:any;
  
  especialidadSeleccionada = null;
  profesionalesAElegir
  profesionalSeleccionado = null;
  turnoSeleccionado = null;

  constructor(private firebaseService: FirebaseService,private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  agregarTurno(){
    let fechaActual = new Date().toString()
    
    this.firebaseService.cargarTurno(this.profesionalSeleccionado,this.turnoSeleccionado,this.inputCurrentUser.nombre + ' ' + this.inputCurrentUser.apellido, this.especialidadSeleccionada)
    this.firebaseService.agregarATurnosPaciente(this.inputCurrentUser.nombre + ' ' + this.inputCurrentUser.apellido,fechaActual,this.profesionalSeleccionado,this.especialidadSeleccionada,
                                                this.inputCurrentUser.nombre + ' ' + this.inputCurrentUser.apellido,this.turnoSeleccionado,'pendiente');
    this.toastr.success('Turno cargado con exito!','Guardado');
  }

  traerEspecialidadSeleccionada(especialidad:string){
    this.especialidadSeleccionada = especialidad;
    this.profesionalSeleccionado = null;
  }

  traerProfesionalSeleccionado(profesional:string){
    this.profesionalSeleccionado = profesional;
  }

  traerTurnoSeleccionado(turno:string){
    this.turnoSeleccionado = turno;
  }




}
