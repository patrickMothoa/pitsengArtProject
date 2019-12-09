import { Component } from '@angular/core';
import {NavController,ModalController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { ProductService } from '../services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { AlertController } from '@ionic/angular';
import { DetailsPage } from '../../app/pages/details/details.page';
import { from } from 'rxjs';
declare var window

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  db = firebase.firestore();
  event = {
    id: '',
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

  Products = [];
  supplier
  myProduct = false;

  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true
  };
  autocompleteItemz: any;
  autocompletez:any;

  getPro = [];
  cart = [];
  cNumber = 0;
  temp = [];
  xxx = [];

  id = '';
  counter = 0;
  index = 0;

  public itemz: Array<{ title: string; icon: string }> = [];
  public allItems: Array<{ title: string; icon: string }> = [];

  constructor(public modalCtrl: ModalController,public alertController: AlertController,private navCtrl:NavController,public data: ProductService,private cartService: CartService,private router: Router, public productService: ProductService) {
    this.autocompleteItemz = [];
    this.autocompletez = { input: '' };
  }


  ngOnInit() {
    this.getProduct();
    this.cart = this.cartService.getCart();
  }


   /// taking values db to cart
  addToCart(event, id, index) {




    // let obj = {
    //   categories : '',
    //   desc : '',
    //   image : '',
    //   items : '',
    //   lastcreated : '',
    //   name : '',
    //   price : '',
    //   productno : '',
    //   quantity : '',
    //   id : '',
    //   size : ["small", "medium", "large"]
    // }

    // obj.categories = event.obj.categories
    // obj.desc = event.obj.desc
    // obj.image = event.obj.image
    // obj.items = event.obj.items
    // obj.lastcreated = event.obj.lastcreated
    // obj.name = event.obj.name
    // obj.price = event.obj.price
    // obj.productno = event.obj.productno
    // obj.quantity = event.obj.quantity
    // obj.id =  id


    // this.temp.push(obj)
  

    // this.temp.forEach(data => {
    //   if(data.id === id){
    //     data.price += data.price;
    //     this.cartService.cart = data;
    //   }
    // })
   

if(firebase.auth().currentUser){
  this.cNumber += 1;
  this.cartService.cart.push(event);
  this.db.collection("Users").doc(firebase.auth().currentUser.uid).collection("Cart").doc().set({event})
  // this.cart.push(event);
  // this.cartService.addProduct(event);
  console.log("pushing to Cart", event);
}else{
  this.router.navigateByUrl('/login')
}
    
    
  }

  openCart() {
    this.router.navigateByUrl('/cart');
  }


  openProfile(){
    this.router.navigateByUrl('/profile');
  }





  ViewDetails(view) {
    console.log("sds", view);
    this.data.data = view;
    this.presentModal()
    // this.router.navigateByUrl('/details')
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: DetailsPage
    });
    return await modal.present();
  
}
  
  productDetails(item){
    this.data.data = item;
    this.router.navigateByUrl('/details')
  }


      // retriving from firebase.firestore
  getProducts(categories) {
        let obj = {id : '', obj : {}};
        if(categories) {
          this.db.collection('Products').where('categories', '==', categories).get().then((snapshot) => {
            this.Products = [];
            if (snapshot.empty) {
                    this.myProduct = false;
                  } else {
                    this.myProduct = true;
                    snapshot.forEach(doc => {
                      obj.id = doc.id;
                      obj.obj = doc.data();
                      this.Products.push(obj);
                      obj = {id : '', obj : {}};
                      console.log("herererer", this.Products);
                    });
                    return this.Products;
              }
          })
        }else {
          this.db.collection('Products').get().then(snapshot => {
            this.Products = [];
            if (snapshot.empty) {
                    this.myProduct = false;
                  } else {
                    this.myProduct = true;
                    snapshot.forEach(doc => {
                      obj.id = doc.id;
                      obj.obj = doc.data();
                      this.Products.push(obj);
                      obj = {id : '', obj : {}};
                      console.log("herererer", this.Products);
                    });
                    return this.Products;
                  }
          });
        }
  
      }

  navDetails = []

  editProduct() {
    this.myProduct = false;
  }

////// for searching

getProduct(){
  let obj = {id : '', obj : {}};
  this.db.collection('Products').get().then(snapshot => {
    this.Products = [];
    if (snapshot.empty) {
            this.myProduct = false;
          } else {
            this.myProduct = true;
            snapshot.forEach(doc => {
              obj.id = doc.id;
              obj.obj = doc.data();
              this.Products.push(obj);
              obj = {id : '', obj : {}};
              console.log("herererer", this.Products);
            });
            return this.Products;
          }
  });
}

SearchProducts(ev: CustomEvent){
  if(this.supplier === '') {
    this.autocompleteItemz = [];
    return;
  }
 this.autocompleteItemz = this.Products;
 console.log("ooo", this.autocompleteItemz );
  this.getProduct();

  const val = ev.detail.value; 
  if (val.trim() !== '') {
    this.autocompleteItemz = this.autocompleteItemz.filter(term => {
      return term.obj.name.toLowerCase().indexOf(val.trim().toLowerCase()) > -1;
    });
  }
}

  
  async showLogin(){
    const alert = await this.alertController.create({
      header: 'LOGIN',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Phone Number'
        },
        {
          name: 'name2',
          type: 'text',
          id: 'name2-id',

          placeholder: 'Password'
        },
       
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'SIGN-IN',
          handler: (name) => {
            console.log('Confirm Ok', name);
          }
        }
      ]
    });

    await alert.present();

  }


 async showPrompt(){
    const alert = await this.alertController.create({
      header: 'Register!',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Full name'
        },
        {
          name: 'name2',
          type: 'text',
          id: 'name2-id',

          placeholder: 'Phone Number'
        },
       
        {
          name: 'name4',
          type: 'text',
  
          placeholder: 'Password'
        },
       
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'SingUp',
          handler: (name) => {
            console.log('Confirm Ok', name);
          }
        }
      ]
    });

    await alert.present();

}  

logOut(){
  firebase.auth().signOut().then(()=> {
    // Sign-out successful.
    this.router.navigateByUrl('/login');
  }).catch((error)=> {
    // An error happened.
  });
 
}

}
