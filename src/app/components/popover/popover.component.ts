import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController, AlertController, ToastController } from '@ionic/angular';
import { LoginPage } from 'src/app/pages/login/login.page';
import { RegisterPage } from 'src/app/pages/register/register.page';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  loginBtn = false;
  registerBtn =  false;
  logoutBtn = false;
  orderBtn = false;
  profileBtn = false;
  checkUser: boolean;

  constructor(public toastController: ToastController,public modalController: ModalController,private popoverController: PopoverController,private router: Router,  public alertCtrl: AlertController ) { }
 
  ngOnInit() {
    this.loginBtn = false;
    this.registerBtn =  false;
    this.logoutBtn = false;
    this.profileBtn = false;
    // this.showLogin();
    // this.goRegister();
    // this.openProfile();
    // this.logOut();


    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.checkUser = true;
      }else {
        this.checkUser = false;
      }
    })
  }
  async DismissClick() {
    await this.popoverController.dismiss();
      }
  showLogin(){
    // if( this.loginBtn = false ){
    //   this.createModalLogin();
    //   console.log("at Top");
    // }else{
    //   console.log("at Bottom");
    //   this.logoutBtn = true;
    //   this.orderBtn = true;
    //   this.profileBtn = true;
    // }

    this.loginBtn = true;
    this.registerBtn =  true;
    this.logoutBtn = false;
    this.profileBtn = false;
   this.createModalLogin();
  }

  goRegister(){
    // if(this.loginBtn = false){
    //   this.createModalRegister();
    //   console.log("at Top");
      
    // }else{
    //   console.log("at Bottom");
    //   //this.registerBtn =  false;
    //   this.logoutBtn = true;
    //   this.orderBtn = true;
    //   this.profileBtn = true;
    // }

    this.loginBtn = false;
    this.registerBtn =  false;
    this.logoutBtn = false;
    this.profileBtn = false;
    this.createModalRegister();
  }

  openProfile(){

    this.loginBtn = false;
    this.registerBtn =  false;
    this.logoutBtn = true;
    this.profileBtn = true;

    this.router.navigateByUrl('/profile');
  }

  openOrders(){
    // this.loginBtn = true;
    // this.registerBtn =  true;
    // this.logoutBtn = false;
    // this.orderBtn = false;
    // this.profileBtn = false;
    this.router.navigateByUrl('/orders');
  }

  logoutAlert(){
    Swal.fire(
      'You have logged out!',
      '',
      'success'
    )
  }
  logOut(){
    // this.loginBtn = false;
    // this.registerBtn =  false;
    // this.profileBtn = true;

   firebase.auth().signOut().then(()=> {
      this.loginBtn = false;
      this.registerBtn =  false;
      this. logoutBtn = true;
      this.orderBtn = true;
      this.profileBtn = true;
      this.router.navigateByUrl('/');
      this.logoutAlert()
    }).catch((error)=> {
    console.log(error);
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'You have logged Out!',
    
      duration: 2000
    });
    toast.present();
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
