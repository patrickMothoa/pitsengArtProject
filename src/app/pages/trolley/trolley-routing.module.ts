import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrolleyPage } from './trolley.page';

const routes: Routes = [
  {
    path: '',
    component: TrolleyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrolleyPageRoutingModule {}
