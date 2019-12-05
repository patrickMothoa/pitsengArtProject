import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular';
import { TransactionService } from 'src/app/services/transaction.service';

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
  constructor( public transact: TransactionService,  public alertCtrl: AlertController) {
  	//   this.userID = firebase.auth().currentUser.uid;
  	// this.orderHistory(this.userID, 'descending');
    // this.userTransact = firebase.database().ref('user-transact');
    // this.userTransact = firebase.database().ref('Orders');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
  }




  orderHistory(theUserId, sort){
    // this.item.length = 0;
    // this.transact.viewUserTransact(theUserId).then(snapshot=>{
    //   let userid = snapshot.val();
    //   console.log(userid);
    //   if(userid != null && sort =='descending'){
    //       var keys = Object.keys(userid);
          
    //       for(var i = 0 ; i<keys.length; i++) {
    //         var k = keys[i];
    //         let myobj ={}; 
    //         myobj = userid[k].items;
    //         myobj['datetime'] = userid[k].dateTime;
    //         myobj['keys'] = k;
    //         this.item.push(myobj);
    //       }
    //       this.item.reverse();
    //   }else if (userid !=null && sort =='ascending'){
    //         var keyss = Object.keys(userid);
    //         for(var y = 0 ; y<keyss.length; y++) {
    //           var v = keyss[y];
    //           var myobjs={};
    //            myobjs = userid[v].items;
    //            myobjs['datetime'] = userid[v].dateTime;
    //            myobjs['keys'] = v;
    //            this.item.push(myobjs);
    //         }
    //   }else{
    //     this.display = true;
    //   }
      
    // })
    // console.log(this.item);
  }

  onSortChange(){
   if(this.postSort == 'recent'){
    this.orderHistory(this.userID, 'descending');
     this.postSort = 'recent';
     
   }else if(this.postSort == 'old'){
     this.orderHistory(this.userID, 'ascending');
     this.postSort = 'old';
      
   }
  }

  // deleteItem(li){
  
  //  let confirm = this.alertCtrl.create({
  //     title: 'DELETE',
  //     message: "Are you sure you want to delete item?",
  //     buttons: [
  //       {
  //         text: 'Yes',
  //         handler: data => {
  //           let index = this.item.findIndex(x => x.keys==li.keys);
  //           if (index > -1) {
  //               let ref = this.userTransact.child(this.userID);
  //               ref.child(li.keys).remove();
  //               this.item.splice(index, 1);
  //           }
  //       }
  //       },
  //       {
  //         text: 'No',
  //         handler: data => {
  //           console.log('Cancelled');
  //         }
  //       }
  //     ]
  //   });
  //   confirm.present();
  // }

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
      // console.log('My array ', this.Orders);
    }, 1500);
  }

}
