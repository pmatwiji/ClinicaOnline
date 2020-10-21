import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../servicios/auth.service";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-verificacion-mail',
  templateUrl: './verificacion-mail.component.html',
  styleUrls: ['./verificacion-mail.component.scss']
})
export class VerificacionMailComponent implements OnInit {

   userMail:any;
   mensaje:string='';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().then((response:any) => {
      this.userMail = response.email;
    }).catch((error :any) => console.log(error));
    
  }

  backHome(){
    this.router.navigate(['/'])
  }

  resendMail(){
    if(this.authService.verificationMail()){
      this.mensaje="Correo enviado con exito!"
    }else{
      this.mensaje='Hubo un error al enviar el correo, intente mas tarde';
    }

  }

}
