import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore,private storage: AngularFireStorage) { }

  traerColeccion(coleccion:string){
    return new Promise((resolve,reject) => {
      this.firestore.collection(coleccion).valueChanges()
      .subscribe(datos => resolve(datos), error => reject(error));
    }) 
  }

  traerColeccionPorEstado(coleccion:string){
    return this.firestore.collection(coleccion, ref => ref.where('activo','==',true)).valueChanges();
  }

  agregarUsuario(documento:string,data:any){
    this.firestore.collection('usuarios').doc(documento).set(data);
  }

  subirAvatar(mail:string,numero:any,archivo:any,metadata:any){
    this.storage.upload(`/usuarios/${mail}/${numero}`,archivo,metadata);
  }

  agregarEspecialidad(documento:string,especialidad:string){
    this.firestore.collection('especialidades').doc(documento).set({nombre: especialidad});
  }

  traerUserPorMail(email:string){
    return  new Promise((resolve,reject) => {
      this.firestore.collection('usuarios', ref => {return ref.where('email','==',email)}).valueChanges()
      .subscribe((datos:any) => {
        resolve(datos);
       },error => reject(error));
    })
  }


}
