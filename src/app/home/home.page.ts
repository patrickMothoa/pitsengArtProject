import { Component } from '@angular/core';
import {NavController,ModalController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AuthService } from '../../app/services/auth.service';
import { ProductService } from '../services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { AlertController } from '@ionic/angular';
import { DetailsPage } from '../../app/pages/details/details.page';
import { from } from 'rxjs';
declare var window

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  db = firebase.firestore();
  event = {
    id: '',
    image: '',
    categories:'',
    name:'',
    price:null,
    productno:'',
    desc: null,
    small:'',
    medium:'',
    large: ''
  };

  phoneNumber = ''
  password
  registrationForm
  smsSent
  confirmationResult = ''
  inputCode
  public recaptchaVerifier: firebase.auth.RecaptchaVerifier

  Products = [];
  supplier
  myProduct = false;

  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true
  };
  autocompleteItemz: any;
  autocompletez:any;

  getPro = [];
  cart = [];
  xxx = [];

  public itemz: Array<{ title: string; icon: string }> = [];
  public allItems: Array<{ title: string; icon: string }> = [];

  constructor( public alertController: AlertController,
    public authService: AuthService,
    private navCtrl:NavController,
    public data: ProductService,
    private cartService: CartService,
    private router: Router,
    public modalCtrl: ModalController,
    public productService: ProductService) {
    this.autocompleteItemz = [];
    this.autocompletez = { input: '' };

    this.smsSent = false

      firebase.auth().languageCode = 'en';

  // this.registrationForm = formBuilder.group({
  //   phoneNumber: [this.phoneNumber, Validators.compose([Validators.required])]
  // })
  }


  ngOnInit() {
    this.getProduct();
    this.cart = this.cartService.getCart();
  }


   /// taking values db to cart
  addToCart(event) {
    this.cartService.addProduct(event);
    console.log("pushing to Cart",event);
    
  }

  openOrders(){
    this.router.navigateByUrl('/orders');
  }

  openCart() {
    this.router.navigateByUrl('/cart');
  }


  openProfile(){
    this.router.navigateByUrl('/profile');
  }





  ViewDetails(view) {
    console.log("sds", view);
    this.data.data = view;
    this.presentModal()
    // this.router.navigateByUrl('/details')
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: DetailsPage
    });
    return await modal.present();
  
}
  
  productDetails(item){
    this.data.data = item;
    this.router.navigateByUrl('/details')
  }

  goRegister(){
    this.router.navigateByUrl('/register')
  }

  showLogin(){
    this.router.navigateByUrl('/login')
  }

      // retriving from firebase.firestore
  getProducts(categories) {
        let obj = {id : '', obj : {}};
        if(categories) {
          this.db.collection('Products').where('categories', '==', categories).get().then((snapshot) => {
            this.Products = [];
            if (snapshot.empty) {
                    this.myProduct = false;
                  } else {
                    this.myProduct = true;
                    snapshot.forEach(doc => {
                      obj.id = doc.id;
                      obj.obj = doc.data();
                      this.Products.push(obj);
                      obj = {id : '', obj : {}};
                      console.log("herererer", this.Products);
                    });
                    return this.Products;
              }
          })
        }else {
          this.db.collection('Products').get().then(snapshot => {
            this.Products = [];
            if (snapshot.empty) {
                    this.myProduct = false;
                  } else {
                    this.myProduct = true;
                    snapshot.forEach(doc => {
                      obj.id = doc.id;
                      obj.obj = doc.data();
                      this.Products.push(obj);
                      obj = {id : '', obj : {}};
                      console.log("herererer", this.Products);
                    });
                    return this.Products;
                  }
          });
        }
  
      }

  navDetails = []

  editProduct() {
    this.myProduct = false;
  }

////// for searching

getProduct(){
  let obj = {id : '', obj : {}};
  this.db.collection('Products').get().then(snapshot => {
    this.Products = [];
    if (snapshot.empty) {
            this.myProduct = false;
          } else {
            this.myProduct = true;
            snapshot.forEach(doc => {
              obj.id = doc.id;
              obj.obj = doc.data();
              this.Products.push(obj);
              obj = {id : '', obj : {}};
              console.log("herererer", this.Products);
            });
            return this.Products;
          }
  });
}

