import { Component, OnInit, Input} from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from "../../servicios/firebase.service";

@Component({
  selector: 'app-horarios-profesional',
  templateUrl: './horarios-profesional.component.html',
  styleUrls: ['./horarios-profesional.component.scss']
})
export class HorariosProfesionalComponent implements OnInit {

  @Input() mail:any;
  currentUser;
  diasSemana:any = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];

  diasSeleccionados = [];
  horario:any = null;
  franjaHoraria;


  horarioDeTrabajo;

  constructor( private toastr: ToastrService, private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.traerUser()
  }

  traerUser(){
    this.firebaseService.traerUserPorMail(this.mail).then((datos) => {
      this.currentUser = datos;
    }).catch((error :any) => console.log(error));
  }

  onCheck(evt) {
    if (!this.diasSeleccionados.includes(evt)) {
      this.diasSeleccionados.push(evt);
    } else {
      var index = this.diasSeleccionados.indexOf(evt);
      if (index > -1) {
        this.diasSeleccionados.splice(index, 1);
      }
    }
    console.log(this.diasSeleccionados);
  }

  guardarHorarios(){
    if(this.diasSeleccionados.length != 0){
      if(this.horario != ''){
        switch (this.horario) {
          case 'am':
            this.franjaHoraria = {inicio: 8, fin:12}
          break;
  
          case 'mediodia':
            this.franjaHoraria = {inicio: 12, fin:16}
          break;

          case 'pm':
            this.franjaHoraria = {inicio: 16, fin:19}
          break;
          default:
            break;
        }
        //this.horarioDeTrabajo = {dias: this.diasSeleccionados, horario: this.franjaHoraria}
        this.firebaseService.agregarHorarios(this.mail,this.diasSeleccionados,this.franjaHoraria);
        this.traerUser();
        this.toastr.success('Horarios guardados con exito!','Guardado');

      } else {
        this.toastr.error('Debe seleccionar un horario','Error');
      }
    } else {
      this.toastr.error('Debe seleccionar al menos un dia de la semana','Error');
    }
  }

}
