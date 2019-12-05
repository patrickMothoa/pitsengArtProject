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
  conArray =[]
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

    let  obj = {
      details : {orderNumber : 0, total : 0},
      obj : {
        categories : "", price : "", productNumber : "", quantity : 0,name : ""
      }
    }


    this.db.collection('Users').doc(firebase.auth().currentUser.uid).collection('Orders').onSnapshot((res)=>{
      this.conArray = [];
      res.forEach((doc)=>{

        obj.details.orderNumber = doc.data().details.orderNumber;
        obj.details.total = doc.data().details.total;
        obj.obj.categories = doc.data().obj.categories;
        obj.obj.price = doc.data().obj.price;
        obj.obj.productNumber = doc.data().obj.productNumber;
        obj.obj.quantity = doc.data().obj.quantity;
        obj.obj.name = doc.data().obj.name;

        this.conArray.push(obj);
        obj = {
          details : {orderNumber : 0, total : 0},
          obj : {
            categories : "", price : "", productNumber : "", quantity : 0, name : ""
          }
        }
         console.log('My array ', this.conArray);
      })  
  })
 
    setTimeout(() => {
      this.conArray.forEach((item)=>{
        this.Orders.push(item)
      })
      // console.log('My array ', this.Orders);
    }, 1500);
  }
  
}


