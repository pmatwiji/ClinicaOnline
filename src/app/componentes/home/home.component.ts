import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/servicios/auth.service';
import { FirebaseService } from "../../servicios/firebase.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentUser:any;
  mailUser:any;
  fotoPerfil:number = 1

  compSeleccionado:string;

  public isCollapsed = true;

  constructor(private firebaseService: FirebaseService, private authService: AuthService, private router: Router) {
    this.authService.getCurrentUser().then((response:any) => {
      this.mailUser = response.email;
      //console.log(this.mailUser)
      this.firebaseService.traerUserPorMail(this.mailUser).then((datos) => {
        this.currentUser = datos;
        //console.log(this.currentUser)
        this.compSeleccionado = this.currentUser[0].perfil == 'profesional' ? 'Turnos pendientes' : this.currentUser[0].perfil == 'paciente' ? 'Sacar turno' : this.currentUser[0].perfil == 'admin' ? 'Habilitar profesional' : 'Error';
      }).catch((error :any) => console.log(error));
      
    }).catch((error :any) => console.log(error)); 
   }

  ngOnInit(): void {}

  logout(){
    this.authService.logOutCurrentUser();
    this.router.navigate(['/']);
  }
  

}
