import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { NavController, ToastController, ModalController, AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import { TransactionService } from 'src/app/services/transaction.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { ConfirmationPage } from '../confirmation/confirmation.page';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment'


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  private cartItemCount = new BehaviorSubject(0);
  private wishItemCount = new BehaviorSubject(0);
  //db = firebase.firestore();
   db = firebase.database();
  
  cart = [];
  myArr = [];
  mysize: string = '';
  sizes = [];

  name;
  key;
  total = 0;
  amount: number;
  dbWishlist = firebase.firestore().collection('Wishlist');

  dbOrder = firebase.firestore().collection('Order');
  dbUser = firebase.firestore().collection('UserProfile');
  cartProduct = [];
  orderProd = [];

  constructor(public toastController : ToastController,public modalController: ModalController,private cartService: CartService, private alertCtrl: AlertController, public data : ProductService,public transact: TransactionService) {

    this.dbUser.doc(firebase.auth().currentUser.uid).onSnapshot(element => {
      console.log(element.data());
      this.name = element.data().name
    })
   }
 
  ngOnInit() {
    this.cart = this.cartService.getCart();
  ////
  // this.db.collection('Users').doc(firebase.auth().currentUser.uid).collection('Wishlist').onSnapshot((res)=> {
  //   this.myArr = [];
  //   res.forEach((doc)=>{
  //     this.myArr.push(doc.data());
  //   })
  //   console.log("vvv");
    
  // })

  // setTimeout(() => {
  //   this.clear();
  //   this.cart = [];
  //   this.myArr.forEach((item)=>{
  //     this.cart.push(item.name.obj);
  //   })
  //   console.log('My array ', this.cart );
  // }, 1500);
  /////
this.getProducts();
  }
  ///
  getProducts() {
    console.log("mylist....");
    
    this.dbWishlist.where('customerUid','==',firebase.auth().currentUser.uid).onSnapshot((res)=>{
      this.cart = [];
      console.log("inside....mylist");
      res.forEach((doc)=>{
        this.cart.push(doc.data());

     // return  this.total = this.getTotal();
    // return this.total = this.total + parseFloat(doc.data().price) * parseFloat(doc.data().quantity);
     ///
   
      })
    })
  }
 
  decreaseCartItem(p) {
     console.log("dec");
     for (let [index, p] of this.cart.entries()) {
      if (this.cart) {
        p.quantity -= 1;
        if (p.quantity == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
  }
 
  increaseCartItem(p) {
    console.log("inc");
    let added = false;
    for (let p of this.cart) {
      if (this.cart) {
        p.quantity += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      this.cart.push(this.cart);
    }
    this.wishItemCount.next(this.wishItemCount.value + 1);
  }
 
  removeCartItem(p) {
    // this.cartService.removeProduct(p);
    console.log("del");
    for (let [index, p] of this.cart.entries()) {
      if (this.cart) {
        this.wishItemCount.next(this.wishItemCount.value - p.quantity);
        this.cart.splice(index, 1);
      }
    }
  }
 
  getTotal() {
    return this.cart.reduce((i, j) => i + j.price * j.quantity, 0);
    
  }
  ////////////////////////////////////////////////////////////////////////////////////
  //////////////////////// group orders together.
  ​
  placeOrder(){
​
    let inside = this.total
    console.log('hereTtooo ', inside);
    this.orderProd=[];
    let key = Math.floor(Math.random()*100000);
   for (let j = 0; j < this.cartProduct.length; j++) {
    console.log('Products ', this.cartProduct[j]);
    this.orderProd.push(this.cartProduct[j]);
   }
   this.dbOrder.doc('Pitseng'+ key).set({
     totalPrice:inside,
     date: moment().format('MMMM Do YYYY, h:mm:ss a'),
     product: this.orderProd,
     name: this.name,
     userID: firebase.auth().currentUser.uid,
     pdfLink : "",
     orderNumber:'Pitseng'+key
    }).then(() => {
          this.dbWishlist.where('customerUid','==',firebase.auth().currentUser.uid).onSnapshot((res)=>{
            res.forEach((i)=>{
              this.dbWishlist.doc(i.id).delete();
            })
        })
   })
    console.log('My prod ', this.orderProd);
    
    // this.SuccessModal(key);
     this.dismiss();
  }
​
//   getTotal() {
//     this.total;
//     console.log("cctotal", this.total);
    
//  }
// ​
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
   }
​
 /////////////////////////////////////////////////////////////////////////////////////////////
/////// generating Random string   ///////////////////////////////////////////////////////////
  stringGen(len){
    var text = " ";
    var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < len; i++ )
        text += charset.charAt(Math.floor(Math.random() * charset.length));
    return text;
  }

  async viewModal(){
    const modal = await this.modalController.create({
      component: ConfirmationPage
    });
    return  modal.present();
  }
  
  async SuccessModal() {
    const modal = await this.modalController.create({
      component: ConfirmationPage,
      cssClass: 'my-custom-modal-css'
    });
    return await modal.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your order processed successfully..',
      duration: 2000
    });
    toast.present();
  }

  clear(){
    this.cart = [];
  }
  sizeSelect(i, val, y) {
    this.sizes = i.detail.value;
   }
}




