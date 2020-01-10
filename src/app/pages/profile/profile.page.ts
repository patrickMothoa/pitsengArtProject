import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController, PopoverController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PopoverComponent } from '../../components/popover/popover.component';
import { TrolleyPage } from '../../pages/trolley/trolley.page';
import { CartService } from 'src/app/services/cart.service';
import { LoginPage } from '../login/login.page';
import { BehaviorSubject } from 'rxjs';
import { OrderdetailsPage } from '../orderdetails/orderdetails.page';
import { TransactionService } from 'src/app/services/transaction.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  db = firebase.firestore();
  storage = firebase.storage().ref();
  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;
  cartItemCount: BehaviorSubject<number>;
  uid
  profile = {
    image: '',
    surname:'',
    name: '',
    address: '',
    uid: '',
    phoneNumber: '',
    email: firebase.auth().currentUser.email,
  }
  cart = [];
  uploadprogress = 0;
  errtext = '';
  isuploading = false;
  isuploaded = false;

  isprofile = false;

  Users = {
    uid: '',
    email: '',
  }


  public item =[];
  conArray = []
  Orders =[]
  public display;
  public postSort='recent';
  public userID;
  public userTransact: any;
  myArray =[]
  constructor(public router: Router,public alertCtrl: AlertController, public popoverController: PopoverController,
    public modalController: ModalController,
    public data: ProductService, public transact: TransactionService,
    private cartService: CartService,) {
    this.uid = firebase.auth().currentUser.uid;

   }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(admins => {
      if (admins) {
        this.Users.uid = admins.uid
        this.Users.uid = admins.email
      this.getProfile(); 
       this.GetOrders();
      } else {
        console.log('no user');
        
      }
    })
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();
    
  }
  
  async viewModal(){
    const modal = await this.modalController.create({
      component: OrderdetailsPage
    });
    return  modal.present();
  }
  
  ViewDetails(view) {
    console.log("sds", view);
    this.data.data = view;
    this.createModal();
  }

  async createModal() {
    const modal = await this.modalController.create({
      component: OrderdetailsPage,
      cssClass: 'my-custom-modal-css'
    });
    return await modal.present();
  }


async  deleteItem(li){
  
   let confirm = this.alertCtrl.create({
      message: "Are you sure you want to delete this order?",
      buttons: [
        {
          text: 'Yes',
          handler: data => {
            this.transact.removeOrder(li);
        }
        },
        {
          text: 'No',
          handler: data => {
            console.log('Cancelled');
          }
        }
      ]
    });
    (await confirm).present();
  }


  GetOrders(){
        let  obj = {
          details : {orderNumber : 0, total : 0, orderdate : ""},
          obj : {
            categories : "", price : "", productNumber : "", quantity : 0,name : "", image : ""
          }
        }
    
        this.db.collection('Users').doc(firebase.auth().currentUser.uid).collection('Orders').onSnapshot((res)=>{
          this.conArray = [];
          res.forEach((doc)=>{
    
            obj.details.orderNumber = doc.data().details.orderNumber;
            obj.details.total = doc.data().details.total;
            obj.details.orderdate = doc.data().details.orderdate;
            obj.obj.name = doc.data().obj.name;
            obj.obj.price = doc.data().obj.price;
            obj.obj.quantity = doc.data().obj.quantity;
            obj.obj.productNumber = doc.data().obj.productNumber;
            obj.obj.image = doc.data().obj.image;
            this.conArray.push(obj);
            obj = {
              details : {orderNumber : 0, total : 0, orderdate : ""},
              obj : {
                categories : "", price : "", productNumber : "", quantity : 0, name : "",image : ""
              }
            }
             console.log('My array ', this.conArray);
          })  
      })
     
        setTimeout(() => {
          this.conArray.forEach((item)=>{
            this.Orders.push(item)
          })
        }, 1500);
  }



