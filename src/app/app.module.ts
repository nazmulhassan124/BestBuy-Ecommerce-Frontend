import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserHeaderComponent } from './common/user-header/user-header.component';
import { UserFooterComponent } from './common/user-footer/user-footer.component';
import { UserHomeComponent } from './userPanel/components/user-home/user-home.component';
import { CartComponent } from './userPanel/components/cart/cart.component';
import { CheckOutComponent } from './userPanel/components/check-out/check-out.component';
import { SingleProductViewComponent } from './userPanel/components/single-product-view/single-product-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDividerModule} from '@angular/material/divider';
import { ContactComponent } from './userPanel/components/contact/contact.component';
import { UserOrderComponent } from './userPanel/components/user-order/user-order.component';
import { HeaderComponent } from './adminPanel/manuebar/header/header.component';
import { FooterComponent } from './adminPanel/manuebar/footer/footer.component';
import { SidebarComponent } from './adminPanel/manuebar/sidebar/sidebar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { AdminManueComponent } from './adminPanel/manuebar/admin-manue/admin-manue.component';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  declarations: [
    AppComponent,
    UserHeaderComponent,
    UserFooterComponent,
    UserHomeComponent,
    CartComponent,
    CheckOutComponent,
    SingleProductViewComponent,
    ContactComponent,
    UserOrderComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AdminManueComponent
   
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatExpansionModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
