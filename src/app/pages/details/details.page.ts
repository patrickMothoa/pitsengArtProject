import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { ProductService } from 'src/app/services/product.service';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
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
  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;
  db = firebase.firestore();
  MyObj = [];
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

  public items: any;
  counter
  cart = [];
  Products = [];
  myProduct = false;
  constructor(private cartService: CartService,
    public productService: ProductService, 
    public data : ProductService,
    public alertCtrl: AlertController,
    private router: Router,
    public modalController: ModalController,  public popoverController: PopoverController) { }



  ngOnInit() {
    this.getProducts();

   // this.items = this.cartService.getProducts();
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();
  }

   /// taking values from db to cart
  // addToCart( p ) {
  //   this.cartService.addProduct( p );
  //   console.log("pushing to Cart",event);  
  // }

   //addToCart(p) {
   // this.cartService.addProduct(p);
   // console.log("goes to Cart",p);
    // if(firebase.auth().currentUser){
    //   this.cartService.addProduct(event);
    //   console.log("pushing to Cart",event);
    // }else{
    //   // this.createModalLogin();
    // }
    //this.alert();
    // }

  openCart() {
   // this.router.navigate(['cart']);
   this.router.navigateByUrl('/trolley');
  }

  async toastPopover(ev) {
    const popover = await this.popoverController.create({
      component:Popover1Component,
      event: ev,
      
      // cssClass: 'pop-over-style',
      translucent: true,
    });
    
   popover.present();
    setTimeout(()=>popover.dismiss(),500);
    

    
  }
  ionViewWillEnter(){
    this.Products.push(this.data.data)  
  }
   ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
  }


  async createModalLogin() {
    const modal = await this.modalController.create({
      component: LoginPage,
      
    });
    return await modal.present();
  }
  async createModalRegister() {
    const modal = await this.modalController.create({
      component: RegisterPage,
    
    });
    return await modal.present();
  }
  
     /// taking values db to cart import
    addToCart(p) {
      this.cartService.addProduct(p);

      // if(firebase.auth().currentUser){
      //   this.cartService.addProduct(p);
      //   console.log("pushing to Cart",p);
      // }else{
      //   this.createModalLogin();
      //   this.dismiss()
      // }
    }

        // retriving from firebase.firestore
    getProducts(){
    this.db.collection('Products').get().then(snapshot => {
      if (snapshot.empty) {
        this.myProduct = false;
      } else {
        this.myProduct = true;
        snapshot.forEach(doc => {
          this.event.image= doc.data().image;
          this.event.categories = doc.data().categories;
          this.event.name=doc.data().name;
          this.event.price=doc.data().price;
          this.event.productno=doc.data().productCode;
          this.event.desc=doc.data().desc;
          this.event.small=doc.data().small;
          this.event.medium=doc.data().medium;
          this.event.large=doc.data().large;
          
        })
      }
    })
  }
  async myModal() {
    const modal = await this.modalController.create({
      component: HomePage,
    });
    return await modal.present();
  }

  dismiss() {
    console.log("clicked")
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  

}