//   Orders(){
// this.router.navigateByUrl('/orders');
//   }
  CountinueShoping(){
    this.router.navigateByUrl('/');
  }
  
  
 addCart(){
  var cart = document.getElementById("toast-cart");
cart.classList.add("show");
setTimeout(function(){
cart.classList.remove("show");
}, 3000);
}
  trolley(){
    this.createModalTrolley();
  }
  async createModalTrolley() {
    const modal = await this.modalController.create({
      component: TrolleyPage,
      cssClass: 'my-custom-trolley-css'
    
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
    
async createModalLogin() {
  const modal = await this.modalController.create({
    component: LoginPage,
    
  });
  return await modal.present();
}
    
    openCart() {
     // this.router.navigateByUrl('/cart');
     this.router.navigateByUrl('/trolley');
    }

  async getImage(image){
    let imagetosend = image.item(0);
    if (!imagetosend) {
      const imgalert = await this.alertCtrl.create({
        message: 'Select image to upload',
        buttons: [{
          text: 'Okay',
          role: 'cancel'
        }]
      });
      imgalert.present();
    } else {
      if (imagetosend.type.split('/')[0] !== 'image') {
        const imgalert = await this.alertCtrl.create({
          message: 'Unsupported file type.',
          buttons: [{
            text: 'Okay',
            role: 'cancel'
          }]
        });
        imgalert.present();
        imagetosend = '';
        return;
       } else {
        const upload = this.storage.child(image.item(0).name).put(imagetosend);

        upload.on('state_changed', snapshot => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.uploadprogress = progress;
          this.isuploading = true;
          if (progress==100){
            this.isuploading = false;
          } 
        }, error => {

        }, () => {
          upload.snapshot.ref.getDownloadURL().then(downUrl => {this.ngOnInit
            this.profile.image = downUrl;
            this.uploadprogress = 0;
            this.isuploaded = true;
          });
        });
       }
    }
  }
  
  createAccount(){
    if (!this.profile.address||!this.profile.name||!this.profile.surname||!this.profile.phoneNumber){
      this.errtext = 'Fields should not be empty'
    } else {
      if (!this.profile.image){
        this.errtext = 'Profile image still uploading or not selected';
      } else {
        this.profile.uid =  this.Users.uid;
        this.db.collection('UserProfile').doc(firebase.auth().currentUser.uid).set(this.profile).then(res => {
          console.log('Profile created');
          this.getProfile();
        }).catch(error => {
          console.log('Error');
        });
      }
    }
  }

  // createAccount(){
  //   if (!this.profile.address||!this.profile.name||!this.profile.surname||!this.profile.phoneNumber){
  //     this.errtext = 'Fields should not be empty'
  //   } else {
  //     if (!this.profile.image){
  //       this.errtext = 'Profile image still uploading or not selected';
  //     } else {
  //       this.profile.uid =  this.admin.uid;
  //       this.db.collection('admins').doc(firebase.auth().currentUser.uid).set(this.profile).then(res => {
  //         console.log('Profile created');
  //         this.getProfile();
  //       }).catch(error => {
  //         console.log('Error');
  //       });
  //     }
  //   }
  // }


  getProfile(){
    this.db.collection('UserProfile').where('uid', '==', this.Users.uid).get().then(snapshot => {
      if (snapshot.empty) {
        this.isprofile = false;
      } else {
        this.isprofile = true;
        snapshot.forEach(doc => {
          this.profile.address = doc.data().address;
          this.profile.image= doc.data().image
          this.profile.name=doc.data().name
          this.profile.surname=doc.data().surname
          this.profile.phoneNumber=doc.data().phoneNumber
          this.profile.email=doc.data().email
          
        })
      }
    })
  }
  edit() {
    this.isprofile = false;
  }
  async presentPopover(ev) {
    const popover = await this.popoverController.create({
      component:PopoverComponent,
      event: ev,
      cssClass: 'pop-over-style',
      translucent: true,
    });
    return await popover.present();
    
  }
}
