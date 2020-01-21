import { Component, ViewChild, ElementRef } from '@angular/core';
import {NavController, ModalController, PopoverController,ToastController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { ProductService } from '../services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { AlertController } from '@ionic/angular';
import { DetailsPage } from '../pages/details/details.page';
import { BehaviorSubject } from 'rxjs';
import { PopoverComponent } from '../components/popover/popover.component';
import { Popover1Component } from '../components/popover1/popover1.component';
import { log } from 'util';
import { LoginPage } from '../pages/login/login.page';
import { RegisterPage } from '../pages/register/register.page';
import Swal from 'sweetalert2';
import { TrolleyPage } from '../pages/trolley/trolley.page';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

declare var window
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  cartItemCount: BehaviorSubject<number>;
  wishItemCount: BehaviorSubject<number>;
  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;
  dbWishlist = firebase.firestore().collection('Wishlist');

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
  toastr
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
public  isLogin = false;
  getPro = [];
  cart = [];
  cNumber = 0;
  temp = [];
  xxx = [];
  id = '';
  counter = 0;
  index = 0;
  public itemz: Array<{ title: string; icon: string }> = [];
  public allItems: Array<{ title: string; icon: string }> = [];
  active: boolean;
  constructor( public alertController: AlertController,    public toastCtrl: ToastController,
    public popoverController: PopoverController,
    // public authService: AuthService,
    private navCtrl:NavController,
    public data: ProductService,
    private cartService: CartService,
    private router: Router, 
    public productService: ProductService,
    public modalController: ModalController,
    ) {
    this.autocompleteItemz = [];
    this.autocompletez = { input: '' };
  //  this.smsSent = false
    firebase.auth().languageCode = 'en';
  }
  
 
  async presentPopover(ev) {
    const popover = await this.popoverController.create({
      component:PopoverComponent,
      event: ev,
      cssClass: 'pop-over-style',
      translucent: true,
    });
    return await popover.present();
    
  }
  async toastPopover(ev) {
    const popover = await this.popoverController.create({
      component:Popover1Component,
      event: ev,
      
      // cssClass: 'pop-over-style',
      translucent: true,
    });
    
   popover.present();
    setTimeout(()=>popover.dismiss(),500);
    
    
  }
  async presentToast(ev:any) {
    const toast = await this.toastCtrl.create({
      message: 'Your settings have been saved.',
    
      duration: 2000
    });
    toast.present();
  }
  async DismissClick() {
    await this.popoverController.dismiss();
      }
  showLogin(){
    this.createModalLogin();
  }
  trolley(){
    this.createModalTrolley();
  }
  goRegister(){
 
    this.createModalRegister();
  }
  ngOnInit() {
    this.adminInfo();
    this.getProduct();
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();
    this.wishItemCount = this.cartService.getWishCount();
    this.CountinueShoping();
  }
async viewModal(){
  const modal = await this.modalController.create({
    component: DetailsPage
  });
  return  modal.present();
}
ViewDetails(view) {
  console.log("sds", view);
  this.data.data = view;
  //this.router.navigateByUrl('/details')
  this.createModal();
}

async createModal() {
  const modal = await this.modalController.create({
    component: DetailsPage,
    cssClass: 'my-custom-modal-css'
  });
  return await modal.present();
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
async createModalTrolley() {
  const modal = await this.modalController.create({
    component: TrolleyPage,
    cssClass: 'my-custom-trolley-css'
  
  });
  return await modal.present();
}
   /// taking values db to cart import
  addToCart(event) {
    if(firebase.auth().currentUser){
      console.log("pushing to Cart",event);
    }else{
      this.createModalLogin();
    }
    // this.alert();
  }
  
  openCart() {
   // this.router.navigateByUrl('/cart');
   this.router.navigateByUrl('/trolley');
  }
 
  openOrders(){

    this.router.navigateByUrl('/orders');
  }
  openProfile(){
    this.router.navigateByUrl('/profile');
  }

  productDetails(item){
    this.data.data = item;
    this.createModal();
  }
  
      // retriving from firebase.firestore
  getProducts(categories) {
        let obj = {id : '', obj : {}};
        if(categories == 'Vase') {
           this.active = true;
        }
        if(categories) {
          this.db.collection('Products').where('categories', '==', categories).get().then((snapshot) => {
            this.Products = [];
            if (snapshot.empty) {
                    this.myProduct = false;
                  //  alert('the are no Vase')
                    console.log(" Category is Empty...")
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
logOut(){
  firebase.auth().signOut().then(()=> {
    this.router.navigateByUrl('/');
  }).catch((error)=> {
    // An error happened.
  });
}
Info = []
adminInfo(){
this.db.collection('admins').get().then(snapshot => {
 this.Info = [];
 if (snapshot.empty) {
         this.myProduct = false;
       } else {
         this.myProduct = true;
         snapshot.forEach(doc => {
           this.Info.push(doc.data());
           console.log("admin", this.Info);
         });
         return this.Products;
       }
})
}

CountinueShoping(){
  this.router.navigateByUrl('/');
  
}
 addCart(){
  var cart = document.getElementById("toast-cart");
cart.classList.add("show");
setTimeout(function(){
cart.classList.remove("show");
}, 3000);
}

  
  openNewCart() {
    this.router.navigateByUrl('/cart');
  }

  /////
  async toastController(message) {
    let toast = await this.toastCtrl.create({ message: message, duration: 2000 });
    return toast.present();
  }
  addNewCart(i) {
    //
    if(firebase.auth().currentUser){
    let  customerUid = firebase.auth().currentUser.uid;
      console.log(i);
      this.dbWishlist.add({
        timestamp: new Date().getTime(),
        customerUid: customerUid,
        product_name : i.obj.name,
        price: i.obj.price,
        size:i.obj.size,
        quantity: i.obj.quantity,
        image: i.obj.image
       }).then(() => {
        this.toastController('product Added to wishlist')
        // this.dismiss();
      })
        .catch(err => {
               console.error(err);
      });

      this.wishItemCount.next(this.wishItemCount.value + 1);
    
    }else{
      this.createModalLogin();
    }    
 }
 dismiss() {
  this.modalController.dismiss({
    'dismissed': true
  });
}

}
