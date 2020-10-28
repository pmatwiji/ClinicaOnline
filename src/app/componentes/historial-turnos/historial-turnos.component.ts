import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-historial-turnos',
  templateUrl: './historial-turnos.component.html',
  styleUrls: ['./historial-turnos.component.scss']
})
export class HistorialTurnosComponent implements OnInit {

  turnos = [{especialista: 'Dr. Bacon', especialidad: 'traumatologia', fecha: '01/01/2020', hora: '17:00hs', paciente: 'Pepe', comentario: 'lorem', estado: 'pendiente'},
  {especialista: 'Dr. Bacon', especialidad: 'traumatologia', fecha: '01/01/2020', hora: '17:00hs', paciente: 'Pepe', comentario: 'lorem', estado: 'cancelado'},
  {especialista: 'Dr. Bacon', especialidad: 'traumatologia', fecha: '01/01/2020', hora: '17:00hs', paciente: 'Pepe', comentario: 'lorem', estado: 'aceptado'}
];

currentRate = 0;


constructor(private modalService: NgbModal) { }

public isCollapsed = false;



ngOnInit(): void {
}

open(content) {
this.modalService.open(content);
}

}
