import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { NavController, ToastController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product.service';
import * as firebase from 'firebase';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  db = firebase.firestore();
  cart: any;
  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public productService: ProductService
  ) {
    this.getCart();
  }


  getCart() {
    this.db.collection('cart').onSnapshot(
      res => {
        this.cart = res.docs.map(doc => doc.data());
      console.log();
      },
      err => {
        console.log(err);
      }
    );
  }

  increaseQuantity(event) {
    let quantity = event.quantity;
    quantity = event.quantity + 1;
    this.productService.changeCartItemQuantity(event, quantity);
  }

  decreaseQuantity(event) {
    let quantity = event.quantity;
    if (quantity === 1) {
      console.log('end');
    } else {
      quantity = event.quantity - 1;
    }
    this.productService.changeCartItemQuantity(event, quantity);
  }

  removeItem(event) {
    // this.itemService.removeFromCart(item).then(res => {
    //     if (res === true) {
    //       this.toastCtrl
    //         .create({
    //           message: '' + item.name + ' removed from Cart',
    //           duration: 3000,
    //           position: 'top',
    //           cssClass: 'toast-success'
    //         })
    //         .present();
    //     } else if (res === 'login') {
    //       this.toastCtrl
    //         .create({
    //           message: 'You Need To Be Logged In',
    //           duration: 3000,
    //           position: 'top',
    //           cssClass: 'toast-fail'
    //         })
    //         .present();
    //     } else {
    //       this.toastCtrl
    //         .create({
    //           message: 'There Was An Error, Please Try Again',
    //           duration: 3000,
    //           position: 'top',
    //           cssClass: 'toast-fail'
    //         })
    //         .present();
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     this.toastCtrl
    //       .create({
    //         message: 'There Was An Error, Please Try Again',
    //         duration: 3000,
    //         position: 'top',
    //         cssClass: 'toast-fail'
    //       })
    //       .present();
    //   });
  }

  openItem(event) {
    // this.navCtrl.push('ItemPage', {
    //   item: item,
    //   category: item.categoryid
    // });
  }


  ngOnInit() {
    // let items = this.cartService.getCart();
    // let selected = [];
    // for (let obj of items) {
    //   if (selected[obj.uid]) {
    //     selected[obj.uid].count++;
    //   } else {
    //     selected[obj.uid] = {...obj, count: 1};
    //   }
    // }
    // this.selectedItems = Object.keys(selected).map(key => selected[key]);
    // this.total = this.selectedItems.reduce((a, b) => a + (b.count * b.price), 0);
  }


}




