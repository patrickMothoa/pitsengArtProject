import { Component, ViewChild, ElementRef } from '@angular/core';
import {NavController, ModalController, PopoverController} from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { ProductService } from '../services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { AlertController } from '@ionic/angular';
import { DetailsPage } from '../pages/details/details.page';
import { BehaviorSubject } from 'rxjs';
import { PopoverComponent } from '../components/popover/popover.component';
import { log } from 'util';
import { LoginPage } from '../pages/login/login.page';
import { RegisterPage } from '../pages/register/register.page';
import Swal from 'sweetalert2';

declare var window

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  cartItemCount: BehaviorSubject<number>;

  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;
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
     ////
  loginBtn = false;
  registerBtn =  false;
  logoutBtn = false;
  orderBtn = false;
  profileBtn = false;
    /////
  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true
  };
  autocompleteItemz: any;
  autocompletez:any;
public  isLogin = false;
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

  constructor( public alertController: AlertController,public popoverController: PopoverController,
    // public authService: AuthService,
    private navCtrl:NavController,
    public data: ProductService,
    private cartService: CartService,
    private router: Router, 
    public productService: ProductService,
    public modalController: ModalController) {
    this.autocompleteItemz = [];
    this.autocompletez = { input: '' };

  //  this.smsSent = false
    firebase.auth().languageCode = 'en';


  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component:PopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  showLogin(){
    this.loginBtn = true;
    this.registerBtn =  true;
    this.logoutBtn = false;
    this.orderBtn = false;
    this.profileBtn = false;
    // this.router.navigateByUrl('/login');
    this.createModalLogin();
  }
  goRegister(){
    this.loginBtn = false;
    this.registerBtn =  true;
    this.logoutBtn = false;
    this.orderBtn = true;
    this.profileBtn = true;
    // this.router.navigateByUrl('/register');
    this.createModalRegister();
  }
  ngOnInit() {
    this.adminInfo();
    this.getProduct();
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();

    this.loginBtn = false;
    this.registerBtn =  false;
    this. logoutBtn = true;
    this.orderBtn = true;
    this.profileBtn = true;
  }

async viewModal(){
  const modal = await this.modalController.create({
    component: DetailsPage
  });
  return  modal.present();
}

ViewDetails(view) {
  console.log("sds", view);
  this.data.data = view;
  //this.router.navigateByUrl('/details')
  this.createModal();
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
async createModalRegister() {
  const modal = await this.modalController.create({
    component: RegisterPage,
  
  });
  return await modal.present();
}

   /// taking values db to cart import
  addToCart(event) {
    
    if(firebase.auth().currentUser){
      this.cartService.addProduct(event);
      console.log("pushing to Cart",event);
    }else{
      this.createModalLogin();
    }
    // this.alert();
  }
  
  openCart() {
   // this.router.navigateByUrl('/cart');
   this.router.navigateByUrl('/trolley');
  }
 
  openOrders(){
    this.loginBtn = true;
    this.registerBtn =  true;
    this.logoutBtn = false;
    this.orderBtn = false;
    this.profileBtn = false;
    this.router.navigateByUrl('/orders');
  }




  openProfile(){
    this.loginBtn = true;
    this.registerBtn =  true;
    this.logoutBtn = false;
    this.orderBtn = false;
    this.profileBtn = false;

    this.router.navigateByUrl('/profile');
  }


// gggggggggggggggggg
  productDetails(item){
    this.data.data = item;
    // this.router.navigateByUrl('/details');
    this.createModal();
  }
  

      // retriving from firebase.firestore
  getProducts(categories) {
        let obj = {id : '', obj : {}};
        if(categories) {
          this.db.collection('Products').where('categories', '==', categories).get().then((snapshot) => {
            this.Products = [];
            if (snapshot.empty) {
                    this.myProduct = false;
                    console.log(" Category is Empty...")
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

logOut(){
  firebase.auth().signOut().then(()=> {
    this.loginBtn = false;
    this.registerBtn =  false;
    this. logoutBtn = true;
    this.orderBtn = true;
    this.profileBtn = true;
    // Sign-out successful.
    this.router.navigateByUrl('/');
  }).catch((error)=> {
    // An error happened.
  });
}
Info = []
adminInfo(){
this.db.collection('admins').get().then(snapshot => {
 this.Info = [];
 if (snapshot.empty) {
         this.myProduct = false;
       } else {
         this.myProduct = true;
         snapshot.forEach(doc => {
           this.Info.push(doc.data());
           console.log("admin", this.Info);
         });
         return this.Products;
       }
})
}
// alert(){
//   Swal.fire({
//     position: 'center',
//     icon: 'success',
//     title: 'Added to cart',
//     showConfirmButton: false,
//     timer: 500
//   })
// }

CountinueShoping(){
  this.router.navigateByUrl('/');
}


 addCart(){
  var cart = document.getElementById("toast-cart");
cart.classList.add("show");
cart.innerHTML = '<i class="fas fa-shopping-cart cart"></i> Product added to cart';
setTimeout(function(){
cart.classList.remove("show");
}, 3000);
}

 myFunction() {
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 500);
}





// wishList(){
//   var list = document.getElementById("toast");
// list.classList.add("show");
// list.innerHTML = '<i class="far fa-heart wish"></i> Product added to List';
// setTimeout(function(){
//   list.classList.remove("show");
// },3000);
// }

// addCart(){
//     var cart = document.getElementById("toast-cart");
// cart.classList.add("show");
// cart.innerHTML = '<i class="fas fa-shopping-cart cart"></i> Product added to cart';
// setTimeout(function(){
//   cart.classList.remove("show");
// }, 3000);
// }
}
