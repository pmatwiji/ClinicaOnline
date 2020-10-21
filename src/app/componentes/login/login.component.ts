import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from "../../servicios/auth.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() cambiarEstadoLoginEvent = new EventEmitter<boolean>();

  correo:string = '';
  password:string= '';
  mensaje:string= '';

  inicioRapido:any = null;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  cambiarEstadoLogin(estado:boolean){
    this.cambiarEstadoLoginEvent.emit(estado);
    this.correo = '';
    this.password = '';
    this.mensaje = '';
  }

   Login() {
    try{
    this.authService.login(this.correo, this.password).then((response:any) => {
      if(this.verificarHardcodeo){
        this.router.navigate(['/test']);
      } else {
          if(response.user.emailVerified){
          this.router.navigate(['/test']);
        } else {
          this.mensaje = "Falta verificar el correo electronico";
        }
      }
    }).catch(error => this.mensaje = error);
      
    }catch(error){
      this.mensaje = error;
    }
  }

  resendMail(){
    this.router.navigate(['/verificacion-mail']);
  }

  verificarHardcodeo():boolean{
    if(this.correo== 'admin@admin.com' || this.correo== 'profesional@profesional.com' || this.correo== 'paciente@paciente.com'){
      return true;
    } else {
      return false;
    }
  }

  seleccionarInicioRapido(){
    switch (this.inicioRapido) {
      case 'paciente':
        this.correo = 'paciente@paciente.com';
        this.password = '123456'
      break;
      case 'admin':
        this.correo = 'admin@admin.com';
        this.password = '123456'
      break;
      case 'profesional':
        this.correo = 'profesional@profesional.com';
        this.password = '123456'
      break;
      default:
        break;
    }
  }



}
