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
  constructor(  public loadingCtrl: LoadingController,public modalController: ModalController,
    private cartService: CartService, private alertCtrl: AlertController, 
    public data : ProductService,public transact: TransactionService, private router: Router,public toastController : ToastController ) {
   }
 
  ngOnInit() {
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


  //////////// working used this way
  this.cart = this.cartService.getCart();
  this.db.collection('Users').doc(firebase.auth().currentUser.uid).collection('Cart').onSnapshot((res)=> {
    this.myArr = [];
    res.forEach((doc)=>{
      this.myArr.push(doc.data());
    })
    console.log("vvv"); 
  })

  setTimeout(() => {
    // this.clear();
    this.cart = [];
    this.myArr.forEach((item)=>{
      this.cart.push(item.name.obj);
    })
  
    console.log('My array ', this.cart );
  }, 1500);
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

   async removeCartItem(p) {
      console.log('item =>',p);
    
      const alert = await this.alertCtrl.create({
        header: 'Confirm!',
        message: 'Are you sure you want to delete?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Okay',
            handler: async () => {
              const worker = await this.loadingCtrl.create({
                message: 'Working',
                spinner: 'bubbles'
              })
              worker.present();
              this.db.collection('Cart').doc(p).delete().then(async res => {
                worker.dismiss()
                this.cart = [];
                //this.retrieve();
                const alerter = await this.alertCtrl.create({
                message: 'item deleted'
              })
              alerter.present();
              })
            }
          }
        ]
      });
  
      await alert.present(); 
  }

  getTotal() {
    return this.cart.reduce((i, j) => i + j.price * j.quantity, 0);  
  }

  //////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  //////////////////////// group orders together.
  orderNumber
  member
  Orders = []
  orderdate 
  placeOrder(){
    
    if(firebase.auth().currentUser){
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
      console.log("pushing to Cart",event);
    }else{
      this.createModalLogin();
    }
  }
  async createModalLogin() {
    const modal = await this.modalController.create({
      component: LoginPage,
      
    });
    return await modal.present();
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
  
  async SuccessModal() {
    const modal = await this.modalController.create({
      component: ConfirmationPage,
      cssClass: 'my-confirmation'
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
