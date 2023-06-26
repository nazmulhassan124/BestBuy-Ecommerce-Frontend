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



@NgModule({
  declarations: [
    AppComponent,
    UserHeaderComponent,
    UserFooterComponent,
    UserHomeComponent,
    CartComponent,
    CheckOutComponent,
    SingleProductViewComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
