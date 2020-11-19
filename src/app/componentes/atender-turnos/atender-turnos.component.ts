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
  resenia;
  edadPaciente;
  temperaturaPaciente;
  presionPaciente;
  campos= 0;

  campoExtraUno;
  datoExtraUno;
  campoExtraDos;
  datoExtraDos;
  campoExtraTres;
  datoExtraTres;

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

    if((this.edadPaciente == '' || this.edadPaciente == null) ||
       (this.temperaturaPaciente == '' || this.temperaturaPaciente == null) ||
       (this.presionPaciente == '' || this.presionPaciente == null) ||
       (this.resenia == '' || this.resenia == null)){

         this.toastr.error('Complete todos los campos para finalizar el turno','Faltan datos');
         
    } else {

        if (this.campoExtraUno){
          if(this.datoExtraUno == '' || this.datoExtraUno == null){
            this.toastr.error('Complete todos los campos para finalizar el turno','Faltan datos');
          } else{
              if(this.campoExtraDos){
                if(this.datoExtraDos == '' || this.datoExtraDos == null){
                  this.toastr.error('Complete todos los campos para finalizar el turno','Faltan datos');
                } else {
                  if(this.campoExtraTres){
                    if(this.datoExtraTres == '' || this.datoExtraTres == null){
                      this.toastr.error('Complete todos los campos para finalizar el turno','Faltan datos');
                    } else {
                      this.firebaseService.agregarReseniaATurnos(fecha+' '+especialista,resenia,'completado')
                      this.firebaseService.agregarReseniaAProfesional(especialista,fecha,resenia,'completado');
                      this.firebaseService.agregarReseniaAPaciente(paciente,fecha,resenia,'completado');

                      this.firebaseService.agregarDatosGenericos(fecha+' '+especialista,this.edadPaciente,this.temperaturaPaciente,this.presionPaciente);
                      this.firebaseService.agregarDatosGenericosPaciente(paciente,fecha,this.edadPaciente,this.temperaturaPaciente,this.presionPaciente);
                      this.firebaseService.agregarDatosGenericosProfesional(especialista,fecha,this.edadPaciente,this.temperaturaPaciente,this.presionPaciente);

                      this.firebaseService.agregarCamposExtra(fecha+' '+especialista,this.campoExtraUno,this.datoExtraUno,this.campoExtraDos,this.datoExtraDos,this.campoExtraTres,this.datoExtraTres);
                      this.firebaseService.agregarCamposExtraPaciente(paciente,fecha,this.campoExtraUno,this.datoExtraUno,this.campoExtraDos,this.datoExtraDos,this.campoExtraTres,this.datoExtraTres);
                      this.firebaseService.agregarCamposExtraProfesional(especialista,fecha,this.campoExtraUno,this.datoExtraUno,this.campoExtraDos,this.datoExtraDos,this.campoExtraTres,this.datoExtraTres);
                      this.toastr.success('El paciente fue atendido con exito','Turno completo');

                    }

                  } else {
                    this.firebaseService.agregarReseniaATurnos(fecha+' '+especialista,resenia,'completado')
                    this.firebaseService.agregarReseniaAProfesional(especialista,fecha,resenia,'completado');
                    this.firebaseService.agregarReseniaAPaciente(paciente,fecha,resenia,'completado');

                    this.firebaseService.agregarDatosGenericos(fecha+' '+especialista,this.edadPaciente,this.temperaturaPaciente,this.presionPaciente);
                    this.firebaseService.agregarDatosGenericosPaciente(paciente,fecha,this.edadPaciente,this.temperaturaPaciente,this.presionPaciente);
                    this.firebaseService.agregarDatosGenericosProfesional(especialista,fecha,this.edadPaciente,this.temperaturaPaciente,this.presionPaciente);

                    this.firebaseService.agregarCamposExtra(fecha+' '+especialista,this.campoExtraUno,this.datoExtraUno,this.campoExtraDos,this.datoExtraDos);
                    this.firebaseService.agregarCamposExtraPaciente(paciente,fecha,this.campoExtraUno,this.datoExtraUno,this.campoExtraDos,this.datoExtraDos);
                    this.firebaseService.agregarCamposExtraProfesional(especialista,fecha,this.campoExtraUno,this.datoExtraUno,this.campoExtraDos,this.datoExtraDos);
                    this.toastr.success('El paciente fue atendido con exito','Turno completo');
                  }
                }

              } else {
                this.firebaseService.agregarReseniaATurnos(fecha+' '+especialista,resenia,'completado')
                this.firebaseService.agregarReseniaAProfesional(especialista,fecha,resenia,'completado');
                this.firebaseService.agregarReseniaAPaciente(paciente,fecha,resenia,'completado');

                this.firebaseService.agregarDatosGenericos(fecha+' '+especialista,this.edadPaciente,this.temperaturaPaciente,this.presionPaciente);
                this.firebaseService.agregarDatosGenericosPaciente(paciente,fecha,this.edadPaciente,this.temperaturaPaciente,this.presionPaciente);
                this.firebaseService.agregarDatosGenericosProfesional(especialista,fecha,this.edadPaciente,this.temperaturaPaciente,this.presionPaciente);

                this.firebaseService.agregarCamposExtra(fecha+' '+especialista,this.campoExtraUno,this.datoExtraUno);
                this.firebaseService.agregarCamposExtraPaciente(paciente,fecha,this.campoExtraUno,this.datoExtraUno);
                this.firebaseService.agregarCamposExtraProfesional(especialista,fecha,this.campoExtraUno,this.datoExtraUno);
                this.toastr.success('El paciente fue atendido con exito','Turno completo');
              }
              
          }
        } else {

           this.firebaseService.agregarReseniaATurnos(fecha+' '+especialista,resenia,'completado')
           this.firebaseService.agregarReseniaAProfesional(especialista,fecha,resenia,'completado');
           this.firebaseService.agregarReseniaAPaciente(paciente,fecha,resenia,'completado');

           this.firebaseService.agregarDatosGenericos(fecha+' '+especialista,this.edadPaciente,this.temperaturaPaciente,this.presionPaciente);
           this.firebaseService.agregarDatosGenericosPaciente(paciente,fecha,this.edadPaciente,this.temperaturaPaciente,this.presionPaciente);
           this.firebaseService.agregarDatosGenericosProfesional(especialista,fecha,this.edadPaciente,this.temperaturaPaciente,this.presionPaciente);

           this.toastr.success('El paciente fue atendido con exito','Turno completo');

        }

       }

    
  }



  reset(){
  this.edadPaciente = '';
  this.temperaturaPaciente = '';
  this.presionPaciente= '';
  this.campos= 0;

  }

}
