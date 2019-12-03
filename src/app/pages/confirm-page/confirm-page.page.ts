import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { TransactionService } from 'src/app/services/transaction.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-confirm-page',
  templateUrl: './confirm-page.page.html',
  styleUrls: ['./confirm-page.page.scss'],
})
export class ConfirmPagePage implements OnInit {

  db = firebase.firestore();
  public totalpay: number = 0;
  public orderNumber;
  public  Orders = []
  public cartItem: number = 0;
  storage
  myArr = [];
  myArray = []
  constructor(public navCtrl: NavController, public navParams: NavParams,public transact: TransactionService) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmPage');
  }


  ngOnInit() {

    // let items = this.cartService.getCart();
    // let sss = this.cartService.CartList();
 
    ///////////////////////////////////////////////////////////////
    ///////////////// working used this way
    this.db.collection('cart').onSnapshot((res)=>{
      this.myArr = [];
      res.forEach((doc)=>{
        this.myArr.push(doc.data());
      })
    })
 
    setTimeout(() => {
      this.myArr.forEach((item)=>{
        this.myArray.push(item.name.obj)
      })
      console.log('My array ', this.myArray);
    }, 1500);
  ///////////////////////////////////

    this.totalpay = this.navParams.get("totalpay");
  	this.orderNumber = this.navParams.get("orderNum");
    console.log(this.totalpay);
  	this.storage.forEach((value:any, key:string) => {
      this.storage.get(key).then((val)=>{
          if(key == 'cartId'){
             this.cartItem = val.id;
          }else{
             this.Orders.push({
              image:val.image,
              item:val.name,
              price:val.price,
              desc:val.desc,
              size: val.size, 
              qty: val.quantity, 
              keyname:key
            }); 
          }
      }) 
    })
  }

}
