import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  user;
  admin = {
    uid: '',
    phoneNumber: ''
  };
  constructor() { }
  storeAdmin(admin){
    this.admin = admin;
    console.log('Loggedin admin', this.admin);
    
  }
  getAdmin(){
    return this.admin.uid;
  }
  setUser(val){
    this.user = val;
      console.log('User form Provider', this.user);
   }
  }