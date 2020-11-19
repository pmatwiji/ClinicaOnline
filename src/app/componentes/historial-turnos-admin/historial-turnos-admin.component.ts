import { Component, OnInit , Input} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FirebaseService } from "../../servicios/firebase.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-historial-turnos-admin',
  templateUrl: './historial-turnos-admin.component.html',
  styleUrls: ['./historial-turnos-admin.component.scss']
})
export class HistorialTurnosAdminComponent implements OnInit {

  
  @Input() inputCurrentUser:any;

  listaTurnos;
  copiaLista = [];
  busqueda;
  filtroSeleccionado =null;

  public isCollapsed = false;

  constructor(private modalService: NgbModal,private firebaseService: FirebaseService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.firebaseService.traerHistorialTurnos().subscribe(datos => this.listaTurnos = datos)
    this.firebaseService.traerHistorialTurnos().subscribe(datos => this.copiaLista = datos)
    
  }

  open(content) {
    this.modalService.open(content);
  }

  filtro(busqueda,filtro){

    this.listaTurnos = this.listaTurnos.filter( function(turno) {
      switch (filtro) {
        case 'paciente':
          return turno.paciente.toLowerCase().includes(busqueda);
        case 'especialista':
          return turno.especialista.toLowerCase().includes(busqueda);
        case 'especialidad':
          return turno.especialidad.toLowerCase().includes(busqueda);
        case 'temperatura':
          return turno.temperatura?.toString().toLowerCase().includes(busqueda);
        case 'fecha':
          return turno.fecha.toString().toLowerCase().includes(busqueda);
        case 'extra':
          if(turno.campoExtraUno){
            if(turno.campoExtraUno.toLowerCase().includes(busqueda)){
              return turno.campoExtraUno.toLowerCase().includes(busqueda);
            }
          }

          if(turno.campoExtraDos){
            if(turno.campoExtraDos.toLowerCase().includes(busqueda)){
              return turno.campoExtraDos.toLowerCase().includes(busqueda);
            }
          }

          if(turno.campoExtraTres){
            if(turno.campoExtraTres.toLowerCase().includes(busqueda)){
              return turno.campoExtraTres.toLowerCase().includes(busqueda);
            }
          }

          if(turno.datoExtraUno){
            if(turno.datoExtraUno.toLowerCase().includes(busqueda)){
              return turno.datoExtraUno.toLowerCase().includes(busqueda);
            }
          }

          if(turno.datoExtraDos){
            if(turno.datoExtraDos.toLowerCase().includes(busqueda)){
              return turno.datoExtraDos.toLowerCase().includes(busqueda);
            }
          }

          if(turno.datoExtraTres){
            if(turno.datoExtraTres.toLowerCase().includes(busqueda)){
              return turno.datoExtraTres.toLowerCase().includes(busqueda);
            }
          }
         
           
        default:
          break;
      }
    })
    
    if(busqueda == ''){
      this.listaTurnos = this.copiaLista
    }
    
    
  }




}
