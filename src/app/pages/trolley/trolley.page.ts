import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ModalController, AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import { ConfirmationPage } from '../confirmation/confirmation.page';
import { ProductService } from 'src/app/services/product.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-trolley',
  templateUrl: './trolley.page.html',
  styleUrls: ['./trolley.page.scss'],
})
export class TrolleyPage implements OnInit {
  private cartItemCount = new BehaviorSubject(0);
  db = firebase.firestore();
  cart = [];
  myArr = [];

  constructor(public modalController: ModalController,private cartService: CartService, private alertCtrl: AlertController, public data : ProductService,public transact: TransactionService) {

    

   }
 
  ngOnInit() {
    this.cart = this.cartService.getCart();
  //////////// working used this way
  this.db.collection('Users').doc(firebase.auth().currentUser.uid).collection('Cart').onSnapshot((res)=> {
    this.myArr = [];
    res.forEach((doc)=>{
      this.myArr.push(doc.data());
    })
    console.log("vvv");
    
  })

  setTimeout(() => {
    this.cart = [];
    this.myArr.forEach((item)=>{
      this.cart.push(item.name.obj);
    })
    console.log('My array ', this.cart );
  }, 1500);
  }
 
  decreaseCartItem(p) {
    // this.cartService.decreaseProduct(p);
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
    //this.cartService.addProduct(p);
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
    this.cartItemCount.next(this.cartItemCount.value + 1);

  }
 
  removeCartItem(p) {
    // this.cartService.removeProduct(p);
    console.log("del");
    for (let [index, p] of this.cart.entries()) {
      if (this.cart) {
        this.cartItemCount.next(this.cartItemCount.value - p.quantity);
        this.cart.splice(index, 1);
      }
    }
  }
 
  getTotal() {
    return this.cart.reduce((i, j) => i + j.price * j.quantity, 0);
    
  }
  orderNumber
  member
  Orders = []
  orderdate 
  placeOrder(){
    this.orderNumber = this.stringGen(11);
    ///// creating date
    const date = new Date();
    this.orderdate = date.toDateString();
    ///////
    console.log("clickedX",this.orderNumber);
    console.log("sHOW dATE", this.orderdate);
    this.data.data
      for(var i = 0; i <  this.cart.length; i++){
        let item =  this.cart[i];
        console.log("inside-items",item);
     /////////// your order details
        let orderDetails ={
          total: this.getTotal(),
          orderNumber: this.orderNumber,
          orderdate : this.orderdate
        };
        console.log("inside-Order",orderDetails);
         let userID = firebase.auth().currentUser.uid;
         this.transact.memberTransact(userID,item,orderDetails);
     } 
    this.SuccessModal();
  }

  
/////// generating Random string
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

}