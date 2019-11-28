import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

export class User {
  phone: string;
 password: string
  constructor(phone: string, password: string) {
    this.phone = phone;
    this.password = password;
  }
}
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  currentUser: User;
 
  public login(credentials) {
    if (credentials.phone === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        let access = (credentials.password === "pass" && credentials.phone === "phone");
        this.currentUser = new User( '+27790821730', ' ');
        observer.next(access);
        observer.complete();
      });
    }
  }
 
  public register(credentials) {
    if (credentials.phone === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }
 
  public getUserInfo() : User {
    return this.currentUser;
  }
 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

user: any;
db = firebase.firestore();
constructor( ) {

}

// registerWithEmail(email, password, name, username) {
//   return new Promise(resolve => {
//     firebase
//       .auth()
//       .createUserWithEmailAndPassword(email, password)
//       .then(response => {
//         firebase
//           .auth()
//           .currentUser.sendEmailVerification()
//           .then(res => {
//             let userdata = JSON.parse(JSON.stringify(response));

//             this.createUser(
//               userdata.uid,
//               name,
//               username,
//               'https://profile.actionsprout.com/default.jpeg'
//             )
//               .then(res => {
//                 if (res === true) {
//                   this.loginWithEmail(email, password)
//                     .then(res => {
//                       if (res === true) {
//                         resolve(true);
//                       } else if (res === 'verify') {
//                         resolve('verify');
//                       } else if (res === 'password') {
//                         resolve('password');
//                       } else {
//                         resolve(false);
//                       }
//                     })
//                     .catch(err => {
//                       resolve(false);
//                       console.error(err);
//                     });
//                 } else {
//                   this.deleteAccount()
//                     .then(res => {
//                       resolve(false);
//                     })
//                     .catch(err => {
//                       console.error(err);
//                     });
//                 }
//               })
//               .catch(err => {
//                 console.error(err);
//                 this.deleteAccount()
//                   .then(res => {
//                     resolve(false);
//                   })
//                   .catch(err => {
//                     console.error(err);
//                   });
//               });
//           })
//           .catch(err => {
//             console.error(err);
//             this.deleteAccount()
//               .then(res => {
//                 resolve(false);
//               })
//               .catch(err => {
//                 console.error(err);
//               });
//           });
//       })
//       .catch(err => {
//         console.error(err);
//         resolve('email');
//       });
//   });
// }

// loginWithEmail(email, password) {
//   return new Promise(resolve => {
//     firebase
//       .auth()
//       .signInWithEmailAndPassword(email, password)
//       .then(response => {
//         let userdata = JSON.parse(JSON.stringify(response));
//         console.log(userdata);
//         if (userdata.user.emailVerified === true) {
//           this.setLoginKey(userdata.user.uid)
//             .then(res => {
//               resolve(true);
//             })
//             .catch(err => {
//               console.error(err);
//               resolve(false);
//             });
//         } else {
//           resolve('verify');
//         }
//       })
//       .catch(err => {
//         if (err.code === 'auth/wrong-password') {
//           resolve('password');
//         } else {
//           console.error(err.code);
//           resolve(false);
//         }
//       });
//   });
// }

// createUser(uid, name, username, displaypic) {
//   return new Promise(resolve => {
//     firebase
//       .auth()
//       .currentUser.updateProfile({
//         displayName: name,
//         photoURL: displaypic
//       })
//       .then(res => {
//         this.db
//           .collection('users')
//           .doc(firebase.auth().currentUser.uid)
//           .set({
//             uid: firebase.auth().currentUser.uid,
//             displayName: name,
//             userName: username,
//             profilephoto: displaypic
//           })
//           .then(res => {
//             resolve(true);
//           })
//           .catch(err => {
//             console.error(err);
//             resolve(false);
//           });
//       })
//       .catch(err => {
//         console.error(err);
//         resolve(false);
//       });
//   });
// }

// setLoginKey(uid) {
//   return new Promise(resolve => {
//     this.storage
//       .set('user-uzastuff', uid)
//       .then(res => {
//         console.log(res);
//         resolve(true);
//       })
//       .catch(err => {
//         console.error(err);
//         resolve(false);
//       });
//   });
// }

// logout() {
//   return new Promise(resolve => {
//     firebase
//       .auth()
//       .signOut()
//       .catch(err => {
//         console.error(err);
//       })
//       .then(res => {
//         this.storage
//           .remove('user-uzastuff')
//           .then(() => {
//             this.user = null;
//             resolve(true);
//           })
//           .catch(err => {
//             console.error(err);
//           });
//       })
//       .catch(err => {
//         console.error(err);
//       });
//   });
// }

// deleteAccount() {
//   return new Promise(resolve => {
//     firebase
//       .auth()
//       .currentUser.delete()
//       .then(res => {
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
//       this.storage
//         .get('user-uzastuff')
//         .then(user => {
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

