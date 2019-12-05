import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  db = firebase.firestore();

  public fireRef: any;
  public transactNode: any;
  public userTransact: any;
  public itemReview: any;
  
  constructor() {
    this.transactNode = firebase.database().ref('transact');
    
    this.userTransact = firebase.database().ref('user-transact');

    this.fireRef = firebase.database().ref();
  }

  /////////////////
  ////// insert current userid
    addorder(item) {
      this.db.collection('Users').doc(firebase.auth().currentUser.uid).collection('Orders').doc().set({
        name : item
       })
        .catch(err => {
               console.error(err);
      });
    }
  ///////////////////
  
  //CERTAIN TRANSACTION
  viewTransact(transactId){
  	let userRef = this.transactNode.child(transactId);
  	return userRef.once('value');
  }
  //VIEW ALL POST BY A CERTAIN USER

  viewUserTransact(transactId){
  	let userRef = this.userTransact.child(transactId);
  	return userRef.once('value');
  }

   review(item){
    let itemRef = this.itemReview.child(item);
    return itemRef.once("value");
  }

  listTransact(){
  	return this.transactNode.once('value');
  }

    // TAKEN FROM OUR CART TS FILE
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
