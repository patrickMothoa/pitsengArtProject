import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController, ModalController } from '@ionic/angular';
import { TransactionService } from 'src/app/services/transaction.service';
import { OrderdetailsPage } from '../orderdetails/orderdetails.page';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  db = firebase.firestore();
  public item =[];
  conArray = []
  Orders =[]
  public display;
  public postSort='recent';
  public userID;
  public userTransact: any;
  myArray =[]
  constructor(public ProductService: ProductService,public modalController : ModalController,public data: ProductService, public transact: TransactionService,  public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
  }

  async viewModal(){
    const modal = await this.modalController.create({
      component: OrderdetailsPage
    });
    return  modal.present();
  }
  
  ViewDetails(view) {
    console.log("sds", view);
    this.data.data = view;
    this.createModal();
  }
  
  async createModal() {
    const modal = await this.modalController.create({
      component: OrderdetailsPage,
      cssClass: 'my-custom-modal-css'
    });
    return await modal.present();
  }


async  deleteItem(li){
  
   let confirm = this.alertCtrl.create({
      message: "Are you sure you want to delete this order?",
      buttons: [
        {
          text: 'Yes',
          handler: data => {
            this.transact.removeOrder(li);
        }
        },
        {
          text: 'No',
          handler: data => {
            console.log('Cancelled');
          }
        }
      ]
    });
    (await confirm).present();
  }

  ngOnInit() {
   this.GetOrders();
  }

  GetOrders(){
        let  obj = {
          details : {orderNumber : 0, total : 0, orderdate : ""},
          obj : {
            categories : "", price : "", productNumber : "", quantity : 0,name : "", image : ""
          }
        }
    
        this.db.collection('Users').doc(firebase.auth().currentUser.uid).collection('Orders').onSnapshot((res)=>{
          this.conArray = [];
          res.forEach((doc)=>{
    
            obj.details.orderNumber = doc.data().details.orderNumber;
            obj.details.total = doc.data().details.total;
            obj.details.orderdate = doc.data().details.orderdate;
            obj.obj.name = doc.data().obj.name;
            obj.obj.price = doc.data().obj.price;
            obj.obj.quantity = doc.data().obj.quantity;
            obj.obj.productNumber = doc.data().obj.productNumber;
            obj.obj.image = doc.data().obj.image;
            this.conArray.push(obj);
            obj = {
              details : {orderNumber : 0, total : 0, orderdate : ""},
              obj : {
                categories : "", price : "", productNumber : "", quantity : 0, name : "",image : ""
              }
            }
             console.log('My array ', this.conArray);
          })  
      })
     
        setTimeout(() => {
          this.conArray.forEach((item)=>{
            this.Orders.push(item)
          })
        }, 1500);
  }


}
