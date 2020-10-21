import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth: AngularFireAuth) { }

  login(mail: string, password: string) {

    return new Promise((resolve, rejected) => {
      this.AFauth.signInWithEmailAndPassword(mail, password).then(response => {
        resolve(response);
      }, (error: any) => {
        console.log(error);
        switch (error.code) {
          case "auth/user-not-found":
            rejected("El usuario no existe, por favor, registrese");
            break;
          case "auth/invalid-email":
            rejected("El mail no es valido");
            break;
          case "auth/wrong-password":
            rejected("La contraseña no es correcta");
            break;
          default:
            rejected("ERROR");
            break;
        }
      });

    });
  }
  

  register(mail: string, password: string) {

    return new Promise<any>((resolve, rejected) => {
      this.AFauth.createUserWithEmailAndPassword(mail, password).then((response: any) => {
        this.verificationMail();
        resolve(response);
      }, (error: any) => {
        switch (error.code) {
          case "auth/weak-password":
            rejected("La contrasena debe ser mayor a 6 caracteres");
            break;
          case "auth/invalid-email":
            rejected("Mail invalido");
            break;
          case "auth/wrong-password":
            rejected("Contraseña invalida");
            break;
          case "auth/email-already-in-use":
            rejected("El correo ya se encuentra registrado");
            break;
          default:
            rejected("ERROR");
            break;
        }
      });
    });
  }

  getCurrentUser() {
    return this.AFauth.currentUser;
  }

  logOutCurrentUser() {
    this.AFauth.signOut();
  }

  async verificationMail(){
    return await (await this.AFauth.currentUser).sendEmailVerification(); 
  }


}