SearchProducts(ev: CustomEvent){
  if(this.supplier === '') {
    this.autocompleteItemz = [];
    return;
  }
 this.autocompleteItemz = this.Products;
 console.log("ooo", this.autocompleteItemz );
  this.getProduct();

  const val = ev.detail.value; 
  if (val.trim() !== '') {
    this.autocompleteItemz = this.autocompleteItemz.filter(term => {
      return term.obj.name.toLowerCase().indexOf(val.trim().toLowerCase()) > -1;
    });
  }
}

  ////// TRYING TO REGISTER A USER WITH A NUMBER AND RECEIVE OTP ONLY ON REGISTRATION SO THAT ON LOGIN YOU JUST LOGIN /////
  
  
//   async showLogin(){
//     const alert = await this.alertController.create({
//       header: 'LOGIN',
//       inputs: [
//         {
//           name: 'name1',
//           type: 'text',
//           placeholder: 'Phone Number'
//         },
//         {
//           name: 'name2',
//           type: 'text',
//           id: 'name2-id',

//           placeholder: 'Password'
//         },
       
//       ],
//       buttons: [
//         {
//           text: 'Cancel',
//           role: 'cancel',
//           cssClass: 'secondary',
//           handler: () => {
//             console.log('Confirm Cancel');
//           }
//         }, {
//           text: 'SIGN-IN',
//           handler: (name) => {
//             console.log('Confirm Ok', name);
//           }
//         }
//       ]
//     });

//     await alert.present();

//   }

//   async alert(){
//     const alert = await this.alertController.create({
//       header: 'Verfification code',
//       // subHeader: 'Enter verification code',
//       inputs: [
//         {
//           name: 'code',
//           type: 'text',
//           placeholder: 'Enter code'
//         }],
//       buttons: [{
//         text: 'Submit',
//         role: 'submit',
//         cssClass: 'secondary',
//         handler: (result) => {
//           console.log(result.code);
//           this.reg(result.code);
//           this.db.collection('admins').doc(firebase.auth().currentUser.uid).get().then(res =>{
//               this.router.navigateByUrl('/home')
//           })
//         }
//       }]
//     });
//     await alert.present();
//   }

//   reg(code){
//     if(this.confirmationResult !== ''){
//       return this.authService.login(code, this.confirmationResult).then(result => {
//         console.log(result);
//       })
//     }
//   }

//  async getRegister(){
//     const alert = await this.alertController.create({
//       header: 'Register',
//       inputs: [
        
//         {
//           name: 'name',
//           type: 'text',
//           placeholder: 'Full name'
//         },
//         {
//           name: 'phoneNumber',
//           type: 'text',
//           id: 'name2-id',

//           placeholder: 'Phone Number'
//         },
       
//         {
//           name: 'password',
//           type: 'text',
//           placeholder: 'Password'
//         },
       
//       ],
//       buttons: [
//         {
//           text: 'Cancel',
//           role: 'cancel',
//           cssClass: 'secondary',
//           handler: () => {
//             console.log('Confirm Cancel');
//           }
//         }, {
//           text: 'SIGNUP',
//           handler: () => {
//             this.addUser();
//           }
          
//         }
        
//       ]
//     });
//     await alert.present();

// }  

// addUser(){

//   let appVerifier = window.recaptchaVerifier
//   this.authService.requestLogin(this.phoneNumber, appVerifier)

//   this.phoneNumber = this.registrationForm.get('phoneNumber').value

//   console.log(this.phoneNumber);

//   window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
//     size: 'invisible',
//     callback: (response) => {
//       console.log('checking here');
//     },
//     'expired-callback': () => {
      
//     }
//   });
//   console.log(window.recaptchaVerifier);



//   return this.authService.requestLogin(this.phoneNumber, appVerifier).then(result => {
//     if(result.success === true){
//       console.log(result);
//       this.confirmationResult = result.result
//       console.log(this.confirmationResult);
    
//      this.alert();
    
//     }
//   })

// }
///// REGISTRATION ENDS HERE //////

logOut(){
  firebase.auth().signOut().then(()=> {
    // Sign-out successful.
    this.router.navigateByUrl('/login');
  }).catch((error)=> {
    // An error happened.
  });
 
}

}
