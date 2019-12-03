import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmPagePage } from './confirm-page.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmPagePageRoutingModule {}
