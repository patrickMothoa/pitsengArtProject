import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { ProductService } from '../services/product.service';
import { CartService } from 'src/app/services/cart.service';


import { from } from 'rxjs';

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

  thisSearches = []
  public searchTerm: string = '';
  public items: any;
  public searching: boolean = false;

  myProduct = false;

  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true
  };

  // public items: Array<{ title: string; icon: string }> = [];
  public allItems: Array<{ title: string; icon: string }> = [];
 
  
  cart = [];
  xxx = [];
  constructor(public data: ProductService,private cartService: CartService,private router: Router, public productService: ProductService) {
    for (let i = 0; i < this.Products.length; i++) {
      this.items.push({
        title: this.Products[i].charAt(0).toUpperCase() + this.Products[i].slice(1),
        icon: this.Products[i]
      });
    }
    this.allItems = this.items;
  }
 

  onRegister(){
    this.router.navigateByUrl('/register')
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

  ngOnInit() {
    this.getProducts('');
   console.log();
   
   //this.xxx = this.cartService.getProductList();
    this.items = this.productService.getProductList();
    this.productService.getCart();
  }

  // addToCart(product) {
  //   this.cartService.addProduct(product);
  // }
 
  addToCart(event, cid) {
    this.productService.addToCart(event, cid) 
  }

  openCart() {
    this.router.navigate(['cart']);
  }

  openProfile(){
    this.router.navigateByUrl('/profile');
  }

  // ViewDetails(event){
  //   this.router.navigateByUrl('/details');
  // }


  logOut(){
    firebase.auth().signOut().then(()=> {
      // Sign-out successful.
      this.router.navigateByUrl('/login');
    }).catch((error)=> {
      // An error happened.
    });
   
  }


  ViewDetails(view) {
    console.log("sds", view);
    this.data.data = view;
    this.router.navigateByUrl('/details')
  }
  ///////////////////////
  searchQuery: string;
  searched:boolean = false;

  //Default page one
  pageNumber:number=1;
  //list of products
  Pots:any=[];
  // Show loading icon when api is being fetched
  apiLoader:boolean = false;
  customErrorMsg:boolean = false;
  listFetchStatus:boolean = false;

 
  onSearchInput(){
    
    if(this.searchTerm.length>0){
     //  this.event = this.productService.filterItems(this.searchTerm);
       this.searching = true;
       
    }else{
      this.searching = false;
    }
  }

  select(item){
    this.searchTerm = item.title;
    this.searching = false;
    this.thisSearches.push({searchItem:item});
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

  itemClick(itemInfo){
  //  this.navCtrl.push(ItemViewPage,itemInfo);
  }


}

