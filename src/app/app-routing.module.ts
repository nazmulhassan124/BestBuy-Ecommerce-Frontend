import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './userPanel/components/user-home/user-home.component';
import { CartComponent } from './userPanel/components/cart/cart.component';
import { CheckOutComponent } from './userPanel/components/check-out/check-out.component';
import { SingleProductViewComponent } from './userPanel/components/single-product-view/single-product-view.component';
import { UserOrderComponent } from './userPanel/components/user-order/user-order.component';
import { ContactComponent } from './userPanel/components/contact/contact.component';
import { AdminManueComponent } from './adminPanel/manuebar/admin-manue/admin-manue.component';
import { AdminDashboardComponent } from './adminPanel/components/admin-dashboard/admin-dashboard.component';
import { AddCategoryComponent } from './adminPanel/components/add-category/add-category.component';
import { AddProductsComponent } from './adminPanel/components/add-products/add-products.component';
import { AddVendorComponent } from './adminPanel/components/add-vendor/add-vendor.component';
import { SignupComponent } from './Security/components/signup/signup.component';
import { LoginComponent } from './Security/components/login/login.component';
import { ForbiddenComponent } from './Security/components/forbidden/forbidden.component';
import { AuthGuard } from './Security/_auth/auth.guard';
import { AddSubcategoryComponent } from './adminPanel/components/add-subcategory/add-subcategory.component';
import { AddBrandComponent } from './adminPanel/components/add-brand/add-brand.component';
import { OrderDetailsComponent } from './userPanel/components/order-details/order-details.component';

const routes: Routes = [
{path:'' ,pathMatch:'full', redirectTo:'/userHome' },
{path:'userHome', component: UserHomeComponent},
{path:'cart' , component:CartComponent},
{path:'checkout' , component :CheckOutComponent},
{path:'orderdetails/:orderid/view', component:OrderDetailsComponent},
{path:'product/:proid/view' ,component: SingleProductViewComponent },
{path:'userOrder', component : UserOrderComponent , canActivate:[AuthGuard], data:{role:'User'}},
{path:'contact' , component: ContactComponent},
{path:'signup', component:SignupComponent},
{path:'login', component:LoginComponent},
{ path: 'forbidden', component: ForbiddenComponent},
{path:'admin' , component:AdminManueComponent, canActivate:[AuthGuard], data:{role:'Admin'} ,
children:[
  {path:'', component: AdminDashboardComponent},
  {path:'category', component: AddCategoryComponent},
  {path:'addproduct' ,component:AddProductsComponent},
  {path:'addvendor', component: AddVendorComponent},
  {path:'addsubcategory', component: AddSubcategoryComponent},
  {path:'addbrand', component: AddBrandComponent},

]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
