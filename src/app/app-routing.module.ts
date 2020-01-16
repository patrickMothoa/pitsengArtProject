import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [

  { path: '', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
   { path: 'login', redirectTo: 'login', pathMatch: 'full' },
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
 
  { path: 'home/:index', loadChildren: () => import('./pages/pages.module').then( m => m.PagesPageModule)},
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./pages/orders/orders.module').then( m => m.OrdersPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then( m => m.PagesPageModule)
  },
  {
    path: 'confirmation/:key',
    loadChildren: () => import('./pages/confirmation/confirmation.module').then( m => m.ConfirmationPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'success',
    loadChildren: () => import('./pages/success/success.module').then( m => m.SuccessPageModule)
  },
{
    path: 'trolley',
    loadChildren: () => import('./pages/trolley/trolley.module').then( m => m.TrolleyPageModule)
  },
  {
    path: 'orderdetails',
    loadChildren: () => import('./pages/orderdetails/orderdetails.module').then( m => m.OrderdetailsPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
