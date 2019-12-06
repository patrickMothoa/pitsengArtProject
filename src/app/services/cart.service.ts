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

  ////// insert current 
   addProduct(event) {
    this.db.collection('Users').doc(firebase.auth().currentUser.uid).collection('Cart').doc().set({
       quantity : event += 1
     // name : event
     })
      .catch(err => {
             console.error(err);
    });
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }
  // addProduct(event) {
  //   this.db.collection('Users').doc(firebase.auth().currentUser.uid).collection('Cart').doc().set({
  //     name : event
  //    })
  //     .catch(err => {
  //            console.error(err);
  //   });
  // }
  
  
  deleteFromCart(i) {
    console.log(i);
    if (i === 0) {
    this.cart.shift();
    } else {
    this.cart.splice(i, 1);
    }
    }
  
  // removeFromCart(event) {
  //   this.db.collection('cart').doc(event.id).delete().then(() => {
  //    console.log("we are here");
     
  //   })
  //   .catch(err => {
  //     console.error(err);
  //  console.log("not inside");
   
  //   });
  // }
  
  // changeCartItemQuantity(item, quantity) {
  //         this.db.collection('cart').doc(item.id).update({ quantity: quantity })
  //       .then(() => {
  //          console.log("teeet"); 
  //       })
  //       .catch(err => {
  //             console.error(err);
  //      });
  // }

  getCart() {
    return this.cart;
  }
 
  getCartItemCount() {
    return this.cartItemCount;
  }
  // addProductx(event) {

  //   this.db.collection('Users').doc(firebase.auth().currentUser.uid).collection('Cart').doc().set({
  //     quantity : event += 1
  //    })
  //     .catch(err => {
  //            console.error(err);
  //   });

  //   let added = false;
  //   for (let p of this.cart) {
  //     if (p.id === event.id) {
  //       p.amount += 1;
  //       added = true;
  //       break;
  //     }
  //   }
  //   if (!added) {
  //     this.cart.push(event);
  //   }
  //   this.cartItemCount.next(this.cartItemCount.value + 1);
  // }
 
  decreaseProduct(event) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === event.id) {
        p.amount -= 1;
        if (p.amount == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }
 
  removeProduct(event) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === event.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
      }
    }
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

   /// CODE TO BE USED FOR AUTHORIZING USER TO PROCESS
  // addToCart(item, cid) {
  //   return new Promise(resolve => {
  //     //// checkLoginSattus from AUTH
  //     this.authService.checkLoginStatus().then((user: any) => {
  //         if (user === false) {
  //           resolve('login');
  //         } else {
  //           this.db.collection('users').doc(user).collection('cart').doc(item.id).get().then(doc => {
  //               if (doc.exists) {
  //                 resolve('added');
  //               } else {
  //                 this.db.collection('users').doc(user).collection('cart').doc(item.id).set({
  //                     id: item.id,
  //                     quantity: 1,
  //                     name: item.name,
  //                     price: item.price,
  //                     category: item.category,
  //                     categoryid: cid,
  //                     photos: item.photos
  //                   })
  //                   .then(res => {
  //                     resolve(true);
  //                   })
  //                   .catch(err => {
  //                     console.error(err);
  //                     resolve(false);
  //                   });
  //               }
  //             })
  //             .catch(err => {
  //               console.error(err);
  //               resolve(false);
  //             });
  //         }
  //       })
  //       .catch(err => {
  //         console.error(err);
  //         resolve(false);
  //       });
  //   });
  // }

  // removeFromCart(item) {
  //   return new Promise(resolve => {
  //     this.authService
  //       .checkLoginStatus()
  //       .then((user: any) => {
  //         if (user === false) {
  //           resolve('login');
  //         } else {
  //           this.db.collection('users').doc(user).collection('cart').doc(item.id).delete().then(() => {
  //               resolve(true);
  //             })
  //             .catch(err => {
  //               console.error(err);
  //               resolve(false);
  //             });
  //         }
  //       })
  //       .catch(err => {
  //         console.error(err);
  //         resolve(false);
  //       });
  //   });
  // }

  // changeCartItemQuantity(item, quantity) {
  //   return new Promise(resolve => {
  //     this.authService
  //       .checkLoginStatus()
  //       .then((user: any) => {
  //         this.db.collection('users').doc(user).collection('cart').doc(item.id).update({ quantity: quantity }).then(() => {
  //             resolve(true);
  //           })
  //           .catch(err => {
  //             console.error(err);
  //           });
  //       })
  //       .catch(err => {
  //         console.error(err);
  //       });
  //   });
  // }
}
