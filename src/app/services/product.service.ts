import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
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
  Products = [];
  constructor(public authService: AuthService,public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.getProductList();
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
        // this.Products = [];
        snapshot.forEach(doc => {
          this.Products.push(doc.data());
         console.log("herererer", this.Products);
        });
        return this.Products;
        
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

data = {};

}
