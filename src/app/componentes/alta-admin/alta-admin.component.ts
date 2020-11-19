import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from "../../servicios/auth.service";
import { FirebaseService } from "../../servicios/firebase.service";
import { ToastrService } from 'ngx-toastr';

import { Router } from '@angular/router';

import {storage} from 'firebase'
import { resetFakeAsyncZone } from '@angular/core/testing';

@Component({
  selector: 'app-alta-admin',
  templateUrl: './alta-admin.component.html',
  styleUrls: ['./alta-admin.component.scss']
})
export class AltaAdminComponent implements OnInit {

  nombre:string = '';
  apellido:string = '';
  correo:string = '';
  password:string = '';
  repetirPassword:string = '';
  fotoUno:any = null;
  pathfotoUno = '/avatar-default.png';
  fotoDos:any = null;
  pathfotoDos = '/avatar-default.png';

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
      //this.firebaseService.subirAvatar(mail,1,this.fotoUno,{user: mail, numAvatar: 1})
    }
    if(this.fotoDos != null){
      //this.firebaseService.subirAvatar(mail,2,this.fotoDos,{user: mail, numAvatar: 2})
    }
  }

  verificarCaptha(){
    if(this.resultadoReal == parseInt(this.resultadoUser)){
      this.Register();
      this.modalService.dismissAll()
      this.toastr.success('Usuario registrado con exito','Registrado');
      this.reset();
    }else {
      this.toastr.error('Resultado incorrecto, intente nuevamente','Error');
    }
  }

  reset(){
    this.nombre = '';
    this.apellido = '';
    this.correo = '';
    this.password = '';
    this.repetirPassword = '';
    this.fotoUno = null;
    this.pathfotoUno = '/avatar-default.png';
    this.fotoDos = null;
    this.pathfotoDos = '/avatar-default.png';
  }

  Register() {

    if ((this.password == null || this.password == "") || 
        (this.repetirPassword == null || this.repetirPassword == "") || 
        (this.correo == null || this.correo == "") || 
        (this.nombre == null || this.nombre == "") ||
        (this.apellido == null || this.apellido == "")) {
          this.mensaje = "Faltan datos, por favor, complete todos los campos";
          this.toastr.error(this.mensaje,'Error');
    }
    else {

      if (this.password == this.repetirPassword) {

            let refUno = storage().ref(`/usuarios/${this.correo}/1`);
            let refDos = storage().ref(`/usuarios/${this.correo}/2`);


            let metadataUno = {
              customMetadata: {
                'user': this.correo,
                'numAvatar': '1'
              }
            }

            let metadataDos = {
              customMetadata: {
                'user': this.correo,
                'numAvatar': '2'
              }
            }

            if(this.fotoUno != null){
              refUno.put(this.fotoUno).then( a => {
                a.ref.getDownloadURL().then((path) => {
                  this.pathfotoUno= path
                })
                
              })
            } else {
              this.pathfotoUno = 'https://firebasestorage.googleapis.com/v0/b/clinicaonline-e95c7.appspot.com/o/avatar-default.png?alt=media&token=4be91ff3-613e-4410-ac37-2d4a3b46d9eb';
            }

            if(this.fotoDos != null){
              refDos.put(this.fotoDos).then( a => {
                a.ref.getDownloadURL().then((path) => {
                  this.pathfotoDos= path
                })
                
              })
            } else {
              this.pathfotoDos = 'https://firebasestorage.googleapis.com/v0/b/clinicaonline-e95c7.appspot.com/o/avatar-default.png?alt=media&token=4be91ff3-613e-4410-ac37-2d4a3b46d9eb';
            }

        this.authService.register(this.correo, this.password).then(response => {

          

            let datosUsuario={
              nombre: this.nombre,
              apellido: this.apellido,
              email: this.correo,
              perfil: 'admin',
              fotoUno: this.pathfotoUno,
              fotoDos: this.pathfotoDos,
            }

            
            this.firebaseService.agregarUsuario(response.user.email,datosUsuario);
                        
          

        }).catch(error => this.toastr.error(error,'Error'));

        
        
        
      } else {
        this.mensaje = "Las contraseñas no son iguales";
        this.toastr.error(this.mensaje,'Error');
      }
    }
  }

}
