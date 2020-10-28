import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from "../../servicios/auth.service";
import { FirebaseService } from "../../servicios/firebase.service";
import { ToastrService } from 'ngx-toastr';

import { Router } from '@angular/router';

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
      this.firebaseService.subirAvatar(mail,1,this.fotoUno,{user: mail, numAvatar: 1})
    }
    if(this.fotoDos != null){
      this.firebaseService.subirAvatar(mail,2,this.fotoDos,{user: mail, numAvatar: 2})
    }
  }

  verificarCaptha(){
    if(this.resultadoReal == parseInt(this.resultadoUser)){
      //this.Register();
      this.modalService.dismissAll()
    }else {
      this.toastr.error('Resultado incorrecto, intente nuevamente','Error');
    }
  }

}
