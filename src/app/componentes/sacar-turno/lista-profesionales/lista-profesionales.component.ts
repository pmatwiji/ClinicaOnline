import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FirebaseService } from "../../../servicios/firebase.service";

@Component({
  selector: 'app-lista-profesionales',
  templateUrl: './lista-profesionales.component.html',
  styleUrls: ['./lista-profesionales.component.scss']
})
export class ListaProfesionalesComponent implements OnInit {

  constructor(private firebaseService: FirebaseService) { }

  listaProfesionales:any = null;
  @Output() seleccionarProfesionalEvent = new EventEmitter<string>();
  @Input() especialidadSeleccionadaInput:string

  selected:any;

  

  ngOnInit(): void {
    
  }
  ngOnChanges(){
    this.firebaseService.traerProfesionalesHabilitadosPorEspecialidad(this.especialidadSeleccionadaInput).then(datos=>this.listaProfesionales = datos)
    this.selected=null;
    
  }

  seleccionarProfesional(profesional:string){
    this.seleccionarProfesionalEvent.emit(profesional);
    this.selected=profesional;
  }
  
}
