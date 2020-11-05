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
    //this.firebaseService.agregarTurno(this.date.day+'-'+this.date.month+'-'+this.date.year+'_'+this.time.hour+':'+this.time.minute,{profesional: this.profesionalSeleccionado, especialidad: this.especialidadSeleccionada, hora: this.time, fecha: this.date, activo: true});
    this.firebaseService.cargarTurno(this.profesionalSeleccionado,this.turnoSeleccionado,this.inputCurrentUser.nombre + ' ' + this.inputCurrentUser.apellido, this.especialidadSeleccionada)
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
