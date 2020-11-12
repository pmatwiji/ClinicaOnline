import { Component, OnInit , Input} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FirebaseService } from "../../servicios/firebase.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-proximos-turnos',
  templateUrl: './proximos-turnos.component.html',
  styleUrls: ['./proximos-turnos.component.scss']
})
export class ProximosTurnosComponent implements OnInit {

  // turnos = [{especialista: 'Dr. Bacon', especialidad: 'traumatologia', fecha: '01/01/2020', hora: '17:00hs', paciente: 'Pepe', comentario: 'lorem', estado: 'pendiente'},
  //           {especialista: 'Dr. Bacon', especialidad: 'traumatologia', fecha: '01/01/2020', hora: '17:00hs', paciente: 'Pepe', comentario: 'lorem', estado: 'cancelado'},
  //           {especialista: 'Dr. Bacon', especialidad: 'traumatologia', fecha: '01/01/2020', hora: '17:00hs', paciente: 'Pepe', comentario: 'lorem', estado: 'aceptado'}
  // ];

  @Input() inputCurrentUser:any;

  listaTurnos;
  

  constructor(private modalService: NgbModal,private firebaseService: FirebaseService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.firebaseService.traerTurnosPaciente(this.inputCurrentUser.nombre + ' ' + this.inputCurrentUser.apellido).subscribe(datos => this.listaTurnos = datos)
  }

  open(content) {
    this.modalService.open(content);
  }

  cancelar(especialista,fecha,paciente){

    this.firebaseService.agregarReseniaATurnos(fecha+' '+especialista,'Cancelado por el paciente','cancelado')
    this.firebaseService.agregarReseniaAProfesional(especialista,fecha,'Cancelado por el paciente','cancelado');
    this.firebaseService.agregarReseniaAPaciente(paciente,fecha,'Cancelado por el paciente','cancelado');

    this.toastr.success('El turno fue cancelado','Cancelado');
  }
}
