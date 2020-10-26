import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from "../../servicios/auth.service";
import { FirebaseService } from "../../servicios/firebase.service";
import { ToastrService } from 'ngx-toastr';

import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  @Input() listaEspecialidades: any;
  @Output() cambiarEstadoRegistroEvent = new EventEmitter<boolean>();



  nombre:string = '';
  apellido:string = '';
  correo:string = '';
  password:string = '';
  repetirPassword:string = '';
  perfil:string = null;
  especialidad:string = null;
  nuevaEspecialidad:string = '';
  fotoUno:any = null;
  pathfotoUno = '/avatar-default.png';
  fotoDos:any = null;
  pathfotoDos = '/avatar-default.png';

  especialidadesUpload=[];

  mensaje:string;

  resultadoUser:string;
  resultadoReal:number;
  primerNumero:number;
  segundoNumero:number;



  constructor(private authService: AuthService,
              private router: Router,
              private firebaseService: FirebaseService,
              private toastr: ToastrService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open(content) {
    this.modalService.open(content);
    this.primerNumero = Math.floor(Math.random() * (6 - 1)) + 1;
    this.segundoNumero = Math.floor(Math.random() * (6 - 1)) + 1;
    this.resultadoReal = this.primerNumero + this.segundoNumero;
  }

  verificarCaptha(){
    if(this.resultadoReal == parseInt(this.resultadoUser)){
      this.Register();
      this.modalService.dismissAll()
    }else {
      this.toastr.error('Resultado incorrecto, intente nuevamente','Error');
    }
  }

  cambiarEstadoRegistro(estado:boolean){
    this.cambiarEstadoRegistroEvent.emit(estado);
    this.nombre ='';
    this.apellido='';
    this.correo='';
    this.password='';
    this.repetirPassword='';
    this.perfil = null;
    this.especialidad='';
    this.nuevaEspecialidad = '';
    this.fotoUno=null;
    this.fotoDos=null;
    this.mensaje='';
  }

  Register() {

    if ((this.password == null || this.password == "") || 
        (this.repetirPassword == null || this.repetirPassword == "") || 
        (this.correo == null || this.correo == "") || 
        (this.nombre == null || this.nombre == "") ||
        (this.apellido == null || this.apellido == "") ||
        (this.perfil == null || this.perfil == "" )) {
          this.mensaje = "Faltan datos, por favor, complete todos los campos";
          this.toastr.error(this.mensaje,'Error');
    }
    else {

      if (this.password == this.repetirPassword) {

         if(this.fotoUno != null){
          this.pathfotoUno = `/usuarios/${this.correo}/1`;
        }

        if(this.fotoDos != null){
          this.pathfotoDos = `/usuarios/${this.correo}/2`;
        }

        
        
        this.authService.register(this.correo, this.password).then(response => {
          
          if(this.perfil == 'paciente'){

            let datosUsuario={
              nombre: this.nombre,
              apellido: this.apellido,
              email: this.correo,
              perfil: 'paciente',
              fotoUno: this.pathfotoUno,
              fotoDos: this.pathfotoDos,
            }

            this.verificarFotosVacias(response.user.email)
            this.firebaseService.agregarUsuario(response.user.email,datosUsuario);
          } else {

            let datosProfesional={
              nombre: this.nombre,
              apellido: this.apellido,
              email: this.correo,
              perfil: 'profesional',
              fotoUno: this.pathfotoUno,
              fotoDos: this.pathfotoDos,
              especialidades: this.especialidadesUpload,
              habilitado: false
            }

            // this.firebaseService.subirAvatar(response.user.email,1,this.fotoUno,{user: response.user.email, numAvatar: 1})
            // this.firebaseService.subirAvatar(response.user.email,2,this.fotoDos,{user: response.user.email, numAvatar: 2})
            this.verificarFotosVacias(response.user.email)
            this.firebaseService.agregarUsuario(response.user.email,datosProfesional);
          }

            this.router.navigate(['/verificacion-mail']);
          

        }).catch(error => this.toastr.error(error,'Error'));
        
        
      } else {
        this.mensaje = "Las contraseñas no son iguales";
        this.toastr.error(this.mensaje,'Error');
      }
    }
  }

  agregarEspecialidad(){
    if(this.especialidad == 'otros'){
      if (this.nuevaEspecialidad == '' || this.nuevaEspecialidad == null){
        this.mensaje = "Debe completar el campo de especialidad";
        this.toastr.error(this.mensaje,'Error');
      } else if (!this.chequearRepetido(this.nuevaEspecialidad)) {
        this.especialidadesUpload.push(this.nuevaEspecialidad);
        this.firebaseService.agregarEspecialidad(this.nuevaEspecialidad,this.nuevaEspecialidad)
        this.nuevaEspecialidad = '';
      } else {
        this.mensaje = "Especialidad repetida";
        this.toastr.error(this.mensaje,'Error');
      }
      
    } else{
      if(this.especialidad == '' || this.especialidad == null){
        this.mensaje = "Debe completar el campo de especialidad";
        this.toastr.error(this.mensaje,'Error');
      } else if(!this.chequearRepetido(this.especialidad)){
        this.especialidadesUpload.push(this.especialidad);
      } else {
        this.mensaje = "Especialidad repetida";
        this.toastr.error(this.mensaje,'Error');
      }
      
    }
    
  }

  chequearRepetido(especialidad:any):boolean{
    let retorno = false;
    this.especialidadesUpload.forEach(element => {
      if(especialidad == element){
        retorno = true;
      }
    });

    return retorno;
  }

  valueFotos(e, numero){
    if(numero == 1){
      this.fotoUno = e.target.files[0];
      console.log(this.fotoUno);
    } else {
      this.fotoDos = e.target.files[0];
      console.log(this.fotoDos);
    }
  }

  verificarFotosVacias(mail:string){
    if(this.fotoUno != null){
      this.firebaseService.subirAvatar(mail,1,this.fotoUno,{user: mail, numAvatar: 1})
    }
    if(this.fotoDos != null){
      this.firebaseService.subirAvatar(mail,2,this.fotoDos,{user: mail, numAvatar: 2})
    }
  }


}
