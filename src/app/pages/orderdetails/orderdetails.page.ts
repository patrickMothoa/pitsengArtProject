import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase';
import { ModalController, NavParams, NavController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.page.html',
  styleUrls: ['./orderdetails.page.scss'],
})
export class OrderdetailsPage implements OnInit {
@Input() id: any;
dbOrder = firebase.firestore().collection('Order');
dbProfile = firebase.firestore().collection('userProfile');
uid = firebase.auth().currentUser.uid;

db = firebase.firestore();
Orders = []
conArray = []
PList = []
storage;
key: any;
  constructor(public route: ActivatedRoute, public ProductService: ProductService,private navParams: NavParams, public modalController: ModalController,public navCtrl: NavController,public transact: TransactionService, public data: ProductService
    ) {
      // this.key = this.navParams.get('id');
      // console.log(this.key);
     //this.DetailsHere(this.key); 

      this.route.queryParams.subscribe((data) => {
      console.log('dsd', data.id);
      this.key = JSON.parse(data.id);
      this.getProduct(this.key);
      
    }) 

     }

  ngOnInit() {

    this.DetailsHere();
    // this.conArray = this.ProductService.myArray;
    // console.log("Data from Service",   this.conArray);
  }


DetailsHere(){
  this.db.collection("Order").onSnapshot(data => {
    this.conArray = [];
      data.forEach((item)=>{
        this.conArray.push({ref:item.id,info:item.data()})
      })
      console.log("ccc", this.conArray);
      console.log("inside");
    })
}
ionViewDidLoad() {
  console.log('ionViewDidLoad OrderdetailsPage');
}

// DetailsHere(key) {
//   this.dbOrder.doc('Pitseng' + key).onSnapshot((data) => {
//     this.conArray.push(data.data());  
//   })
//     console.log("ssss", this.conArray);
// }

getProduct(key) {
  console.log("This is my key", key);

  this.db.collection('Order').doc(key).onSnapshot((file) => {
    console.log(file.data(), '55555');
    this.Orders.push(file.data())
    }) 
}



dismiss() {
this.modalController.dismiss({
  'dismissed': true
});
}

}
