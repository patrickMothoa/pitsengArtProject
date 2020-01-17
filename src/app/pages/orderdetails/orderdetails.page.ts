import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase';
import { ModalController, NavController, LoadingController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from 'src/app/services/transaction.service';
import { Downloader, DownloadRequest, NotificationVisibility } from '@ionic-native/downloader/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.page.html',
  styleUrls: ['./orderdetails.page.scss'],
})
export class OrderdetailsPage implements OnInit {
@Input() id: any
db = firebase.firestore();

dbOrder = firebase.firestore().collection('Order');
dbProfile = firebase.firestore().collection('userProfile');
uid = firebase.auth().currentUser.uid;


myArray = [];
  constructor( private fileOpener: FileOpener, public downloader: Downloader,public loadingCtrl: LoadingController,private file: File,public route: ActivatedRoute, public ProductService: ProductService, public modalController: ModalController,public navCtrl: NavController,public transact: TransactionService, public data: ProductService) {

     }

  ngOnInit() {

  }

// downloadPDF(pdf) {
//   console.log('PDF link..', pdf);
//   let request: DownloadRequest = {
//     uri: pdf,
//     title: 'Reciept ' + new Date().getTime(),
//     description: '',
//     mimeType: '',
//     visibleInDownloadsUi: true,
//     notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
//     destinationInExternalFilesDir: {
//       dirType: 'Download',
//       subPath: 'Reciepts'
//     }
//   };
//   this.downloader.download(request)
//     .then((location: string) => {
//       console.log('Located at ',location);
//       //this.presentToast()
//     } )
//     .catch((error: any) => console.error(error));
// }
//////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////


   ////////////////////////////////// 
//  GetHere(){
//     this.dbOrder.where('userID','==',firebase.auth().currentUser.uid).onSnapshot((data)=>{
//             console.log("olx", data);
//             this.myArray = [];
//               data.forEach((item)=>{
//                 this.myArray.push({ref:item.id,info:item.data()})
//               })
//               console.log("ccc", this.myArray);
            
//        }) 
//     }
  
    ///////////////////////

// // DetailsHere(key) {
// //   this.dbOrder.doc('Pitseng' + key).onSnapshot((data) => {
// //     this.conArray.push(data.data());  
// //   })
// //     console.log("ssss", this.conArray);
// // }

// getProduct(key) {
//   console.log("This is my key", key);

//   this.db.collection('Order').doc(key).onSnapshot((file) => {
//     console.log(file.data(), '55555');
//     this.Orders.push(file.data())
//     }) 
// }



dismiss() {
this.modalController.dismiss({
  'dismissed': true
});
}

}
