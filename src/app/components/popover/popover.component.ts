import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { LoginPage } from 'src/app/pages/login/login.page';
import { RegisterPage } from 'src/app/pages/register/register.page';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor(public modalController: ModalController,private popoverController: PopoverController,private router: Router, ) { }
  loginBtn = false;
  registerBtn =  false;
  logoutBtn = false;
  orderBtn = false;
  profileBtn = false;
  ngOnInit() {

    
  }
  async DismissClick() {
    await this.popoverController.dismiss();
      }
  showLogin(){
    this.loginBtn = true;
    this.registerBtn =  true;
    this.logoutBtn = true;
    this.orderBtn = false;
    this.profileBtn = true;
    // this.router.navigateByUrl('/login');
    this.createModalLogin();
  }
  goRegister(){
    this.loginBtn = true;
    this.registerBtn =  true;
    this.logoutBtn = false;
    this.orderBtn = true;
    this.profileBtn = true;
    // this.router.navigateByUrl('/register');
    this.createModalRegister();
  }
  openProfile(){
    this.loginBtn = true;
    this.registerBtn =  true;
    this.logoutBtn = false;
    this.orderBtn = false;
    this.profileBtn = false;

    this.router.navigateByUrl('/profile');
  }
  logOut(){
    firebase.auth().signOut().then(()=> {
      this.loginBtn = false;
      this.registerBtn =  false;
      this. logoutBtn = true;
      this.orderBtn = true;
      this.profileBtn = true;
      // Sign-out successful.
      this.router.navigateByUrl('/');
    
    }).catch((error)=> {
      // An error happened.
    });
  }
  
  async createModalRegister() {
    const modal = await this.modalController.create({
      component: RegisterPage,
    
    });
    return await modal.present();
  }
  async createModalLogin() {
    const modal = await this.modalController.create({
      component: LoginPage,
      
    });
    return await modal.present();
  }
  

}
