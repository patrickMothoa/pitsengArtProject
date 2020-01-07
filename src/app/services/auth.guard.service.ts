import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements  CanActivate{

  constructor(
    private auth :AuthService,
    private router: Router){}
  canActivate(
    next:ActivatedRouteSnapshot,
    state:RouterStateSnapshot
  ):boolean | Observable<boolean> |Promise<boolean>{
    return new Promise ((resolve,reject)=>{
      firebase.auth().onAuthStateChanged((user:firebase.User)=>{
        if (user) {
          resolve(true);
           } else{
            console.log('User is  not logged in');
            this.router.navigate(['/login']);
            resolve(false);
          }
          // Partner is everything okay?
      });
     
      });
   
  }
}
