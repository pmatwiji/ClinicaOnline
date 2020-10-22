import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
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

  nombre:string;
  apellido:string;
  correo:string;
  password:string;
  repetirPassword:string;
  perfil:string = null;
  especialidad:string = null;
  nuevaEspecialidad:string;
  fotoUno:string;
  fotoDos:string;

  especialidadesUpload=[];

  mensaje:string;

  // especialidades: Observable<any[]>;
  // listaEspecialidades: any;

  constructor(private authService: AuthService,private router: Router,private firebaseService: FirebaseService, private toastr: ToastrService) { }

  ngOnInit(): void {
    //this.firebaseService.traerColeccion('especialidades').then(datos=>this.listaEspecialidades =datos)
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
    this.fotoUno='';
    this.fotoDos='';
    this.mensaje='';
  }

  Register() {

    if ((this.password == null || this.password == "") || 
        (this.repetirPassword == null || this.repetirPassword == "") || 
        (this.correo == null || this.correo == "") || 
        (this.nombre == null || this.nombre == "") ||
        (this.apellido == null || this.apellido == "") ||
        (this.perfil == null || this.perfil == "" ) ){
      this.mensaje = "Faltan datos, por favor, complete todos los campos";
      this.toastr.error(this.mensaje,'Error');
    }
    else {

      if (this.password == this.repetirPassword) {
        
        this.authService.register(this.correo, this.password).then(response => {

            this.authService.getCurrentUser().then((response: any) => {
            //this.db.list('usuarios').set('UID: '+response.uid, { correo:response.email, id: response.uid });
            //this.authService.logOutCurrentUser();
            this.router.navigate(['/verificacion-mail']);
          });

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



}
