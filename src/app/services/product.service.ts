import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http'; 
import * as firebase from 'firebase';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  db = firebase.firestore();
  firestore
  event = {
    id: '',
    image: '',
    categories:'',
    name:'',
    price:null,
    productno:'',
    desc: null,
    items:'',
    small:'',
    medium:'',
    large: ''
  };

  cart = [];
  
  constructor(public http : HttpClientModule,public authService: AuthService,public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
  }
​
/// adding
  async addProduct(event) {
    const loading = await this.loadingCtrl.create({
      message: 'Adding product'
    });
    loading.present();
    this.db.collection('Products').doc().set(event).then(async res => {
        console.log('product add Response', res);
        loading.dismiss();
        location.reload();
        const alert = await this.alertCtrl.create({
          message: 'product added'
        });
        alert.present();
      }).catch(async err => {
        loading.dismiss();
        const alert = await this.alertCtrl.create({
          message: 'Error adding product'
        });
        alert.present();
      });
    }

    // retriving from firebase.firestore
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
  

  //////updating
  updateProduct(event) {
    const productUpdate = this.db.collection('Products').doc();
    return productUpdate.update(event)
.then(() => {
    console.log('Document successfully updated!');
})
.catch(error => {
    console.error('Error updating document: ', error);
});
}

filterItems(searchTerm){
  // return this.event.filter((item) => {
  //     return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
  // });     

}
////////
//////////////
/////////////////////

getItems(cid) {
  let obj = {id : '', obj : {}};
  this.db.collection('Products').doc(cid).collection('event').onSnapshot(
      res => {
               console.log("vvvv");
               
      },
      err => {
        console.log(err);
      }
    );
}

getItemDetails(cid, itemid) {
  this.db.collection('Products').doc(cid).onSnapshot(
      doc => {
        console.log("item detail here");
        
      },
      err => {
        console.error(err);
      }
    );
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
  // this.authService.checkLoginStatus().then((user: any) => {
  //     if (user === false) {
  //     console.log();
  //     } else {
  //       this.db.collection('users').doc(user).collection('cart').onSnapshot(
  //           res => {
  //             this.cart = res.docs.map(doc => doc.data());
  //           console.log();
  //           },
  //           err => {
  //             console.log(err);
  //           }
  //         );
  //     }
  //   })
  //   .catch(err => {
  //     console.error(err);
  //   });
}



addToCart(event, cid) {
      this.db.collection('cart').doc().set({
          id: event.id,
          quantity: 1,
         // addedon: moment().format('MMMM Do YYYY, h:mm:ss a'),
          name: event.name,
          price: event.price,
          category: event.categories,
          cid: cid,
          image: event.image
        // })
        // .then(res => {
        //   console.log("hello");
        // })
        // .catch(err => {
        //   console.error(err);
        //   console.log("xxx");
  })
  .catch(err => {
    console.error(err);
    console.log("xxx");
  });
  ///  use this late when creted auth
// return new Promise(resolve => {
//   this.authService.checkLoginStatus().then((user: any) => {
//       if (user === false) {
//         resolve('login');
//       } else {
//         this.db.collection('users').doc(user).collection('cart').doc(item.id).get().then(doc => {
//             if (doc.exists) {
//               resolve('added');
//             } else {
//               this.db.collection('users').doc(user).collection('cart').doc(item.id).set({
//                   id: item.id,
//                   quantity: 1,
//                  // addedon: moment().format('MMMM Do YYYY, h:mm:ss a'),
//                   name: item.name,
//                   price: item.price,
//                   category: item.category,
//                   categoryid: cid,
//                   photos: item.photos
//                 })
//                 .then(res => {
//                   resolve(true);
//                 })
//                 .catch(err => {
//                   console.error(err);
//                   resolve(false);
//                 });
//             }
//           })
//           .catch(err => {
//             console.error(err);
//             resolve(false);
//           });
//       }
//     })
//     .catch(err => {
//       console.error(err);
//       resolve(false);
//     });
// });
}

removeFromCart(event) {
  this.db.collection('cart').doc(event.id).delete().then(() => {
   console.log("we are here");
   
  })
  .catch(err => {
    console.error(err);
 console.log("not inside");
 
  });
// return new Promise(resolve => {
//   this.authService
//     .checkLoginStatus()
//     .then((user: any) => {
//       if (user === false) {
//         resolve('login');
//       } else {
//         this.db.collection('users').doc(user).collection('cart').doc(item.id).delete().then(() => {
//             resolve(true);
//           })
//           .catch(err => {
//             console.error(err);
//             resolve(false);
//           });
//       }
//     })
//     .catch(err => {
//       console.error(err);
//       resolve(false);
//     });
// });
}

changeCartItemQuantity(event, quantity) {
  this.db.collection('cart').doc(event.id).update({ quantity: quantity }).then(() => {
   console.log("john");
   
  })
  .catch(err => {
    console.error(err);
  });
// return new Promise(resolve => {
//   this.authService
//     .checkLoginStatus()
//     .then((user: any) => {
//       this.db.collection('users').doc(user).collection('cart').doc(item.id).update({ quantity: quantity }).then(() => {
//           resolve(true);
//         })
//         .catch(err => {
//           console.error(err);
//         });
//     })
//     .catch(err => {
//       console.error(err);
//     });
// });
}

data = {};

}
