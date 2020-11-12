import { Component, OnInit , Input} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FirebaseService } from "../../servicios/firebase.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-atender-turnos',
  templateUrl: './atender-turnos.component.html',
  styleUrls: ['./atender-turnos.component.scss']
})
export class AtenderTurnosComponent implements OnInit {

  // turnos = [{especialista: 'Dr. Bacon', especialidad: 'traumatologia', fecha: '01/01/2020', hora: '17:00hs', paciente: 'Pepe', comentario: 'lorem', estado: 'pendiente'},
  // {especialista: 'Dr. Bacon', especialidad: 'traumatologia', fecha: '01/01/2020', hora: '17:00hs', paciente: 'Pepe', comentario: 'lorem', estado: 'cancelado'},
  // {especialista: 'Dr. Bacon', especialidad: 'traumatologia', fecha: '01/01/2020', hora: '17:00hs', paciente: 'Pepe', comentario: 'lorem', estado: 'aceptado'}]

  @Input() inputCurrentUser:any;

  turnosAceptados;
  resenia:string
  edadPaciente;
  temperaturaPaciente;
  presionPaciente;
  campos= 0;

  constructor(private modalService: NgbModal,private firebaseService: FirebaseService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.firebaseService.traerTurnosAceptados(this.inputCurrentUser.nombre + ' ' + this.inputCurrentUser.apellido).subscribe(datos => this.turnosAceptados = datos)
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

  atender(resenia,especialista,paciente,fecha){

    this.firebaseService.agregarReseniaATurnos(fecha+' '+especialista,resenia,'completado')
    this.firebaseService.agregarReseniaAProfesional(especialista,fecha,resenia,'completado');
    this.firebaseService.agregarReseniaAPaciente(paciente,fecha,resenia,'completado');

    this.toastr.success('El paciente fue atendido con exito','Turno completo');
  }

  reset(){
  this.edadPaciente = '';
  this.temperaturaPaciente = '';
  this.presionPaciente= '';
  this.campos= 0;

  }

}
