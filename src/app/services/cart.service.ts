import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  db = firebase.firestore();

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

  cart = [];
  constructor() { }


  getProducts() {
    this.Product.uid
    this.db.collection('Products').get().then(snapshot => {
      const Products = [];
      snapshot.forEach(doc => {
        Products.push(doc.data());
        console.log("herererer", Products);
      });
      return Products; 
    });
  }

  getCart() {
    return this.cart;
  }

  addProduct(product) {
    this.cart.push(product);
  }
}
