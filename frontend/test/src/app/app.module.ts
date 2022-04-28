import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DataService } from './data.service';
// import { LoginService } from './login.service';
import { Person } from './person';

import {enableProdMode} from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShowItemsComponent } from './show-items/show-items.component';
import { LoginService } from './login.service';
import { AddItemsComponent } from './add-items/add-items.component';
import { AddIngredientsComponent } from './add-ingredients/add-ingredients.component';
import { AddPersonsComponent } from './add-persons/add-persons.component';
import { AddCouponsComponent } from './add-coupons/add-coupons.component';
import { AddTablesComponent } from './add-tables/add-tables.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    ShowItemsComponent,
    AddItemsComponent,
    AddIngredientsComponent,
    AddPersonsComponent,
    AddCouponsComponent,
    AddTablesComponent,
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    HttpClientModule,
    // CookieService
  ],
  providers: [DataService, LoginService],
  bootstrap: [AppComponent],
})
export class AppModule { }


