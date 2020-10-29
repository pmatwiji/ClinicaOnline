import { Component, OnInit } from '@angular/core';

import { FirebaseService } from "../../servicios/firebase.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-habilitar-profesional',
  templateUrl: './habilitar-profesional.component.html',
  styleUrls: ['./habilitar-profesional.component.scss']
})
export class HabilitarProfesionalComponent implements OnInit {

  doctores=[{nombre:'Dr',apellido:'Bacon',especialidad:'traumatologia', habilitado:false},
  {nombre:'Dr',apellido:'Bacon',especialidad:'traumatologia', habilitado:false},
  {nombre:'Dr',apellido:'Bacon',especialidad:'traumatologia', habilitado:false}]

  profesionalesSinHabilitar:any;

  constructor(private firebaseService: FirebaseService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.traerListadoProfesionales()
  }

  habilitarProfesional(mail){
    this.firebaseService.habilitarProfesional(mail);
    this.toastr.success('El profesional ' + mail + ' ha sido habilitado.','Aceptado');
    this.traerListadoProfesionales();
  }

  traerListadoProfesionales(){
    this.firebaseService.traerProfesionalesNoHabilitados().then(datos=>this.profesionalesSinHabilitar = datos);
  }
  
}
