import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { AdminDashboardComponent } from './adminPanel/components/admin-dashboard/admin-dashboard.component';
import {MatButtonModule} from '@angular/material/button';
import { OverlayModule } from '@angular/cdk/overlay';





import { CdkTreeModule } from '@angular/cdk/tree';
import { PortalModule } from '@angular/cdk/portal';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { MatBadgeModule } from '@angular/material/badge';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AddCategoryComponent } from './adminPanel/components/add-category/add-category.component';
import { AddProductsComponent } from './adminPanel/components/add-products/add-products.component';
import { AddVendorComponent } from './adminPanel/components/add-vendor/add-vendor.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './Security/components/signup/signup.component';
import { LoginComponent } from './Security/components/login/login.component';


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
    AdminManueComponent,
    AdminDashboardComponent,
    AddCategoryComponent,
    AddProductsComponent,
    AddVendorComponent,
    SignupComponent,
    LoginComponent
   
    

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
    MatSidenavModule,
    MatButtonModule,
    OverlayModule ,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,


    CdkTreeModule,
    MatAutocompleteModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatTreeModule,
    PortalModule,
    MatBadgeModule,
    MatGridListModule,
    MatRadioModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatNativeDateModule,
    FlexLayoutModule



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
