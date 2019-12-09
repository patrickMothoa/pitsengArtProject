import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ModalController, AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import { ConfirmationPage } from '../confirmation/confirmation.page';
import { ProductService } from 'src/app/services/product.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-trolley',
  templateUrl: './trolley.page.html',
  styleUrls: ['./trolley.page.scss'],
})
export class TrolleyPage implements OnInit {
  db = firebase.firestore();
  cart = [];
  myArr = [];

  constructor(public modalController: ModalController,private cartService: CartService, private alertCtrl: AlertController, public data : ProductService,public transact: TransactionService) { }
 
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
    this.myArr.forEach((item)=>{
///////////// this.cart.push(item.name.obj)
      this.cart.push(item.name.obj);
    })
    console.log('My array ', this.cart );
  }, 1500);
  }
 
  decreaseCartItem(event) {
    this.cartService.decreaseProduct(event);
    console.log("dec");
    
  }
 
  increaseCartItem(event) {
    this.cartService.addProduct(event);
    console.log("inc");
  }
 
  removeCartItem(event) {
    this.cartService.removeProduct(event);
    console.log("del");
  }
 
  getTotal() {
    return this.cart.reduce((i, j) => i + j.price * j.quantity, 0);
    
  }
  orderNumber
  member
  Orders = []

  placeOrder(){
    this.orderNumber = this.stringGen(11);
    console.log("clickedX",this.orderNumber);
    this.data.data
      for(var i = 0; i <  this.cart.length; i++){
        let item =  this.cart[i];
        console.log("inside-items",item);
     /////////// your order details
        let orderDetails ={
          total: this.getTotal(),
          orderNumber: this.orderNumber
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
