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

  constructor(private modalService: NgbModal,private firebaseService: FirebaseService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.firebaseService.traerTurnosAceptados(this.inputCurrentUser.email).subscribe(datos => this.turnosAceptados = datos)
  }

  open(content) {
    this.modalService.open(content);
  }

  cancelar(fecha){
    this.firebaseService.cancelarTurno(this.inputCurrentUser.email,fecha);
    this.toastr.success('El turno fue cancelado','Cancelado');
  }

  atender(resenia,especialidad,paciente,fecha){
    let fechaActual = new Date().toString()

    this.firebaseService.agregarResenia(this.inputCurrentUser.email,fechaActual,resenia,especialidad,paciente,fechaActual,'completado');
    this.firebaseService.resetearTurno(this.inputCurrentUser.email,fecha)
    this.toastr.success('El paciente fue atendido con exito','Turno completo');
  }

}
