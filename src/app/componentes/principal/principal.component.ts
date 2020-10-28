import { animate, state, transition, trigger, style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/servicios/auth.service';
import { FirebaseService } from "../../servicios/firebase.service";


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
  animations: [
    trigger('fade', [
      state('true',style({opacity: 1})),
      state('false', style({opacity: 0})),
      transition('false <=> true', animate(1000))
    ]),
    trigger('moverLogin', [
      state('true',style({transform: 'translateX(-100%)', opacity: 0})),
      state('false', style({opacity: 1,transform: 'translateX(50%)'})),
      transition('false <=> true', animate(500))
    ]),
    trigger('moverIzqRegistro', [
      state('true',style({transform: 'translateX(100%)', opacity: 0})),
      state('false', style({opacity: 1,transform: 'translateX(-50%)'})),
      transition('false <=> true', animate(500))
    ]),
  ]
})
export class PrincipalComponent implements OnInit {

  estadoLogin:boolean= false;
  estadoRegistro:boolean= true;

  inputEspecialidades:any;

  constructor(private firebaseService: FirebaseService, private authService: AuthService) { }

  ngOnInit(): void {
    this.firebaseService.traerColeccion('especialidades').then(datos=>this.inputEspecialidades = datos)
    //console.log(this.inputEspecialidades)
    this.authService.logOutCurrentUser();
  }

  cambiarEstadoLogin(estadoLogin:boolean){
    this.estadoLogin=estadoLogin;
    this.estadoRegistro=false;
  }

  cambiarEstadoRegistro(estadoRegistro:boolean){
    this.estadoLogin=false;
    this.estadoRegistro=estadoRegistro;
  }

}
