import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import Swal from 'sweetalert2'

import * as firebase from 'firebase'
  import { from } from 'rxjs';
import { RegisterPage } from '../register/register.page';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
  validations_form: FormGroup;
  errorMessage: string = '';
  
 
  constructor(
 
    private navCtrl: NavController,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    public modalController: ModalController
 
  ) { }
 
  ngOnInit() {
 
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }
 
 
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };
 
 
  loginUser(value){
    // this.authService.loginUser(value)
    firebase.auth().signInWithEmailAndPassword(value.email, value.password)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.navCtrl.navigateForward('/');
    }, err => {
      this.errorMessage = err.message;
    });
    this.loader()
   
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
 
  goToRegisterPage(){
    // this.navCtrl.navigateForward('/register');
    this.createModalRegister();
  }

  async createModalLogin() {
    const modal = await this.modalController.create({
      component: LoginPage,
      
    });
    return await modal.present();
  }
  async createModalRegister() {
    const modal = await this.modalController.create({
      component: RegisterPage,
   
    });
    return await modal.present();
  }
  dismiss() {
   console .log("gfgf")
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}