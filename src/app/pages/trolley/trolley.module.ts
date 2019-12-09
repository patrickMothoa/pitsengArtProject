import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrolleyPageRoutingModule } from './trolley-routing.module';

import { TrolleyPage } from './trolley.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrolleyPageRoutingModule
  ],
  declarations: [TrolleyPage]
})
export class TrolleyPageModule {}
