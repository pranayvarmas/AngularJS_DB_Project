import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ShowItemsComponent } from './show-items/show-items.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddCouponsComponent } from './add-coupons/add-coupons.component';
import { AddIngredientsComponent } from './add-ingredients/add-ingredients.component';
import { AddItemsComponent } from './add-items/add-items.component';
import { AddTablesComponent } from './add-tables/add-tables.component';
import { AddPersonsComponent } from './add-persons/add-persons.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { ShowOrdersComponent } from './show-orders/show-orders.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DpDetailsComponent } from './dp-details/dp-details.component';
import { DpFeedbackComponent } from './dp-feedback/dp-feedback.component';
import { ItemFeedbackComponent } from './item-feedback/item-feedback.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ShowCouponsComponent } from './show-coupons/show-coupons.component';
import { ShowIngredientsComponent } from './show-ingredients/show-ingredients.component';
import { ShowPersonsComponent } from './show-persons/show-persons.component';
import { ShowTablesComponent } from './show-tables/show-tables.component';
import { ShowOfflineOrdersComponent } from './show-offline-orders/show-offline-orders.component';
import { BookingTablesComponent } from './booking-tables/booking-tables.component';
import { ItemAnalyticsComponent } from './item-analytics/item-analytics.component';
import { Analytics2Component } from './analytics2/analytics2.component';
import { Analytics3Component } from './analytics3/analytics3.component';
import { Analytics4Component } from './analytics4/analytics4.component';

const routes: Routes = [
   { path: '', redirectTo: 'login', pathMatch: 'full' },
   { path: 'login',  component: LoginComponent },
   { path: 'signup', component: SignupComponent },
   { path: 'items', component: ShowItemsComponent },
   { path: 'ingredients', component: ShowIngredientsComponent },
   { path: 'coupons', component: ShowCouponsComponent },
   { path: 'tables', component: ShowTablesComponent },
   { path: 'persons', component: ShowPersonsComponent },
   { path: 'offline_orders', component: ShowOfflineOrdersComponent },
   { path: 'dashboard', component: DashboardComponent },
   { path: 'admin-dashboard', component: AdminDashboardComponent },
   { path: 'add_coupon', component: AddCouponsComponent },
   { path: 'add_item', component: AddItemsComponent },
   { path: 'add_ingredient', component: AddIngredientsComponent },
   { path: 'add_person', component: AddPersonsComponent },
   { path: 'add_table', component: AddTablesComponent },
   { path: 'cart', component: CartComponent },
   { path: 'checkout', component: CheckoutComponent },
   { path: 'orders', component: ShowOrdersComponent },
   { path: 'dpDetails/:id', component: DpDetailsComponent},
   { path: 'dp_feedback/:order_id/:id', component: DpFeedbackComponent},
   { path: 'item_feedback/:order_id/:id', component: ItemFeedbackComponent},
   { path: 'forgot', component: ForgotPasswordComponent},
   { path: 'booking_tables', component: BookingTablesComponent},
   { path: 'itemanalytics1', component: ItemAnalyticsComponent},
   { path: 'itemanalytics2', component: Analytics2Component},
   { path: 'itemanalytics3', component: Analytics3Component},
   { path: 'itemanalytics4', component: Analytics4Component},



];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
