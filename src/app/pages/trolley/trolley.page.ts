import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ModalController, AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import { ConfirmationPage } from '../confirmation/confirmation.page';
import { ProductService } from 'src/app/services/product.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

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
  total = 1;
  dbCart = firebase.firestore().collection('Cart');
  dbOrder = firebase.firestore().collection('Order');
  cartProduct = [];
  orderProd = [];
  constructor(public modalController: ModalController,
    private cartService: CartService, private alertCtrl: AlertController, 
    public data : ProductService,public transact: TransactionService, private router: Router, ) {
   }
 
  ngOnInit() {
    this.getProducts();
// pushing to Array before firebase using this way
//     let item = this.cartService.getCart();
//     let seleted = [];
//     for(let obj of item){
//       if(seleted[obj.id]){
//         seleted[obj.id].count++;
//       }else{
//         seleted[obj.id] = {...obj, count : 1};
//       }
//     }
// this.cart = Object.keys(seleted).map(key => seleted[key]);
// this.total = this.cart.reduce((a, b) => a + (b.count * b.price), 0)
// console.log("vvv", this.total);


  //////////// working used this wa

  }

  getProducts() {


    this.dbCart.where('customerUid','==',firebase.auth().currentUser.uid).onSnapshot((res)=>{
      this.cartProduct = [];
      res.forEach((doc)=>{
        this.cartProduct.push(doc.data());
      })

      console.log('My products in cart ',this.cartProduct);
      
    })
  }
 
  // decreaseCartItem(p) {
  //   // this.cartService.decreaseProduct(p);
  //    console.log("dec");
  //    for (let [index, p] of this.cart.entries()) {
  //     if (this.cart) {
  //       p.quantity -= 1;
  //       if (p.quantity == 0) {
  //         this.cart.splice(index, 1);
  //       }
  //     }
  //   }
  // }
 
  // increaseCartItem(p) {
  //   //this.cartService.addProduct(p);
  //   console.log("inc");
  //   let added = false;
  //   for (let p of this.cart) {
  //     if (this.cart) {
  //       p.quantity += 1;
  //       added = true;
  //       break;
  //     }
  //   }
  //   if (!added) {
  //     this.cart.push(this.cart);
  //   }
  //   this.cartItemCount.next(this.cartItemCount.value + 1);
  // }
 
  // removeCartItem(p) {
  //   // this.cartService.removeProduct(p);
  //   console.log("del");
  //   for (let [index, p] of this.cart.entries()) {
  //     if (this.cart) {
  //       this.cartItemCount.next(this.cartItemCount.value - p.quantity);
  //       this.cart.splice(index, 1);
  //     }
  //   }
  // }
 
  getTotal() {
    return this.cart.reduce((i, j) => i + j.price * j.quantity, 0);  
  }

  //////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  //////////////////////// group orders together.

  placeOrder(){


    this.orderProd=[];
   //let item = {name:'', size:[],quantity:'',image:''}
   for (let j = 0; j < this.cartProduct.length; j++) {
    //console.log('Products ', this.cartProduct[j]);
    this.orderProd.push(this.cartProduct[j]);
   }
   this.dbOrder.doc('Pitseng'+Math.floor(Math.random()*100000)).set({
     date: new Date().getTime(),
     product: this.orderProd
   })
    //console.log('My prod ', this.orderProd);
    
    //this.SuccessModal();

    firebase.firestore().collection("Cart")
    this.cartProduct = []
  }
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
  CountinueShoping(){
    this.router.navigateByUrl('/');
  }

  clear(){
    this.cart = [];
  }

}
