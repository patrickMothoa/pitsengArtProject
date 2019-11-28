// import { Injectable } from '@angular/core';
// import {Observable} from 'rxjs';
// import 'rxjs/add/operator/map';

// export class User {
//   phone: string;
 
//   constructor(phone: string) {
//     this.phone = phone;
//   }
// }
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthServiceService {

//   currentUser: User;
 
//   public login(credentials) {
//     if (credentials.phone === null || credentials.password === null) {
//       return Observable.throw("Please insert credentials");
//     } else {
//       return Observable.create(observer => {
//         // At this point make a request to your backend to make a real check!
//         let access = (credentials.password === "pass" && credentials.phone === "phone");
//         this.currentUser = new User( '+27790821730');
//         observer.next(access);
//         observer.complete();
//       });
//     }
//   }
 
//   public register(credentials) {
//     if (credentials.phone === null || credentials.password === null) {
//       return Observable.throw("Please insert credentials");
//     } else {
//       // At this point store the credentials to your backend!
//       return Observable.create(observer => {
//         observer.next(true);
//         observer.complete();
//       });
//     }
//   }
 
//   public getUserInfo() : User {
//     return this.currentUser;
//   }
 
//   public logout() {
//     return Observable.create(observer => {
//       this.currentUser = null;
//       observer.next(true);
//       observer.complete();
//     });
//   }
// }
