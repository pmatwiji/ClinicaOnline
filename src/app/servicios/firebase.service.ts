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

 traerHistorialProfesional(coleccion){
  return this.firestore.collection(coleccion + ' turnos', ref => {return ref.where('estado','in',['cancelado', 'completado'])}).valueChanges()
}

traerHistorialPaciente(coleccion){
  return this.firestore.collection('turnos ' + coleccion, ref => {return ref.where('estado','not-in',['pendiente', 'aceptado'])}).valueChanges()
}

traerTurnosPaciente(coleccion){
  return this.firestore.collection('turnos ' + coleccion, ref => {return ref.where('estado','not-in',['completado', 'cancelado'])}).valueChanges()
}

  cancelarTurno(documento){
    this.firestore.collection('turnos').doc(documento).update({estado: 'cancelado'});
  }

  cancelarTurnoPaciente(coleccion,documento){
    this.firestore.collection('turnos ' + coleccion).doc(documento).update({estado: 'cancelado'});
  }

  aceptarTurno(documento){
    this.firestore.collection('turnos').doc(documento).update({estado: 'aceptado'});
  }

  aceptarTurnoPaciente(paciente,fecha){
    this.firestore.collection('turnos ' + paciente ).doc(fecha).update({estado: 'aceptado'});
  }

  aceptarTurnoProfesional(profesional,fecha){
    this.firestore.collection(profesional + ' turnos').doc(fecha).update({estado: 'aceptado'});
  }

  agregarReseniaATurnos(documento,resenia,estado){
    this.firestore.collection('turnos').doc(documento).update({resenia: resenia, estado: estado});
  }

  agregarReseniaAProfesional(coleccion,documento,resenia,estado){
    this.firestore.collection(coleccion+ ' turnos').doc(documento).update({resenia: resenia, estado: estado});
  }

  agregarReseniaAPaciente(coleccion,documento,resenia,estado){
    this.firestore.collection('turnos ' + coleccion).doc(documento).update({resenia: resenia, estado: estado});
  }

  agregarTurno(fechaTurno:string, especialidad:string, especialista:string, paciente:string,estado:string,){
    this.firestore.collection('turnos').doc(fechaTurno + ' ' + especialista).set(
      {fecha: fechaTurno,especialista: especialista, especialidad: especialidad, paciente: paciente, estado: estado});
  }

  agregarATurnosPaciente(coleccion,documento,especialista,especialidad, paciente, fecha,estado,fechaCreado){
    this.firestore.collection('turnos ' + coleccion).doc(documento).set(
      {estado: estado,especialista: especialista, especialidad: especialidad, paciente: paciente, fecha: fecha, creado: fechaCreado});
  }

  agregarATurnosProfesional(coleccion,documento,especialista,especialidad, paciente,estado,fechaCreado,ocupado){
    this.firestore.collection(coleccion + ' turnos').doc(documento).update(
      {estado: estado,especialista: especialista, especialidad: especialidad, paciente: paciente, creado: fechaCreado, ocupado: ocupado});
  }

  agregarComentario(documento,comentario,puntaje){
    this.firestore.collection('turnos').doc(documento).update({comentario: comentario, puntaje: puntaje});
  }

  agregarComentarioPaciente(paciente,fecha,comentario,puntaje){
    this.firestore.collection('turnos ' + paciente).doc(fecha).update({comentario: comentario, puntaje: puntaje});
  }

  agregarComentarioProfesional(profesional, fecha,comentario,puntaje){
    this.firestore.collection(profesional+' turnos').doc(fecha).update({comentario: comentario, puntaje: puntaje});
  }

  resetearTurno(coleccion,documento){
    this.firestore.collection(coleccion+ ' turnos').doc(documento).set({ocupado: false, fecha: documento});
  }

  habilitarProfesional(documento){
    this.firestore.collection('usuarios').doc(documento).update({habilitado: true});
  }

  agregarHorarios(coleccion,documento,fecha){
    this.firestore.collection(coleccion+' turnos').doc(documento).set({ocupado: false, fecha: fecha});
  }

  



}
