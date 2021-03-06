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
​
@Component({
  selector: 'app-trolley',
  templateUrl: './trolley.page.html',
  styleUrls: ['./trolley.page.scss'],
})
export class TrolleyPage implements OnInit {
  private cartItemCount = new BehaviorSubject(0);
​
  db = firebase.database();
​
mysize: string = '';
sizes = [];

  name;
  key;
  total = 0;
  cart = [];
  myArr = [];
  amount: number;
  dbCart = firebase.firestore().collection('Cart');
  dbOrder = firebase.firestore().collection('Order');
  dbUser = firebase.firestore().collection('UserProfile');
  cartProduct = [];
  orderProd = [];

  constructor(public modalController: ModalController,
    private cartService: CartService, 
    private alertCtrl: AlertController, 
    public data : ProductService,
    public transact: TransactionService, 
    private router: Router,
    public toastController : ToastController ) {
      this.dbUser.doc(firebase.auth().currentUser.uid).onSnapshot(element => {
        console.log(element.data());
        this.name = element.data().name
      })
     
   }
 
  ngOnInit() {
    this.getProducts();
  }
​
  ionViewWillLeave(){

  }

  getProducts() {
    this.dbCart.where('customerUid','==',firebase.auth().currentUser.uid).onSnapshot((res)=>{
      this.cartProduct = [];
      res.forEach((doc)=>{
        this.cartProduct.push({id: doc.id,prod:doc.data()});
        console.log("oooh", this.cartProduct );   
    // return this.total = this.total + parseFloat(doc.data().price) * parseFloat(doc.data().quantity);
      })
    })
  }
 
  decreaseCartItem(p) {
    this.cartProduct[p].prod.quantity--;
  }
 
  increaseCartItem(p) {
    console.log(p);
    this.cartProduct[p].prod.quantity++;
  }
 
  removeCartItem(id) {
    this.dbCart.doc(id).delete();
  }
 
  getTotal() {
    return this.cartProduct.reduce((i, j) => i + j.prod.price * j.prod.quantity, 0); 
  }

  ////////////////////////////////////////////////////////////////////////////////////
  //////////////////////// group orders together.
​
  placeOrder(){
​
    let inside = this.getTotal();
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
     size : this.sizes,
     userID: firebase.auth().currentUser.uid,
     pdfLink : "",
     orderNumber:'Pitseng'+key
    }).then(() => {
          this.dbCart.where('customerUid','==',firebase.auth().currentUser.uid).onSnapshot((res)=>{
            res.forEach((i)=>{
              this.dbCart.doc(i.id).delete();
            })
        })
   })
    console.log('My prod ', this.orderProd);
    
     this.SuccessModal(key);
     this.dismiss();
  }
​
//   getTotalx() {
//     this.total;
//     console.log("cctotal", this.total); 
//  }
​
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
​
  async viewModal(){
    const modal = await this.modalController.create({
      component: ConfirmationPage,
    });
    return  modal.present();
  }

  sizeSelect(i, val, y) {
    this.sizes = i.detail.value;
   }
  
  async SuccessModal(key) {
    const modal = await this.modalController.create({
      component: ConfirmationPage,
      componentProps: {id : key, total : this.total },
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
​
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your order processed successfully..',
      duration: 2000
    });
    toast.present();
  }
​
  async createModalTrolley() {
    const modal = await this.modalController.create({
      component: TrolleyPage,
    
    });
    return await modal.present();
  }

​
}
