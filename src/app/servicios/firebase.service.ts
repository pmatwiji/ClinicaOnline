import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFireDatabase, private firestore: AngularFirestore) { }

  traerColeccion(coleccion:string){
    return new Promise((resolve,reject) => {
      this.firestore.collection(coleccion).valueChanges()
      .subscribe(datos => resolve(datos), error => reject(error));
    }) 
  }

  traerColeccionPorEstado(coleccion:string){
    return this.firestore.collection(coleccion, ref => ref.where('activo','==',true)).valueChanges();
  }
}
