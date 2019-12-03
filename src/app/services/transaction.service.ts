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
    console.log("hello",this.transactNode );
    
    this.userTransact = firebase.database().ref('user-transact');
    this.itemReview = firebase.database().ref('product-review');
    this.fireRef = firebase.database().ref();
  }
  
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


  memberTransact(userId, items,orderDetails){
    console.log("we inside Trans");
    
        //GET A KEY FOR A NEW POST
        let newPostKey = this.transactNode.push().key;
        console.log("goes", this.transactNode );
        
        let d = new Date();
        let e = this.formatDate(d);
        //TRANSACT ENTRY
        let postData = {
          uid: userId,
          items: items,
          details: orderDetails,
          postKey: newPostKey,
          dateTime: e
        };
        console.log("loged",postData );
        // WRITE THE NEW TRANSACT DATA SIMULTANEOUSLY IN THE TRANSACT LIST  AND USER TRANSACTION

        let updatePath = {};
        updatePath['/transact/' + newPostKey] = postData;
        updatePath['/user-transact/' + userId + "/" + newPostKey] = postData;

        //UPDATE BOTH TABLES SIMULTANEOUSLY
        return this.fireRef.update(updatePath);
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
