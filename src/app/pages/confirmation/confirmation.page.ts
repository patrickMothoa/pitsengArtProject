import { Component, OnInit, Input } from '@angular/core';
import { NavController, NavParams, ModalController } from '@ionic/angular';
import { TransactionService } from 'src/app/services/transaction.service';
import * as firebase from 'firebase';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.page.html',
  styleUrls: ['./confirmation.page.scss'],
})
export class ConfirmationPage implements OnInit {


  @Input() id: any;

  dbOrder = firebase.firestore().collection('Order');
  dbProfile = firebase.firestore().collection('userProfile');
  uid = firebase.auth().currentUser.uid;
  myOrder = [];
  doc_id: string;
  orderNumber: string;
  public totalpay: number = 0;


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
    large: '',
    amount:null
  };
  myProduct = false;
  storage;
  
  myArray = [];

  key: string;
  totalPrice: any;
  constructor(private navParams: NavParams, public modalController: ModalController,public navCtrl: NavController,public transact: TransactionService, public data: ProductService) {
    this.key = this.navParams.get('id');
    this.totalPrice = this.navParams.get('total');

    console.log(this.key, this.totalPrice);
  this.myArray.push(this.totalPrice);
  console.log("xxx", this.myArray);
  
    this.displayProduct(this.key); 
    
  }

  /////

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmPage');
  }


  ngOnInit() {

  }

  displayProduct(key) {
    this.dbOrder.doc('Pitseng' + key).onSnapshot((data) => {
      this.conArray.push(data.data());  
      this.totalPrice;
    })
     return this.totalPrice;
      console.log("ssssssssssssssss ");
  }
  

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  logoutAlert(){
    Swal.fire(
      'Thank you for shopping with PitsengArt! You will receive your order after your payments has been done.',
      '',
      'success'
    )
    this.dismiss();
  }
  
}


