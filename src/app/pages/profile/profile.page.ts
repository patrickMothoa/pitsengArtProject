import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController, PopoverController, ModalController, NavParams } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
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
    name: '',
    address: '',
    uid: '',
    number: '',
    email: firebase.auth().currentUser.email,
  }


  ///////
  email
  name
  number
  address
  image
  /////////
  Allorders = [];
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

/////////

  customerUid = firebase.auth().currentUser.uid;
  dbOrder = firebase.firestore().collection('Order');

////////
  public item =[];
  conArray = []
  Orders =[]
  public display;
  public postSort='recent';
  public userID;
  public userTransact: any;
  users = [];
  myArray =[]

  constructor(public router: Router,
    public alertCtrl: AlertController,
    public popoverController: PopoverController,
    public modalController: ModalController,
    public data: ProductService,
    public transact: TransactionService,
    private cartService: CartService,) {
    this.uid = firebase.auth().currentUser.uid;
   }
  ngOnInit() {
    firebase.auth().onAuthStateChanged(admins => {
      if (admins) {
        this.Users.uid = admins.uid
        this.Users.email = admins.email
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

  ViewDetails(value) {
    console.log(value);
    let navigationExtras: NavigationExtras = {
      queryParams : {
        order : JSON.stringify(value)
      } 
    };
   // this.createModal();
   this.router.navigate(['orders'], navigationExtras);
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



  CountinueShoping(){
    this.router.navigateByUrl('/');
  }

   ////////////////////////////////// 
  GetOrders(){
  this.dbOrder.where('userID','==',firebase.auth().currentUser.uid).onSnapshot((data)=>{
          console.log("olx", data);
          this.Allorders = [];
            data.forEach((item)=>{
              this.Allorders.push({ref:item.id,info:item.data(), total:item.data()})
            })
            console.log("ccc", this.Allorders);

      }) 
  }

  getTotal() {
  //  this.total;
 }

  ////////////////////////////////////
  updateDetails(){
        console.log("clicked"); 
        firebase.firestore().collection('UserProfile').doc(this.Users.uid).update({
          name: this.name,
          address: this.address,
          number: this.number
        })
      }
  ////////////////////////////

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
      //  this.cartService.addProduct(event);
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

    changeListener(event): void {
      const i = event.target.files[0];
      console.log(i);
      const upload = this.storage.child(i.name).put(i);
      upload.on('state_changed', snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('upload is: ', progress , '% done.');
      }, err => {
      }, () => {
        upload.snapshot.ref.getDownloadURL().then(dwnURL => {
          console.log('File avail at: ', dwnURL);
          this.image = dwnURL;
        });
      });
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
            this.image = downUrl;
            this.uploadprogress = 0;
            this.isuploaded = true;
          });
        });
       }
    }
  }
  
  createAccount(){
    if (!this.address||!this.name||!this.email||!this.number){

      this.errtext = 'Fields should not be empty'
    } else {
      if (!this.image){
        this.errtext = 'Profile image still uploading or not selected';
      } else {
        this.profile.uid =  this.Users.uid;

        this.db.collection('UserProfile').doc(firebase.auth().currentUser.uid).set(this.profile).then(res => {
          this.getProfile();
        }).catch(error => {
          console.log('Error');
        });

      }
    }
  }

  getProfile(){
    this.db.collection('UserProfile').where('uid', '==', this.Users.uid).get().then(snapshot => {
      console.log(snapshot);
      if (snapshot.empty) {
        this.isprofile = false;
      } else {
        this.isprofile = true;

        snapshot.forEach(doc => {
          this.email = doc.data().email
          this.number = doc.data().number
          this.address = doc.data().address
          this.name = doc.data().name
          this.image = doc.data().image
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