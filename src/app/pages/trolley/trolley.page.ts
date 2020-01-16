import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ModalController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import * as firebase from 'firebase';
import { ConfirmationPage } from '../confirmation/confirmation.page';
import { ProductService } from 'src/app/services/product.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { LoginPage } from '../login/login.page';
import { element } from 'protractor';
import * as moment from 'moment'

@Component({
  selector: 'app-trolley',
  templateUrl: './trolley.page.html',
  styleUrls: ['./trolley.page.scss'],
})
export class TrolleyPage implements OnInit {
  private cartItemCount = new BehaviorSubject(0);

  db = firebase.database();

  name;
  key;

  cart = [];
  myArr = [];
  amount: number;
  dbCart = firebase.firestore().collection('Cart');
  dbOrder = firebase.firestore().collection('Order');
  dbUser = firebase.firestore().collection('UserProfile');
  cartProduct = [];
  orderProd = [];
  constructor(public modalController: ModalController,
    private cartService: CartService, private alertCtrl: AlertController, 
    public data : ProductService,public transact: TransactionService, private router: Router,public toastController : ToastController ) {
      this.dbUser.doc(firebase.auth().currentUser.uid).onSnapshot(element => {
        console.log(element.data());
        this.name = element.data().name
      })
     
   }
 
  ngOnInit() {
    this.getProducts();

  //////////// working used this wa

  }

  ionViewWillLeave(){
  // this.cartProduct = [];
  }
  getTotal(){
    let total = 0;
    for (let i = 0; i < this.cartProduct.length; i++) {
      let product = this.cartProduct[i].data.product;
      // console.log(product);
      product.forEach((item) => {
        total += (item.amount);
      })
      //
    }
    //console.log('My tot ', total);

    return total;
  }

  

  getProducts() {

    this.total = 0
    firebase.firestore().collection("Cart").onSnapshot(item => {
      item.forEach(i => {
        this.cartProduct.push(i.data())
        console.log("Your data here is ", i.data());
        this.total = this.total + i.data().amount;
      })
   
    })
return this.total;
  }


  removeCartItem(p) {
    console.log("del");
    for (let [index, p] of this.cart.entries()) {
      if (this.cart) {
        this.cartItemCount.next(this.cartItemCount.value - p.quantity);
        this.cart.splice(index, 1);
      }
    }
  }


  //////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  //////////////////////// group orders together.

  placeOrder(){


    // let date = moment().format('MMMM Do YYYY, h:mm:ss a');
    // console.log("Your date is ",date);
    
    this.orderProd=[];
    let key = Math.floor(Math.random()*100000);
   //let item = {name:'', size:[],quantity:'',image:''}
   for (let j = 0; j < this.cartProduct.length; j++) {
    console.log('Products ', this.cartProduct[j]);
    this.orderProd.push(this.cartProduct[j]);
   }
   this.dbOrder.doc('Pitseng'+ key).set({
     date: moment().format('MMMM Do YYYY, h:mm:ss a'),
     product: this.orderProd,
     name: this.name,
     userID: firebase.auth().currentUser.uid}).then(() => {
          this.dbCart.where('customerUid','==',firebase.auth().currentUser.uid).onSnapshot((res)=>{
            res.forEach((i)=>{
              this.dbCart.doc(i.id).delete();
            })
          })
   })
    console.log('My prod ', this.orderProd);
    
     this.SuccessModal(key);
     this.dismiss();
    // this.cartProduct = []
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
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
      component: ConfirmationPage,
    });
    return  modal.present();
  }
  
  async SuccessModal(key) {
    const modal = await this.modalController.create({
      component: ConfirmationPage,
      componentProps: {id : key},
      cssClass: 'my-custom-modal-css'
    });
    return await modal.present();
  }
  CountinueShoping(){
    this.router.navigateByUrl('home');
  }
  async DismissClick() {
    await this.modalController.dismiss();
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
  async createModalTrolley() {
    const modal = await this.modalController.create({
      component: TrolleyPage,
    
    });
    return await modal.present();
  }

}
