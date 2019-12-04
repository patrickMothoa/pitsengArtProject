import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { TransactionService } from 'src/app/services/transaction.service';
import * as firebase from 'firebase';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.page.html',
  styleUrls: ['./confirmation.page.scss'],
})
export class ConfirmationPage implements OnInit {

  db = firebase.firestore();
  public totalpay: number = 0;
  public orderNumber;

  Orders = [];
  myArr =[]
  public cartItem: number = 0;
  
  MyObj = [];
  event = {
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
  myProduct = false;
  storage;


  constructor(public navCtrl: NavController,public transact: TransactionService, public data: ProductService) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmPage');
  }


  ngOnInit() {

    this.db.collection('Orders').onSnapshot((res)=>{
      this.myArr = [];
      res.forEach((doc)=>{
        this.myArr.push(doc.data());
      })  
  })
 
    setTimeout(() => {
      this.myArr.forEach((item)=>{
        this.Orders.push(item.name)
      })
      console.log('My array ', this.Orders);
    }, 1500);
  }
    // let items = this.cartService.getCart();
    // let sss = this.cartService.CartList();
 
    ///////////////////////////////////////////////////////////////
    ///////////////// working used this way
  //   this.db.collection('cart').onSnapshot((res)=>{
  //     this.myArr = [];
  //     res.forEach((doc)=>{
  //       this.myArr.push(doc.data());
  //     })
  //   })
 
  //   setTimeout(() => {
  //     this.myArr.forEach((item)=>{
  //       this.myArray.push(item.name.obj)
  //     })
  //     console.log('My array ', this.myArray);
  //   }, 1500);
  // ///////////////////////////////////

   // this.totalpay = this.navParams.get("totalpay");
  //	this.orderNumber = this.navParams.get("orderNum");
  //   console.log(this.totalpay);

  //   this.db.collection('cart').get().then(snapshot => {
  // 	this.storage.forEach((value:any, key:string) => {
  //     this.storage.get(key).then((val)=>{
  //         if(key == 'cartId'){
  //            this.cartItem = val.id;
  //         }else{
  //            this.Orders.push({
  //             image:val.image,
  //             item:val.name,
  //             price:val.price,
  //             desc:val.desc,
  //             size: val.size, 
  //             qty: val.quantity, 
  //             keyname:key
  //           }); 
  //         }
  //     }) 
  //   })
  // })
  //this.shopList();
  }


