import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController, ModalController, NavParams, NavController } from '@ionic/angular';
import { TransactionService } from 'src/app/services/transaction.service';
import { OrderdetailsPage } from '../orderdetails/orderdetails.page';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
//   db = firebase.firestore();
//   public item =[];
//   conArray = []
//   Orders =[]
//   public display;
//   public postSort='recent';
//   public userID;
//   public userTransact: any;
//   myArray =[]
//   constructor(public ProductService: ProductService,public modalController : ModalController,public data: ProductService, public transact: TransactionService,  public alertCtrl: AlertController) {
//   }

//   ionViewDidLoad() {
//     console.log('ionViewDidLoad OrdersPage');
//   }

//   async viewModal(){
//     const modal = await this.modalController.create({
//       component: OrderdetailsPage
//     });
//     return  modal.present();
//   }
  
//   ViewDetails(view) {
//     console.log("sds", view);
//     this.data.data = view;
//     this.createModal();
//   }
  
//   async createModal() {
//     const modal = await this.modalController.create({
//       component: OrderdetailsPage,
//       cssClass: 'my-custom-modal-css'
//     });
//     return await modal.present();
//   }


// async  deleteItem(li){
  
//    let confirm = this.alertCtrl.create({
//       message: "Are you sure you want to delete this order?",
//       buttons: [
//         {
//           text: 'Yes',
//           handler: data => {
//             this.transact.removeOrder(li);
//         }
//         },
//         {
//           text: 'No',
//           handler: data => {
//             console.log('Cancelled');
//           }
//         }
//       ]
//     });
//     (await confirm).present();
//   }

//   ngOnInit() {
//    this.GetOrders();
//   }

//   GetOrders(){
//         let  obj = {
//           details : {orderNumber : 0, total : 0, orderdate : ""},
//           obj : {
//             categories : "", price : "", productNumber : "", quantity : 0,name : "", image : ""
//           }
//         }
    
//         this.db.collection('Users').doc(firebase.auth().currentUser.uid).collection('Orders').onSnapshot((res)=>{
//           this.conArray = [];
//           res.forEach((doc)=>{
    
//             obj.details.orderNumber = doc.data().details.orderNumber;
//             obj.details.total = doc.data().details.total;
//             obj.details.orderdate = doc.data().details.orderdate;
//             obj.obj.name = doc.data().obj.name;
//             obj.obj.price = doc.data().obj.price;
//             obj.obj.quantity = doc.data().obj.quantity;
//             obj.obj.productNumber = doc.data().obj.productNumber;
//             obj.obj.image = doc.data().obj.image;
//             this.conArray.push(obj);
//             obj = {
//               details : {orderNumber : 0, total : 0, orderdate : ""},
//               obj : {
//                 categories : "", price : "", productNumber : "", quantity : 0, name : "",image : ""
//               }
//             }
//              console.log('My array ', this.conArray);
//           })  
//       })
     
//         setTimeout(() => {
//           this.conArray.forEach((item)=>{
//             this.Orders.push(item)
//           })
//         }, 1500);
//   }


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
  constructor(public route: ActivatedRoute, public ProductService: ProductService, public modalController: ModalController,public navCtrl: NavController,public transact: TransactionService, public data: ProductService
    ) {

    //   this.route.queryParams.subscribe((data) => {
    //   console.log('dsd', data.id);
    //   this.key = JSON.parse(data.id);
    //   this.getProduct(this.key);
      
    // }) 

    this.route.queryParams.subscribe((res : any)=>{
      //console.log(JSON.parse(res.value));
      //console.log(res.id);
      console.log(JSON.parse(res.order));
      let array : Array<any> = JSON.parse(res.order)
      console.log(array);
      this.conArray = array['info']
      console.log(this.conArray);
      
//
      
  });

     }

  ngOnInit() {

    this.DetailsHere();
    // this.conArray = this.ProductService.myArray;
    // console.log("Data from Service",   this.conArray);
  }


DetailsHere(){
  // this.db.collection("Order").onSnapshot(data => {
  //   this.conArray = [];
  //     data.forEach((item)=>{
  //       this.conArray.push({ref:item.id,info:item.data()})
  //     })
  //     console.log("ccc", this.conArray);
  //     console.log("inside");
  //   })
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
// downloadPDF(pdf) {
//   /*     this.loader.create({
//         content: "Downloading...",
//         duration: 3000
//       }).present(); */
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
//       this.presentToast()
//     } )
//     .catch((error: any) => console.error(error));
//   //  this.pdfObj = pdfMake.createPdf();
//   // this.pdfObj.getBuffer((buffer) => {
  
//   // });
// }


}
