import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { ProductService } from 'src/app/services/product.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
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

  Products = [];
  myProduct = false;
  constructor(
    public productService: ProductService, 
    public data : ProductService,
    public alertCtrl: AlertController,
    public route : Router) { }

  ngOnInit() {
    this.getProducts();
  }

  ionViewWillEnter(){
    this.Products.push(this.data.data)
    
  }
   ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
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
          this.event.categories = doc.data().categories
          this.event.name=doc.data().name
          this.event.price=doc.data().price
          this.event.productno=doc.data().productno
          this.event.desc=doc.data().desc
          this.event.small=doc.data().small
          this.event.medium=doc.data().medium
          this.event.large=doc.data().large
          
        })
      }
    })
  }
  

}
