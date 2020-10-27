import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from "../../servicios/auth.service";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  cambiarEstadoLogin(estado:boolean){
    this.cambiarEstadoLoginEvent.emit(estado);
    this.correo = '';
    this.password = '';
    this.mensaje = '';
  }

   Login() {
    this.authService.login(this.correo, this.password).then((response:any) => {
      //alert(response.user.emailVerified);
      if(response.user.emailVerified == true){
        this.router.navigate(['/home']);
      } else {
        if(this.verificarHardcodeo()){
          this.router.navigate(['/home']);
        } else {
          this.mensaje = "Falta verificar el correo electronico";
          this.toastr.error(this.mensaje,'Error');
        }
      }
    }).catch(error => this.toastr.error(error,'Error') );
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
