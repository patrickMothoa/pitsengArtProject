import { Component } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

   db = firebase.firestore();
  Products = [];
  public items: Array<{ title: string; icon: string }> = [];
  public allItems: Array<{ title: string; icon: string }> = [];
 
  constructor() {
    console.log(this.getProductList());
    
    this.Products.push(this.getProductList());

    for (let i = 0; i < this.Products.length; i++) {
      this.items.push({
        title: this.Products[i].charAt(0).toUpperCase() + this.Products[i].slice(1),
        icon: this.Products[i]
      });
    }
    this.allItems = this.items;
  }
 
  onSearchTerm(ev: CustomEvent) {
    this.items = this.allItems;
    const val = ev.detail.value;
 
    if (val.trim() !== '') {
      this.items = this.items.filter(term => {
        return term.title.toLowerCase().indexOf(val.trim().toLowerCase()) > -1;
      });
    }
  }
      getProductList() {
      this.db.collection('Products').get().then(snapshot => {
        const Products = [];
        snapshot.forEach(doc => {
          Products.push(doc.data());
          console.log("herererer", Products);
        });
        return Products;
        
      });

    }

}
