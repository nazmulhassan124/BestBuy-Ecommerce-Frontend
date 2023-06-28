import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './userPanel/components/user-home/user-home.component';
import { CartComponent } from './userPanel/components/cart/cart.component';
import { CheckOutComponent } from './userPanel/components/check-out/check-out.component';
import { SingleProductViewComponent } from './userPanel/components/single-product-view/single-product-view.component';
import { UserOrderComponent } from './userPanel/components/user-order/user-order.component';
import { ContactComponent } from './userPanel/components/contact/contact.component';
import { AdminManueComponent } from './adminPanel/manuebar/admin-manue/admin-manue.component';

const routes: Routes = [
{path:'' ,pathMatch:'full', redirectTo:'/userHome' },
{path:'userHome', component: UserHomeComponent},
{path:'cart' , component:CartComponent},
{path:'checkout' , component :CheckOutComponent},
{path:'singleProduct' ,component: SingleProductViewComponent },
{path:'userOrder', component : UserOrderComponent},
{path:'contact' , component: ContactComponent},
{path:'admin' , component:AdminManueComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
