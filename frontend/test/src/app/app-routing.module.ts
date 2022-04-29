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

const routes: Routes = [
   { path: '', redirectTo: 'login', pathMatch: 'full' },
   { path: 'login',  component: LoginComponent },
   { path: 'signup', component: SignupComponent },
   { path: 'items', component: ShowItemsComponent },
   { path: 'dashboard', component: DashboardComponent },
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
   { path: 'item_feedback/:order_id/:id', component: ItemFeedbackComponent}

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
