import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { NavController, ToastController } from '@ionic/angular';
import * as firebase from 'firebase';
import { TransactionService } from 'src/app/services/transaction.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  db = firebase.firestore();

  cart: any;
  selectedItems = [];
  myArray = [];
  myArr = [];
  total = 0;
  count = 1;
  myProduct = false;
  constructor(private router: Router,private cartService: CartService,public navCtrl : NavController,public transact: TransactionService, public data : ProductService) { }

  ngOnInit() {
   let items = this.cartService.getCart();
   let sss = this.cartService.CartList();
   ///////////////////////////////////////////////////////////////
   ///////////////// working used this way
  this.db.collection('Users').doc(firebase.auth().currentUser.uid).collection('Cart').onSnapshot((res)=> {
      this.myArr = [];
      res.forEach((doc)=>{
        this.myArr.push(doc.data());
      })
    })
 
    setTimeout(() => {
      this.myArr.forEach((item)=>{
        this.myArray.push(item.name.obj)
      })
      console.log('My array ', this.myArray );
    }, 1500);
 /////

let selected = [];
let XXX = []
for (let obj of items ) {
 console.log("3333", obj );
  if ( selected[obj.id]) {
   console.log("kkeke",selected[obj.id]);
    selected[obj.id].count++;
  } else {
    selected[obj.id] = {...obj, count: 1};
    console.log("2ndkoko", selected[obj.id] = {...obj, count: 1} );
  }
}
XXX= Object.keys( selected).map(key =>  selected[key]);
   console.log("xxxx", this.myArray );
this.total =  XXX.reduce((a, b) => a + (b.count * b.price), 0);  
   console.log("momomo",this.total );
/////

  }


     editProduct() {
      this.myProduct = false;
    }

    onDeleteItem(i) {
      const index = this.selectedItems.indexOf(i);
      if (index > -1) {
      this.cartService.deleteFromCart(index);
      this.selectedItems.splice(index, 1);
      console.log(this.selectedItems);
      }

      this.total = this.selectedItems.reduce((a, b) => a + (b.count * b.price), 0);
      }


      // increaseQuantity(item) {
      //   let quantity = item.quantity;
      //   quantity = item.quantity + 1;
      //   this.cartService.changeCartItemQuantity(item, quantity);
      // }
    
      // decreaseQuantity(item) {
      //   let quantity = item.quantity;
      //   if (quantity === 1) {
      //     console.log('checkHere');
      //   } else {
      //     quantity = item.quantity - 1;
      //   }
      //   this.cartService.changeCartItemQuantity(item, quantity);
      // }
///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
      /////// Attempting ordering
      orderNumber
      member
      Orders = []
   
      placeOrder(item){
        this.orderNumber = this.stringGen(11);
        console.log("clickedX",this.orderNumber);
        this.data.data = item;
          for(var i = 0; i <  this.myArray.length; i++){
            let item =  this.myArray[i];
            console.log("inside-items",item);

               /// your order details
            let orderDetails ={
              total: this.total,
              orderNumber: this.orderNumber
            };
            console.log("inside-Order",orderDetails);
             let userID = firebase.auth().currentUser.uid;
             this.transact.memberTransact(userID,item,orderDetails);
         } 
         this.router.navigateByUrl('/confirmation');
      }


    //   placeOrder(item){

    //     if (firebase.auth().currentUser.uid){
    //       this.orderNumber = this.stringGen(11);
    //       console.log("clickedX",this.orderNumber);
    //       this.data.data = item;
    //         for(var i = 0; i <  this.myArray.length; i++){
    //           let item =  this.myArray[i];
    //           console.log("inside-items",item);
  
    //              /// your order details
    //           let orderDetails ={
    //             total: this.total,
    //             orderNumber: this.orderNumber
    //           };
    //           console.log("inside-Order",orderDetails);
    //            let userID = firebase.auth().currentUser.uid;
    //            this.transact.memberTransact(userID,item,orderDetails);
    //        } 
    //        this.router.navigateByUrl('/confirmation'); 
    //     }else{
    //       this.router.navigateByUrl('/login'); 
    //     }
    // }
      
        //// generating Random string
      stringGen(len){
        var text = " ";
        var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i < len; i++ )
            text += charset.charAt(Math.floor(Math.random() * charset.length));
        return text;
      }


}




