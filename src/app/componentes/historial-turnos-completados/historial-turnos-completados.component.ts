import { Component, OnInit , Input} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FirebaseService } from "../../servicios/firebase.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-historial-turnos-completados',
  templateUrl: './historial-turnos-completados.component.html',
  styleUrls: ['./historial-turnos-completados.component.scss']
})
export class HistorialTurnosCompletadosComponent implements OnInit {

  @Input() inputCurrentUser:any;

  historialTurnos;

  resenia:string

  constructor(private modalService: NgbModal,private firebaseService: FirebaseService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.firebaseService.traerHistorialTurnos(this.inputCurrentUser.email).subscribe(datos => this.historialTurnos = datos)
  }

  open(content) {
    this.modalService.open(content);
  }


}
