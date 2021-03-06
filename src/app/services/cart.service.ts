import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemCount = new BehaviorSubject(0);
  private wishItemCount = new BehaviorSubject(0);
  db = firebase.firestore();

  cart = [];

  event = {
    image: '',
    categories:'',
    name:'',
    price:null,
    productno:'',
    desc: null,
    small:'',
    medium:'',
    large: ''
  };

  Product = {
    uid: '',
  }

 
  cartList =  [];
  constructor(public authService: AuthService) { }
 
  CartList() {
    this.db.collection('Users').doc(firebase.auth().currentUser.uid).collection('Cart').get().then(snapshot => {
    this.cart
    snapshot.forEach(doc => {
    this.cart.push(doc.data());
  });
      return this.cart;   
});
    console.log("My cart",this.cart);
}

  getCartX() {
    return this.cartList; 
  }
 
   addProduct(event) {
    this.db.collection('Users').doc(firebase.auth().currentUser.uid).collection('Wishlist').doc().set({
      name : event,
      // quantity : event += 1
     })
      .catch(err => {
             console.error(err);
    });
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }
  

  

  getCart() {
    return this.cart;
  }
 
  getCartItemCount() {
    return this.cartItemCount;
  }

  getWishCount(){
    return this.wishItemCount;
  }
 

}
