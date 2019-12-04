import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
declare var window
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  phoneNumber = ''
  password
  registrationForm
  smsSent
  confirmationResult = ''
  inputCode
  public recaptchaVerifier: firebase.auth.RecaptchaVerifier
  db=firebase.firestore()
  constructor(  
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    public route :Router,
    
    ) {
      this.smsSent = false

      firebase.auth().languageCode = 'en';

  this.registrationForm = formBuilder.group({
    phoneNumber: [this.phoneNumber, Validators.compose([Validators.required])]
  })

  }
  ngOnInit() {
    // firebase.auth().onAuthStateChanged(res => {
    //   if (res) {
    //     this.profileService.storeAdmin(res);
    //     this.route.navigateByUrl('home', { skipLocationChange: true });
    //   }
    // });
  }
 
  requestCode(){
    this.phoneNumber = this.registrationForm.get('phoneNumber').value
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    console.log(window.recaptchaVerifier);
    let appVerifier = window.recaptchaVerifier
    return this.authService.requestLogin(this.phoneNumber, appVerifier).then(result => {
      if(result.success === true){
        console.log(result);
        this.confirmationResult = result.result
        console.log(this.confirmationResult);
      }
    })
  }
  logins(code){
    if(this.confirmationResult !== ''){
      return this.authService.login(code, this.confirmationResult).then(result => {
        console.log(result);
      })
    }
  }
​
  addUser(){
    this.phoneNumber = this.registrationForm.get('phoneNumber').value
    console.log(this.phoneNumber);
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      callback: (response) => {
        console.log('checking here');
      },
      'expired-callback': () => {
        
      }
    });
    console.log(window.recaptchaVerifier);
    let appVerifier = window.recaptchaVerifier
    return this.authService.requestLogin(this.phoneNumber, appVerifier).then(result => {
      if(result.success === true){
        console.log(result);
        this.confirmationResult = result.result
        console.log(this.confirmationResult);
      
       this.alert();
      
      }
    })
  }

  async alert(){
    const alert = await this.alertController.create({
      header: 'Verfification code',
      // subHeader: 'Enter verification code',
      inputs: [
        {
          name: 'code',
          type: 'text',
          placeholder: 'Enter code'
        }],
      buttons: [{
        text: 'Submit',
        role: 'submit',
        cssClass: 'secondary',
        handler: (result) => {
          console.log(result.code);
          this.logins(result.code);
          this.db.collection('Users').doc(firebase.auth().currentUser.uid).get().then(res =>{
            // if (res.exists){
            //   this.route.navigateByUrl('/home')
             
            // }else{
            //   this.route.navigateByUrl('/profile')
            // }
            this.route.navigateByUrl('/home')
          })
        }
      }]
    });
    await alert.present();
  }

  login(){
    this.phoneNumber = this.registrationForm.get('phoneNumber').value
        console.log(this.phoneNumber)
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    console.log(window.recaptchaVerifier);
    let appVerifier = window.recaptchaVerifier

    firebase.auth().signInWithPhoneNumber(String(this.phoneNumber), appVerifier).then(confirmationResult => {
      window.confirmationResult = confirmationResult;
    //   this.db.collection('admins').doc(firebase.auth().currentUser.uid).get().then(res =>{
    //     if (res.exists){
    //       this.route.navigateByUrl('/home')
         
    //     }else{
    //       this.route.navigateByUrl('/profile')
    //     }
    //   })
    //   console.log(confirmationResult.user.uid,confirmationResult.user.email,'user logged in');
    //   // this.slist.email = result.user.email;
    //   // console.log(this.lsname)
    //   if(confirmationResult.user.uid >"")
    //   {
    // //     const toast =  this.toastCtrl.create({
    // //       message: 'Login Successful!',
    // //       duration: 9000
    // //     });
    // // toast.present();
    //   ​this.route.navigateByUrl('/home')
    //   }
   
      
    }).catch((error) => {
      console.log(error)
    });
  }
​
}
