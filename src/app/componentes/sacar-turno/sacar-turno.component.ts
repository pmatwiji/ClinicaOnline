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
    
    this.firebaseService.agregarATurnosProfesional(this.profesionalSeleccionado.nombre + ' ' + this.profesionalSeleccionado.apellido,this.turnoSeleccionado,this.profesionalSeleccionado.nombre + ' ' + this.profesionalSeleccionado.apellido,
                                                  this.especialidadSeleccionada, this.inputCurrentUser.nombre + ' ' + this.inputCurrentUser.apellido,'pendiente',fechaActual,true);
    this.firebaseService.agregarATurnosPaciente(this.inputCurrentUser.nombre + ' ' + this.inputCurrentUser.apellido,this.turnoSeleccionado,this.profesionalSeleccionado.nombre + ' ' + this.profesionalSeleccionado.apellido,this.especialidadSeleccionada,
                                                this.inputCurrentUser.nombre + ' ' + this.inputCurrentUser.apellido,this.turnoSeleccionado,'pendiente',fechaActual);
    this.firebaseService.agregarTurno(this.turnoSeleccionado,this.especialidadSeleccionada,this.profesionalSeleccionado.nombre + ' ' + this.profesionalSeleccionado.apellido,
                                      this.inputCurrentUser.nombre + ' ' + this.inputCurrentUser.apellido,'pendiente');                                            
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
