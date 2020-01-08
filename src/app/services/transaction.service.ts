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
  ////// insert current userid
    addorder() {
      this.db.collection('Users').doc(firebase.auth().currentUser.uid).collection('Orders').doc().set({
        name : this.item
       })
        .catch(err => {
               console.error(err);
      });
    }
///////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
///////////////TAKEN FROM OUR Trolley TS FILE
 memberTransact(item,total,orderDetails){
    this.db.collection('Users').doc(firebase.auth().currentUser.uid).collection('Orders').doc().set({
      details: orderDetails,
      obj: total,
     })
 }
///////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeOrder(li) {
    for (let [index, li] of this.userTransact.entries()) {
        this.userTransact.splice(index, 1);
      }
    }

  }
