import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirebaseService } from "../../../servicios/firebase.service";

@Component({
  selector: 'app-lista-especialidad',
  templateUrl: './lista-especialidad.component.html',
  styleUrls: ['./lista-especialidad.component.scss']
})
export class ListaEspecialidadComponent implements OnInit {

  constructor(private firebaseService: FirebaseService) { }

  listaEspecialidades:any;
  @Output() seleccionarEspecialidadEvent = new EventEmitter<string>();
  selected:any;

  ngOnInit(): void {
    this.firebaseService.traerColeccion('especialidades').then(datos=>this.listaEspecialidades = datos)
  }

  seleccionarEspecialidad(especialidad:string){
    this.seleccionarEspecialidadEvent.emit(especialidad);
    this.selected=especialidad;
    
  }

}
