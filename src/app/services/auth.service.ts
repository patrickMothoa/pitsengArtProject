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
  signupUser(email: string, password: string): Promise<any> {
    return firebase
    .auth().createUserWithEmailAndPassword(email, password).then((newUserCredential: firebase.auth.UserCredential) => {
      firebase.firestore().doc(`/UserProfile/${newUserCredential.user.uid}`).set({
        email : email,
        uid:newUserCredential.user.uid

      });
    }).catch(error => {
      console.error(error);
      throw new Error(error);
    });

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






