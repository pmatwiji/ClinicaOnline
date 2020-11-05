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

  cargarTurno(coleccion,documento,usuario,especialidad){
    this.firestore.collection(coleccion +' turnos').doc(documento).update({ocupado: true, paciente: usuario, especialidad: especialidad, estado: 'pendiente'});
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
        if(datos.length == 0){
          datos = null
        }
        resolve(datos);
       },error => reject(error));
    })
  }

  traerTurnosLibres(coleccion){
     return this.firestore.collection(coleccion+ ' turnos', ref => {return ref.where('ocupado','==',false)}).valueChanges()
  }

  traerTurnosPendientes(coleccion){
     return this.firestore.collection(coleccion+ ' turnos', ref => {return ref.where('estado','==','pendiente')}).valueChanges()
  }

  traerTurnosAceptados(coleccion){
    return this.firestore.collection(coleccion+ ' turnos', ref => {return ref.where('estado','==','aceptado')}).valueChanges()
 }

  cancelarTurno(coleccion,documento){
    this.firestore.collection(coleccion+ ' turnos').doc(documento).update({estado: 'cancelado'});
  }

  aceptarTurno(coleccion,documento){
    this.firestore.collection(coleccion+ ' turnos').doc(documento).update({estado: 'aceptado'});
  }

  agregarResenia(coleccion,documento,resenia){
    this.firestore.collection(coleccion+ ' turnos').doc(documento).update({reseña: resenia, estado: 'completado'});
  }

  habilitarProfesional(documento){
    this.firestore.collection('usuarios').doc(documento).update({habilitado: true});
  }

  agregarHorarios(coleccion,documento,fecha){
    this.firestore.collection(coleccion+' turnos').doc(documento).set({ocupado: false, fecha: fecha});
  }

  



}
