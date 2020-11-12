import { Component, OnInit, Input } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FirebaseService } from "../../servicios/firebase.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.scss']
})
export class TurnosComponent implements OnInit {

  // turnos = [{especialista: 'Dr. Bacon', especialidad: 'traumatologia', fecha: '01/01/2020', hora: '17:00hs', paciente: 'Pepe', comentario: 'lorem', estado: 'pendiente'},
  //           {especialista: 'Dr. Bacon', especialidad: 'traumatologia', fecha: '01/01/2020', hora: '17:00hs', paciente: 'Pepe', comentario: 'lorem', estado: 'cancelado'},
  //           {especialista: 'Dr. Bacon', especialidad: 'traumatologia', fecha: '01/01/2020', hora: '17:00hs', paciente: 'Pepe', comentario: 'lorem', estado: 'aceptado'}]

  @Input() inputCurrentUser:any;
  listaTurnosPendientes;


  constructor(private modalService: NgbModal,private firebaseService: FirebaseService,private toastr: ToastrService) { }



  ngOnInit(): void {
    this.firebaseService.traerTurnosPendientes(this.inputCurrentUser.nombre + ' ' + this.inputCurrentUser.apellido).subscribe(datos => this.listaTurnosPendientes = datos)
  }

  open(content) {
    this.modalService.open(content);
  }

  cancelar(especialista,fecha,paciente){

    this.firebaseService.agregarReseniaATurnos(fecha+' '+especialista,'Cancelado por el profesional','cancelado')
    this.firebaseService.agregarReseniaAProfesional(especialista,fecha,'Cancelado por el profesional','cancelado');
    this.firebaseService.agregarReseniaAPaciente(paciente,fecha,'Cancelado por el profesional','cancelado');

    this.toastr.success('El turno fue cancelado','Cancelado');
  }

  aceptar(fecha,paciente,profesional){
    this.firebaseService.aceptarTurno(fecha+ ' ' + this.inputCurrentUser.nombre + ' ' + this.inputCurrentUser.apellido);
    this.firebaseService.aceptarTurnoPaciente(paciente,fecha);
    this.firebaseService.aceptarTurnoProfesional(profesional,fecha)

    this.toastr.success('El turno fue aceptado','Aceptado');
  }

}
