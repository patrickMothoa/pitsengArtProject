import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemCount = new BehaviorSubject(0);
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
 
   addProduct(name, size, price, quantity) {
    this.db.collection('Users').doc(firebase.auth().currentUser.uid).collection('Cart').doc().set({
      name : name,
      size : size,
      price: price,
      quantity: quantity
     })
      .catch(err => {
             console.error(err);
    });
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }
  

  /// this pushes to array not firebase
 //   addProduct(event){
 //  this.cart.push(event);
//   }
  

  getCart() {
    return this.cart;
  }
 
  getCartItemCount() {
    return this.cartItemCount;
  }
 
  // decreaseProduct(event) {
  //   for (let [index, p] of this.cart.entries()) {
  //     if (p.id === event.id) {
  //       p.amount -= 1;
  //       if (p.amount == 0) {
  //         this.cart.splice(index, 1);
  //       }
  //     }
  //   }
  //   this.cartItemCount.next(this.cartItemCount.value - 1);
  // }
 
  // removeProduct(event) {
  //   for (let [index, p] of this.cart.entries()) {
  //     if (p.id === event.id) {
  //       this.cartItemCount.next(this.cartItemCount.value - p.amount);
  //       this.cart.splice(index, 1);
  //     }
  //   }
  // }

}
