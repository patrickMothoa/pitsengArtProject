import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import Swal from 'sweetalert2'
import { AlertController } from '@ionic/angular';
declare var window
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(){}
 
  registerUser(value){
    
   return new Promise<any>((resolve, reject) => {
     firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
   })
  }
 
  loginUser(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().signInWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
   })
  }

 
  logoutUser(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        firebase.auth().signOut()
        .then(() => {
          console.log("LOG Out");
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    })
  }
 
  userDetails(){
    return firebase.auth().currentUser;
  }

  loader(){
    let timerInterval
   Swal.fire({
    title: 'Loading',
    html: 'Please wait, still loading',
    timer: 3000,
    onBeforeOpen: () => {
      Swal.showLoading()
   
    },
    onClose: () => {
      clearInterval(timerInterval)
    }
   }).then((result) => {
    if (
      // Read more about handling dismissals
      result.dismiss === Swal.DismissReason.timer
    ) {
      console.log('I was closed by the timer')
    }
   })
   
    }
  
}






