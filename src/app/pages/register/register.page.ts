// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
// import { AuthService } from '../../services/auth.service';
// import { NavController, ModalController } from '@ionic/angular';
// import * as firebase from 'firebase'
// import { LoginPage } from '../login/login.page';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.page.html',
//   styleUrls: ['./register.page.scss'],
// })
// export class RegisterPage implements OnInit {

//   db = firebase.firestore();
//   validations_form: FormGroup;
//   errorMessage: string = '';
//   successMessage: string = '';

//   validation_messages = {
  
//    'email': [
//      { type: 'required', message: 'Email is required.' },
//      { type: 'pattern', message: 'Enter a valid email.' }
//    ],
//    'password': [
//      { type: 'required', message: 'Password is required.' },
//      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
//    ]
//  };
 
//   constructor(
//     private navCtrl: NavController,
//     private authService: AuthService,
//     private formBuilder: FormBuilder,
//     public modalController: ModalController,
//     private router: Router

//   ) {}
 
//   ngOnInit(){
//     this.validations_form = this.formBuilder.group({
//       email: new FormControl('', Validators.compose([
//         Validators.required,
//         Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
//       ])),
//       password: new FormControl('', Validators.compose([
//         Validators.minLength(5),
//         Validators.required
//       ])),
//     });
//   }
 
//   tryRegister(value){
    
//     // this.authService.registerUser(value)
//     firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
//      .then(res => {

//       this.db.collection("UserProfile").doc(firebase.auth().currentUser.uid).set({
//          email :value.email,
//          uid : firebase.auth().currentUser.uid
//       })
//        console.log(res);
//        this.errorMessage = "";
//        this.successMessage = "Your account has been created. Please log in.";
//        this.router.navigateByUrl('/')
//      }, err => {
//        console.log(err);
//        this.errorMessage = err.message;
//        this.successMessage = "";
//      })
//   }

//   goLoginPage(){
//     // this.navCtrl.navigateBack('');
//     this.createModalLogin();
    
//   }
  
//   async createModalLogin() {
//     const modal = await this.modalController.create({
//       component: LoginPage,
     
//     });
//     return await modal.present();
//   }
//   async createModalRegister() {
//     const modal = await this.modalController.create({
//       component: RegisterPage,
      
//     });
//     return await modal.present();
//   }
//   dismiss() {
//    console .log("gfgf")
//     this.modalController.dismiss({
//       'dismissed': true
//     });

 
// }
// }

import { Component, OnInit, } from '@angular/core';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
import * as firebase from 'firebase';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  db = firebase.firestore()
  storage = firebase.storage().ref();
  public signupForm: FormGroup;
  public loading: any;
  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private router: Router,
    public modalController: ModalController
  ) {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required])
      ]
    });
  }

  ngOnInit() {}

  async signupUser(signupForm: FormGroup): Promise<void> {
    if (!signupForm.valid) {
      console.log(
        'Need to complete the form, current value: ',
        signupForm.value
      );
    } else {
      const email: string = signupForm.value.email;
      const password: string = signupForm.value.password;

      this.authService.signupUser(email, password).then(
        () => {
          this.loading.dismiss().then(() => {
             this.router.navigateByUrl('/profile');
             this.modalController.dismiss();
          })
        },
        error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'cancel' }]
            });
            await alert.present();
            
          });
        }
      );
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();
    }
  }

  dismiss(){
    this.modalController.dismiss({
      'dismissed': true
  })
}
  loginuser() {
    this.router.navigateByUrl('/login');
  }

async createModalRegister() {
  const modal = await this.modalController.create({
      component: RegisterPage, 
    });
    return await modal.present();
}
 
}
