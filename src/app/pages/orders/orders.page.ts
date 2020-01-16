import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController, ModalController, NavParams, NavController, LoadingController } from '@ionic/angular';
import { TransactionService } from 'src/app/services/transaction.service';
import { OrderdetailsPage } from '../orderdetails/orderdetails.page';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

//import { Downloader, DownloadRequest, NotificationVisibility } from '@ionic-native/downloader/ngx';

import { FileOpener } from '@ionic-native/file-opener/ngx';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

@Input() id: any;
dbOrder = firebase.firestore().collection('Order');
dbProfile = firebase.firestore().collection('userProfile');
uid = firebase.auth().currentUser.uid;

db = firebase.firestore();
Orders = []
conArray : Array<any> = []
PList = []
storage;
key: any;
loading: any;
  constructor( private router: Router,public route: ActivatedRoute, public ProductService: ProductService, public modalController: ModalController,public navCtrl: NavController,public transact: TransactionService, public data: ProductService
    ) {

    this.route.queryParams.subscribe((res : any)=>{
      console.log(JSON.parse(res.order));
      let array : Array<any> = JSON.parse(res.order)
      console.log(array);
      this.conArray = array['info']
      console.log(this.conArray);
    
  });
 }

//async presentLoading(msg) {
  //const loading = await this.loadingCtrl.create({
   // message: msg
 // });
 // return await loading.present();
//}

  ngOnInit() {

  }

ionViewDidLoad() {
  console.log('ionViewDidLoad OrderdetailsPage');
}

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

 GotoPDF(){
  this.router.navigateByUrl('/orderdetails'); 
}


}
