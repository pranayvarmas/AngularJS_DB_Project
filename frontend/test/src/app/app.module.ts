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
import { ShowOrdersComponent } from './show-orders/show-orders.component';
import { DpDetailsComponent } from './dp-details/dp-details.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { DpFeedbackComponent } from './dp-feedback/dp-feedback.component';
import { ItemFeedbackComponent } from './item-feedback/item-feedback.component';
import { ItemAnalyticsComponent } from './item-analytics/item-analytics.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ShowCouponsComponent } from './show-coupons/show-coupons.component';
import { ShowTablesComponent } from './show-tables/show-tables.component';
import { ShowPersonsComponent } from './show-persons/show-persons.component';
import { ShowIngredientsComponent } from './show-ingredients/show-ingredients.component';
import { ShowOfflineOrdersComponent } from './show-offline-orders/show-offline-orders.component';
import { BookingTablesComponent } from './booking-tables/booking-tables.component';
import { SettingsComponent } from './settings/settings.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgChartsModule } from 'ng2-charts';
import { Analytics2Component } from './analytics2/analytics2.component';
import { Analytics3Component } from './analytics3/analytics3.component';
import { Analytics4Component } from './analytics4/analytics4.component';


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
    CheckoutComponent,
    ShowOrdersComponent,
    DpDetailsComponent,
    ItemDetailsComponent,
    DpFeedbackComponent,
    ItemFeedbackComponent,
    ItemAnalyticsComponent,
    ForgotPasswordComponent,
    AdminDashboardComponent,
    ShowCouponsComponent,
    ShowTablesComponent,
    ShowPersonsComponent,
    ShowIngredientsComponent,
    ShowOfflineOrdersComponent,
    BookingTablesComponent,
    SettingsComponent,
    Analytics2Component,
    Analytics3Component,
    Analytics4Component

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    HttpClientModule,
    NgApexchartsModule,
    NgChartsModule
    // ChartsModule
    // CookieService
  ],
  providers: [DataService, LoginService],
  bootstrap: [AppComponent],
})
export class AppModule { }


