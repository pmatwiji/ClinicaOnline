import { Component, OnInit , Input} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FirebaseService } from "../../servicios/firebase.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-historial-turnos',
  templateUrl: './historial-turnos.component.html',
  styleUrls: ['./historial-turnos.component.scss']
})
export class HistorialTurnosComponent implements OnInit {

//   turnos = [{especialista: 'Dr. Bacon', especialidad: 'traumatologia', fecha: '01/01/2020', hora: '17:00hs', paciente: 'Pepe', comentario: 'lorem', estado: 'pendiente'},
//   {especialista: 'Dr. Bacon', especialidad: 'traumatologia', fecha: '01/01/2020', hora: '17:00hs', paciente: 'Pepe', comentario: 'lorem', estado: 'cancelado'},
//   {especialista: 'Dr. Bacon', especialidad: 'traumatologia', fecha: '01/01/2020', hora: '17:00hs', paciente: 'Pepe', comentario: 'lorem', estado: 'aceptado'}
// ];

  currentRate:number=null;
  comentario:string = '';
  @Input() inputCurrentUser:any;

  listaTurnos;

  public isCollapsed = false;

  constructor(private modalService: NgbModal,private firebaseService: FirebaseService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.firebaseService.traerHistorialPaciente(this.inputCurrentUser.nombre + ' ' + this.inputCurrentUser.apellido).subscribe(datos => this.listaTurnos = datos)
  }

  open(content) {
    this.modalService.open(content);
  }

  agregarComentario(especialista,paciente,fecha){
    if(this.comentario != '' && this.currentRate != null)
    {
      this.firebaseService.agregarComentario(fecha+' '+especialista,this.comentario,this.currentRate)
      this.firebaseService.agregarComentarioPaciente(paciente,fecha,this.comentario,this.currentRate);
      this.firebaseService.agregarComentarioProfesional(especialista,fecha,this.comentario,this.currentRate);

      this.toastr.success('El comentario fue cargado con exito','Comentario');
    } else {
      this.toastr.error('Debe completar los campos para poder enviar su comentario','Comentario');
    }

    
  }

  reset(){
    this.currentRate = null;
    this.comentario = ''
  }

  







}
