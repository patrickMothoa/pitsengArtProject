import { Injectable } from '@angular/core';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private isLoggedIn = false;
 db = firebase.firestore(); 
 predefined: boolean;
 status: boolean;

 public userProfile: firebase.firestore.DocumentReference;
  user;
  n =[];

  constructor() {
    firebase.firestore().collection("Respond").onSnapshot((res)=>{
      for (let y = 0; y < res.docs.length; y++) {
        this.n.push(y);
      }
    })
  }
​
 
  loginUser(email: string,password: string): Promise<firebase.auth.UserCredential> {  
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signupUser(email: string, password: string): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password).then((newUserCredential: firebase.auth.UserCredential) => {
        this.setUser(newUserCredential.user.uid);
       
        firebase.firestore().collection('Users').doc(this.getUser()).set({ uid: this.getUser(), isProfile: false});
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }

 setUser(val){
  this.user = val;
    console.log('User form Provider', this.user);
 }

 getUser(){
  return this.user;
 }

// setLoginKey(uid) {
//   return new Promise(resolve => {
//     this.storage.set('Users', uid).then(res => {
//         console.log(res);
//         resolve(true);
//       })
//       .catch(err => {
//         console.error(err);
//         resolve(false);
//       });
//   });
// }

// deleteAccount() {
//   return new Promise(resolve => {
//     firebase.auth().currentUser.delete().then(res => {
//         resolve(true);
//       })
//       .catch(err => {
//         resolve(false);
//         console.error(err);
//       });
//   });
// }

// checkLoginStatus() {
//   return new Promise(resolve => {
//     if (this.user) {
//       resolve(this.user);
//     } else {
//       this.storage.get('Users').then(user => {
//           if (user) {
//             this.user = user;
//             resolve(user);
//           } else {
//             resolve(false);
//           }
//         })
//         .catch(err => {
//           console.error(err);
//           resolve('error');
//         });
//     }
//   });
// }

}

