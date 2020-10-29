import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
//import {storage} from 'firebase'

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

  agregarEspecialidad(documento:string,especialidad:string){
    this.firestore.collection('especialidades').doc(documento).set({nombre: especialidad});
  }

  agregarTurno(documento:string,data:any){
    this.firestore.collection('turnos').doc(documento).set(data);
  }

  traerUserPorMail(email:string){
    return  new Promise((resolve,reject) => {
      this.firestore.collection('usuarios', ref => {return ref.where('email','==',email)}).valueChanges()
      .subscribe((datos:any) => {
        resolve(datos);
       },error => reject(error));
    })
  }

  traerProfesionalesNoHabilitados(){
    return  new Promise((resolve,reject) => {
      this.firestore.collection('usuarios', ref => {return ref.where('habilitado','==',false)}).valueChanges()
      .subscribe((datos:any) => {
        resolve(datos);
       },error => reject(error));
    })
  }

  traerProfesionalesHabilitadosPorEspecialidad(especialidad){
    return  new Promise((resolve,reject) => {
      this.firestore.collection('usuarios', ref => {return ref.where('habilitado','==',true).where('especialidades','array-contains',especialidad)}).valueChanges()
      .subscribe((datos:any) => {
        resolve(datos);
       },error => reject(error));
    })
  }

  habilitarProfesional(documento){
    this.firestore.collection('usuarios').doc(documento).update({habilitado: true});
  }

  agregarHorarios(documento,dias,horario){
    this.firestore.collection('usuarios').doc(documento).update({horario: horario, dias: dias});
  }

  



}
