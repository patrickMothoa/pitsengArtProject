import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  db = firebase.firestore();

  public userTransact: any;
  
  constructor() {
    
  }
item
  /////////////////
  ////// insert current userid
    addorder() {
      this.db.collection('Users').doc(firebase.auth().currentUser.uid).collection('Orders').doc().set({
        name : this.item
       })
        .catch(err => {
               console.error(err);
      });
    }

    // TAKEN FROM OUR Trolley TS FILE
  memberTransact(item,total,orderDetails){
    this.db.collection('Users').doc(firebase.auth().currentUser.uid).collection('Orders').doc().set({
      // name : item,
      details: orderDetails,
      obj: total,
     })
 }


  formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
  }

   delOrder(item){
    return this.userTransact.child(item).remove();
     
  }
}
