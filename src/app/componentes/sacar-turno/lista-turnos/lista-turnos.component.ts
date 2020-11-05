import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FirebaseService } from "../../../servicios/firebase.service";

@Component({
  selector: 'app-lista-turnos',
  templateUrl: './lista-turnos.component.html',
  styleUrls: ['./lista-turnos.component.scss']
})
export class ListaTurnosComponent implements OnInit {

  constructor(private firebaseService: FirebaseService) { }

  listaTurnos:any;
  @Output() seleccionarTurnoEvent = new EventEmitter<string>();
  @Input() profesionalSeleccionadoInput:string

  selected:any;
  

  ngOnInit(): void {
    
  }
  ngOnChanges(){
    this.firebaseService.traerTurnosLibres(this.profesionalSeleccionadoInput).subscribe(datos => this.listaTurnos = datos)//.then(datos=>this.listaTurnos = datos);
  }

  seleccionarTurno(turno:string){
    this.seleccionarTurnoEvent.emit(turno);
    this.selected=turno;
  }

}
