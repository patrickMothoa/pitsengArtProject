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
  checkbox=[];
  checked : boolean = false;
  name;
  key;
  total = 0;
  amount: number;
  dbWishlist = firebase.firestore().collection('Wishlist');
  ///
  productis = [];
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
    this.getProducts();
  }

  	
addValue(even, p, j){
  this.checked = !this.checked
  console.log("checked: " + this.checked);

  if(this.checked) {

  }else {
    
  }
}


  getProducts() {
    console.log("mylist....");
    
    this.dbWishlist.where('customerUid','==',firebase.auth().currentUser.uid).onSnapshot((res)=>{
      this.cart = [];
      console.log("inside....mylist");
      res.forEach((doc)=>{
        this.cart.push({id: doc.id, product: doc.data()});

        let i = this.cart.length
        this.cart[i -1]['productID'] = doc.id
console.log("vvv", this.cart);

     // return  this.total = this.getTotal();
    // return this.total = this.total + parseFloat(doc.data().price) * parseFloat(doc.data().quantity);
    ///
   
      })
    })
  }
 
  decreaseCartItem(p) {
  
    this.cart[p].product.quantity--;
  }
 
  increaseCartItem(p) {
    console.log(p);
    this.cart[p].product.quantity++;

  }
 
  removeCartItem(id) {

    this.dbWishlist.doc(id).delete();
  }
 
  getTotal() {
    return this.cart.reduce((i, j) => i + j.product.price * j.product.quantity, 0);
    
  }
  ////////////////////////////////////////////////////////////////////////////////////

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




