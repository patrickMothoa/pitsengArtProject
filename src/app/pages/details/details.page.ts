import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { ProductService } from 'src/app/services/product.service';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { CartService } from 'src/app/services/cart.service';
import { HomePage } from 'src/app/home/home.page';
import { BehaviorSubject } from 'rxjs';
import { Popover1Component } from 'src/app/components/popover1/popover1.component';
import { LoginPage } from '../login/login.page';
import { RegisterPage } from '../register/register.page';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  cartItemCount: BehaviorSubject<number>;
  @ViewChild('cart', { static: false, read: ElementRef }) fab: ElementRef;
  dbProduct = firebase.firestore().collection('Products');
  dbCart = firebase.firestore().collection('Cart');
  //customerUid = firebase.auth().currentUser.uid;
  MyObj = [];
  event = {
    image: '',
    categories: '',
    name: '',
    price: 0,
    productno: '',
    desc: null,
    small: '',
    medium: '',
    large: '',
    quantity: null,
    amount:0,
    total:0
  };

  public items: any;
  counter
  cart = [];
  Products = [];
  myProduct = false;
  mysize: string = '';
  sizes = [];
  constructor(private cartService: CartService,
    public productService: ProductService,
    public data: ProductService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private router: Router,
    public modalController: ModalController) { }



  ngOnInit() {
    this.getProducts();
    // this.items = this.cartService.getProducts();
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();
  }
  async toastController(message) {
    let toast = await this.toastCtrl.create({ message: message, duration: 2000 });
    return toast.present();
  }

  
  addToCart(i) {
    /////////
    if(firebase.auth().currentUser){
    let  customerUid = firebase.auth().currentUser.uid;
      console.log(i);
      this.dbCart.add({
        timestamp: new Date().getTime(),
        customerUid: customerUid,
        product_name : i.obj.name,
        size : this.sizes,
        price: i.obj.price,
        quantity: this.event.quantity,
        image: i.obj.image,
       }).then(() => {
        this.toastController(' product Added to cart')
        this.dismiss();
      })
        .catch(err => {
               console.error(err);
      });
    
    }else{
      this.createModalLogin();
    }
    
      /////
        // console.log(i);
        // this.dbCart.add({
        //   timestamp: new Date().getTime(),
        //   customerUid: this.customerUid,
        //   product_name : i.obj.name,
        //   size : this.sizes,
        //   price: i.obj.price,
        //   quantity: this.event.quantity,
        //   image: i.obj.image,
    
        //   // total: this.event.total
        //  }).then(() => {
        //   this.toastController(' product Added to cart')
        //   //this.router.navigateByUrl('basket');
        //   this.dismiss();
        // })
        //   .catch(err => {
        //          console.error(err);
        // });
        this.cartItemCount.next(this.cartItemCount.value + 1);
    
      }
  sizeSelect(i, val, y) {
   this.sizes = i.detail.value;
  }

  async createModal() {
    const modal = await this.modalController.create({
      component: DetailsPage,
      cssClass: 'my-custom-modal-css'
    });
    return await modal.present();
  }
  
  async createModalLogin() {
    const modal = await this.modalController.create({
      component: LoginPage, 
    });
    return await modal.present();
  }
  ////

  openCart() {
    // this.router.navigate(['cart']);
    this.router.navigateByUrl('/trolley');
  }

  ionViewWillEnter() {
    this.Products.push(this.data.data)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
  }

  getProducts() {

  }
  async myModal() {
    const modal = await this.modalController.create({
      component: HomePage,
    });
    return await modal.present();
  }

  clear(){
    this.Products = [];
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }


}