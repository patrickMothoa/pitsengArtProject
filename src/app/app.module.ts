import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './../app/services/auth.service';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

import * as firebase from 'firebase';
import { DetailsPageModule } from './pages/details/details.module';
import { ConfirmationPageModule } from './pages/confirmation/confirmation.module';
import { OrderdetailsPageModule } from './pages/orderdetails/orderdetails.module';
  import { from } from 'rxjs';
import { popoverController } from '@ionic/core';
import { PopoverComponent } from './components/popover/popover.component';
import { LoginPageModule } from './pages/login/login.module';   
import { RegisterPageModule } from './pages/register/register.module';
import { TrolleyPageModule } from './pages/trolley/trolley.module';
import { Popover1Component } from './components/popover1/popover1.component';

const firebaseConfig = {

  // apiKey: "AIzaSyDRwZjjA37ZlERum6-XfR1YKNxHjYcZfRc",
  //   authDomain: "pitseng.firebaseapp.com",
  //   databaseURL: "https://pitseng.firebaseio.com",
  //   projectId: "pitseng",
  //   storageBucket: "pitseng.appspot.com",
  //   messagingSenderId: "480621678215",
  //   appId: "1:480621678215:web:78d00062aeaf3f478f3222",
  //   measurementId: "G-CMHGYBB83X"
  apiKey: "AIzaSyCEdqt_gOew6SACcVm3xMXETdQxxbdbLJE",
  authDomain: "pitsengproject.firebaseapp.com",
  databaseURL: "https://pitsengproject.firebaseio.com",
  projectId: "pitsengproject",
  storageBucket: "pitsengproject.appspot.com",
  messagingSenderId: "359447010965",
  appId: "1:359447010965:web:30e22a1e055bd366d7c59c",
  measurementId: "G-T4KR75ZKET"
  // apiKey: "AIzaSyB1es8iP2ZqtEUH8TJCa9HRDU7yjgRcuqs",
  // authDomain: "pitsengart.firebaseapp.com",
  // databaseURL: "https://pitsengart.firebaseio.com",
  // projectId: "pitsengart",
  // storageBucket: "pitsengart.appspot.com",
  // messagingSenderId: "381927677673",
  // appId: "1:381927677673:web:0c7a2746479e8fda33da78",
  // measurementId: "G-3KKJYT38C2"
};
firebase.initializeApp(firebaseConfig);
  firebase.analytics();

@NgModule({
  declarations: [AppComponent,PopoverComponent ,Popover1Component],
  entryComponents: [PopoverComponent,Popover1Component],
  imports: [BrowserModule,FormsModule,HttpClientModule, ReactiveFormsModule, IonicModule.forRoot(),
     AppRoutingModule,DetailsPageModule,ConfirmationPageModule,OrderdetailsPageModule, LoginPageModule,RegisterPageModule,TrolleyPageModule],
  providers: [
    StatusBar,
    AuthService ,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy, }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}