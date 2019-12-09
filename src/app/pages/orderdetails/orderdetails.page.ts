import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.page.html',
  styleUrls: ['./orderdetails.page.scss'],
})
export class OrderdetailsPage implements OnInit {
db = firebase.firestore();
Orders = []
conArray = []
  constructor(public modalController: ModalController) { }

  ngOnInit() {
      ///
      let  obj = {
        details : {orderNumber : 0, total : 0},
        obj : {
          categories : "", price : "", productNumber : "", quantity : 0,name : "", image : ""
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
          obj.obj.image = doc.data().obj.image;
  
          this.conArray.push(obj);
          obj = {
            details : {orderNumber : 0, total : 0},
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
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
