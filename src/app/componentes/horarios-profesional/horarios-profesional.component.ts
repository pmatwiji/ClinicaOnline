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
  horarioInicio;
  horarioFin;


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
      if(this.horario != null){

        let hora;
        let minutos = 0;

        for (let index = 0; index < this.diasSeleccionados.length; index++) {
          const dia = this.diasSeleccionados[index];
          hora = this.horarioInicio;
          let horaStr = hora + 'hs'

          while (hora < this.horarioFin) {
            this.firebaseService.agregarHorarios(this.mail,dia + ' ' + horaStr, dia + ' ' + horaStr );

            minutos+=30;

            if(minutos == 60){
              hora++;
              minutos=0;
            }

            if(minutos == 30){
              horaStr = hora + ':' + minutos +'hs'
            } else {
              horaStr = hora + 'hs'
            }
         
          }

          hora = this.horarioInicio;
          
        }

        this.toastr.success('Horarios guardados con exito!','Guardado');

      } else {
        this.toastr.error('Debe seleccionar un horario','Error');
      }
    } else {
      this.toastr.error('Debe seleccionar al menos un dia de la semana','Error');
    }
  }


  elegirHorario(evt){

    switch (evt) {
      case 'am':
        this.horarioInicio = 8;
        this.horarioFin = 12
        //alert("inicio: "+ this.horarioInicio + " fin: " + this.horarioFin)
      break;

      case 'mediodia':
        this.horarioInicio = 12;
        this.horarioFin = 16
        //alert("inicio: "+ this.horarioInicio + " fin: " + this.horarioFin)
      break;

      case 'pm':
        this.horarioInicio = 16;
        this.horarioFin = 19
        //alert("inicio: "+ this.horarioInicio + " fin: " + this.horarioFin)
      break;
      default:
        break;
    }
  }
}


