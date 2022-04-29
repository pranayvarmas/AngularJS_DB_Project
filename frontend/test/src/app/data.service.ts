import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

// import 'rxjs/add/operator/toPromise';



import { Person } from './person';
import { Item } from './item';
import { Observable } from 'rxjs';
import { Coupon } from './coupon';
import { Ingredient } from './ingredient';
import { Table } from './table';
import { Booktable } from './book_table';
import { identifierName } from '@angular/compiler';
import { OnlineOrder } from './online_order';
import { CookieService } from 'ngx-cookie-service';
import { DpFeedback } from './dp_feedback';
import { ItemFeedback } from './item_feedback';

@Injectable()
export class DataService {

  constructor(private http: Http, private cookie: CookieService) { }

  private customersUrl = 'http://localhost:3030/';  // URL to web API
  // console.log(this.cookie.get('token').toString());
  private headers = new Headers({'Content-Type': 'application/json', 'Authorization':'Bearer '+this.cookie.get('token')});


  // Get all customers
  getItems(): Promise<string> {
    console.log(this.headers);
    const url = `${this.customersUrl}items`;
    return this.http.get(url, {headers:this.headers})
               .toPromise()
               .then(response => {
                  if(response!=undefined){
                    return response.json();
                  }
                  else{
                    console.log("Items Error");
                    return {};
                  }})
               .catch(this.handleError);
  }
  getItemAnalytics(): Promise<string> {
    console.log(this.headers);
    const url = `${this.customersUrl}itemanalytics`;
    return this.http.get(url, {headers:this.headers})
               .toPromise()
               .then(response => {
                  if(response!=undefined){
                    return response.json();
                  }
                  else{
                    console.log("ItemAnalytics Error");
                    return {};
                  }})
               .catch(this.handleError);
  }
  getIngredients(): Promise<string> {
    const url = `${this.customersUrl}ingredients`;
    return this.http.get(url, {headers:this.headers})
               .toPromise()
               .then(response => {
                  if(response!=undefined){
                    return response.json();
                  }
                  else{
                    console.log("Ingredients Error");
                    return {};
                  }})
               .catch(this.handleError);
  }
  getDp(id:number): Promise<string> {
    const url = `${this.customersUrl}getdp/${id}`;
    return this.http.get(url, {headers:this.headers})
               .toPromise()
               .then(response => {
                  if(response!=undefined){
                    return response.json();
                  }
                  else{
                    console.log("Dp Error");
                    return {};
                  }})
               .catch(this.handleError);
  }
  getCoupons(): Promise<string> {
    const url = `${this.customersUrl}coupons`;
    return this.http.get(url, {headers:this.headers})
               .toPromise()
               .then(response => {
                  if(response!=undefined){
                    return response.json();
                  }
                  else{
                    console.log("Coupons Error");
                    return {};
                  }})
               .catch(this.handleError);
  }
  getPerson(): Promise<string> {
    const url = `${this.customersUrl}persons`;
    return this.http.get(url, {headers:this.headers})
               .toPromise()
               .then(response => {
                  if(response!=undefined){
                    return response.json();
                  }
                  else{
                    console.log("Coupons Error");
                    return {};
                  }})
               .catch(this.handleError);
  }
  getTables(): Promise<string> {
    const url = `${this.customersUrl}tables`;
    return this.http.get(url, {headers:this.headers})
               .toPromise()
               .then(response => {
                  if(response!=undefined){
                    return response.json();
                  }
                  else{
                    console.log("Tables Error");
                    return {};
                  }})
               .catch(this.handleError);
  }
  getFreeTables(dt:Date): Promise<string> {
    const url = `${this.customersUrl}booking-tables/${dt}`;
    
    return this.http.get(url)
               .toPromise()
               .then(response => {
                  if(response!=undefined){
                    
                    return response.json();
                  }
                  else{
                    console.log("FreeTables Error");
                    return {};
                  }})
               .catch(this.handleError);
  }
  getBookedTables(id:number): Promise<string> {
    const url = `${this.customersUrl}booked-tables/${id}`;
    
    return this.http.get(url)
               .toPromise()
               .then(response => {
                  if(response!=undefined){
                    
                    return response.json();
                  }
                  else{
                    console.log("FreeTables Error");
                    return {};
                  }})
               .catch(this.handleError);
  }      
  BookTable(booktable:Booktable): Promise<string> {
    const url = `${this.customersUrl}add-booking-tables`;
    console.log(url);
    return this.http.post(url, JSON.parse(JSON.stringify(booktable)))
               .toPromise()
               .then(response => {
                  if(response!=undefined){
                    return response.json();
                  }
                  else{
                    console.log("booking Error");
                    return {};
                  }})
               .catch(this.handleError);
  }
  getOfflineOrders(): Promise<string> {
    console.log("hi");
    const url = `${this.customersUrl}offlineorders`;
    return this.http.get(url, {headers:this.headers})
               .toPromise()
               .then(response => {
                 console.log("ppp");
                  if(response!=undefined){
                    console.log("jjj");
                    return response.json();
                  }
                  else{
                    console.log("OfflineOrders Error");
                    return {};
                  }})
               .catch(this.handleError);
  }   
  getOfflineOrderDetails(id:number): Promise<string> {
    const url = `${this.customersUrl}offlineorders/details/${id}`;
    return this.http.get(url, {headers:this.headers})
               .toPromise()
               .then(response => {
                  if(response!=undefined){
                    return response.json();
                  }
                  else{
                    console.log("OfflineOrders Details Error");
                    return {};
                  }})
               .catch(this.handleError);
  }   
  getOrders(id:number): Promise<string> {
    const url = `${this.customersUrl}orders/${id}`;
    return this.http.get(url, {headers:this.headers})
               .toPromise()
               .then(response => {
                  if(response!=undefined){
                    return response.json();
                  }
                  else{
                    console.log("Orders Error");
                    return {};
                  }})
               .catch(this.handleError);
  }
  getOrderDetails(id:number): Promise<string> {
    const url = `${this.customersUrl}orders/details/${id}`;
    return this.http.get(url, {headers:this.headers})
               .toPromise()
               .then(response => {
                  if(response!=undefined){
                    return response.json();
                  }
                  else{
                    console.log("Orders Details Error");
                    return {};
                  }})
               .catch(this.handleError);
  }
  cancelOrder(id:number){
    const url = `${this.customersUrl}cancel_order`;
    return this.http.post(url, {on_order_id: id}, {headers:this.headers})
               .toPromise()
               .then(response => {
                  if(response!=undefined){
                    return response.json();
                  }
                  else{
                    console.log("CancelOrder Error");
                    return {};
                  }})
               .catch(this.handleError);
  }
  orderDelivered(dp_id:number, id:number){
    const url = `${this.customersUrl}order_delivered`;
    return this.http.post(url, {dp_id: dp_id, id:id}, {headers:this.headers})
               .toPromise()
               .then(response => {
                  if(response!=undefined){
                    return response.json();
                  }
                  else{
                    console.log("OrderDelivered Error");
                    return {};
                  }})
               .catch(this.handleError);
  }
  dpFeedback(dpf:DpFeedback){
    const url = `${this.customersUrl}dp_feedback`;
    return this.http.post(url, JSON.parse(JSON.stringify(dpf)), {headers:this.headers})
               .toPromise()
               .then(response => {
                  if(response!=undefined){
                    return response.json();
                  }
                  else{
                    console.log("DpFeedback Error");
                    return {};
                  }})
               .catch(this.handleError);
  }
  itemFeedback(itemf:ItemFeedback){
    const url = `${this.customersUrl}item_feedback`;
    return this.http.post(url, JSON.parse(JSON.stringify(itemf)), {headers:this.headers})
               .toPromise()
               .then(response => {
                  if(response!=undefined){
                    return response.json();
                  }
                  else{
                    console.log("ItemFeedback Error");
                    return {};
                  }})
               .catch(this.handleError);
  }
  signUp(person:Person){
    const url = `${this.customersUrl}signup`;
    return this.http.post(url, JSON.parse(JSON.stringify(person)), {headers:this.headers})
               .toPromise()
               .then(response => {
                  if(response!=undefined){
                    return response.json();
                  }
                  else{
                    console.log("Signup Error");
                    return {};
                  }})
               .catch(this.handleError);
  }

  getCouponsPerson(id:number): Promise<string> {
    const url = `${this.customersUrl}coupons_person/${id}`;
    return this.http.get(url, {headers:this.headers})
               .toPromise()
               .then(response => {
                  if(response!=undefined){
                    return response.json();
                  }
                  else{
                    console.log("Coupons Person Error");
                    return {};
                  }})
               .catch(this.handleError);
  }

  getEstTime(id:number): Promise<string> {
    const url = `${this.customersUrl}get_est_time/${id}`;
    return this.http.get(url, {headers:this.headers})
               .toPromise()
               .then(response => {
                  if(response!=undefined){
                    return response.json();
                  }
                  else{
                    console.log("Est Time Error");
                    return {};
                  }})
               .catch(this.handleError);
  }
  getCart(id:number): Promise<string> {
    const url = `${this.customersUrl}cart/${id}`;
    console.log(id);
    return this.http.get(url, {headers:this.headers})
               .toPromise()
               .then(response => {
                  if(response!=undefined){
                    return response.json();
                  }
                  else{
                    console.log("Cart Error");
                    return {};
                  }})
               .catch(this.handleError);
  }

  getCheckout(id:number): Promise<string> {
    const url = `${this.customersUrl}checkout/${id}`;
    console.log(id);
    return this.http.get(url, {headers:this.headers})
               .toPromise()
               .then(response => {
                  if(response!=undefined){
                    return response.json();
                  }
                  else{
                    console.log("Checkout Error");
                    return {};
                  }})
               .catch(this.handleError);
  }
  checkPerson(email:string, password:string): Promise<string> {
    const url = `${this.customersUrl}login`;
    return this.http.get(url+"/"+email+"/"+password, {headers:this.headers})
                  .toPromise()
                 .then(response => {
                   var x= new Person();
                      if(response!=undefined){
                        // var res=response.json();
                        // if(res.userExists==true){
                        //   res=res.data[0]
                        //   console.log(response);
                        //   // $cookieStore.put('emailAddress', res['data']['email']);
                        //   x.person_id=res['person_id'];
                        //   x.person_name=res['person_name'];
                        //   x.person_type=res['person_type'];
                        //   x.type_from=res['type_from'];
                        //   x.type_to=res['type_to'];
                        //   x.address=res['address'];
                        //   x.phone_no=res['phone_no'];
                        //   x.salary=res['salary'];
                        //   x.email=res['email'];
                        //   x.password=res['password'];

                        // }
                        return response.json();
                      }
                      else{
                        console.log("Login Error");
                        return {};
                      }
                      // return response;
                  })
                 .catch(this.handleError);
              //  .catch(this.handleError);
  }
  itemToCart(person_id:number, item_id:number, quantity:number): Promise<string> {
    const url = `${this.customersUrl}item_to_cart`;
    return this.http.post(url, {person_id: person_id, item_id:item_id, quantity:quantity}, {headers:this.headers})
               .toPromise()
               .then(response => {
                  if(response!=undefined){
                    return response.json();
                  }
                  else{
                    console.log("ItemToCart Error");
                    return {};
                  }})
               .catch(this.handleError);
  }

  addCoupon(coupon:Coupon): Promise<string> {
    const url = `${this.customersUrl}add_coupon`;
    return this.http.post(url, JSON.parse(JSON.stringify(coupon)), {headers:this.headers})
               .toPromise()
               .then(response => {
                  if(response!=undefined){
                    return response.json();
                  }
                  else{
                    console.log("addCoupon Error");
                    return {};
                  }})
               .catch(this.handleError);
  }
  addOnlineOrder(oo:OnlineOrder): Promise<string> {
    const url = `${this.customersUrl}add_onlineorder`;
    return this.http.post(url, JSON.parse(JSON.stringify(oo)), {headers:this.headers})
               .toPromise()
               .then(response => {
                  if(response!=undefined){
                    return response.json();
                  }
                  else{
                    console.log("addOnlineOrder Error");
                    return {};
                  }})
               .catch(this.handleError);
  }
  addItem(item:Item): Promise<string> {
    const url = `${this.customersUrl}add_item`;
    return this.http.post(url, JSON.parse(JSON.stringify(item)), {headers:this.headers})
               .toPromise()
               .then(response => {
                  if(response!=undefined){
                    return response.json();
                  }
                  else{
                    console.log("addItem Error");
                    return {};
                  }})
               .catch(this.handleError);
  }
  updateItem(id:number, item:Item): Promise<string> {
    const url = `${this.customersUrl}update_item/${id}`;
    return this.http.put(url, JSON.parse(JSON.stringify(item)), {headers:this.headers})
               .toPromise()
               .then(response => {
                  if(response!=undefined){
                    return response.json();
                  }
                  else{
                    console.log("updateItem Error");
                    return {};
                  }})
               .catch(this.handleError);
  }
//////////////////////////////////////////
  updateIngredient(id:number, item:Ingredient): Promise<string> {
    const url = `${this.customersUrl}update_ingredient/${id}`;
    return this.http.put(url, JSON.parse(JSON.stringify(item)), {headers:this.headers})
               .toPromise()
               .then(response => {
                  if(response!=undefined){
                    return response.json();
                  }
                  else{
                    console.log("updateItem Error");
                    return {};
                  }})
               .catch(this.handleError);
  }
  updateCoupon(id:number, item:Coupon): Promise<string> {
    const url = `${this.customersUrl}update_coupon/${id}`;
    return this.http.put(url, JSON.parse(JSON.stringify(item)), {headers:this.headers})
               .toPromise()
               .then(response => {
                  if(response!=undefined){
                    return response.json();
                  }
                  else{
                    console.log("updateCoupon Error");
                    return {};
                  }})
               .catch(this.handleError);
  }
  updatePerson(id:number, item:Person): Promise<string> {
    const url = `${this.customersUrl}update_person/${id}`;
    return this.http.put(url, JSON.parse(JSON.stringify(item)), {headers:this.headers})
               .toPromise()
               .then(response => {
                  if(response!=undefined){
                    return response.json();
                  }
                  else{
                    console.log("updatePerson Error");
                    return {};
                  }})
               .catch(this.handleError);
  }
  updateTable(id:number, table:Table): Promise<string> {
    const url = `${this.customersUrl}update_table/${id}`;
    return this.http.put(url, JSON.parse(JSON.stringify(table)), {headers:this.headers})
               .toPromise()
               .then(response => {
                  if(response!=undefined){
                    return response.json();
                  }
                  else{
                    console.log("updateTable Error");
                    return {};
                  }})
               .catch(this.handleError);
  }
//////////////////////////////////////////
  deleteItem(id:number): Promise<string> {
    const url = `${this.customersUrl}delete_item/${id}`;
    return this.http.delete(url, {headers:this.headers})
               .toPromise()
               .then(response => {
                  if(response!=undefined){
                    return response.json();
                  }
                  else{
                    console.log("deleteItem Error");
                    return {};
                  }})
               .catch(this.handleError);
  }

  deleteCart(person_id:number, item_id:number): Promise<string> {
    const url = `${this.customersUrl}delete_cart/${person_id}/${item_id}`;
    return this.http.delete(url, {headers:this.headers})
               .toPromise()
               .then(response => {
                  if(response!=undefined){
                    return response.json();
                  }
                  else{
                    console.log("deleteItem Error");
                    return {};
                  }})
               .catch(this.handleError);
  }
  addIng(ing:Ingredient): Promise<string> {
    const url = `${this.customersUrl}add_ing`;
    return this.http.post(url, JSON.parse(JSON.stringify(ing)), {headers:this.headers})
               .toPromise()
               .then(response => {
                  if(response!=undefined){
                    return response.json();
                  }
                  else{
                    console.log("addIng Error");
                    return {};
                  }})
               .catch(this.handleError);
  }

  addTable(table:Table): Promise<string> {
    const url = `${this.customersUrl}add_table`;
    return this.http.post(url, JSON.parse(JSON.stringify(table)), {headers:this.headers})
               .toPromise()
               .then(response => {
                  if(response!=undefined){
                    return response.json();
                  }
                  else{
                    console.log("addTable Error");
                    return {};
                  }})
               .catch(this.handleError);
  }

  addPerson(person:Person): Promise<string> {
    const url = `${this.customersUrl}add_person`;
    return this.http.post(url, JSON.parse(JSON.stringify(person)), {headers:this.headers})
               .toPromise()
               .then(response => {
                  if(response!=undefined){
                    return response.json();
                  }
                  else{
                    console.log("addPerson Error");
                    return {};
                  }})
               .catch(this.handleError);
  }
  // getCustomer(id: number): Promise<Customer> {
  //   const url = `${this.customersUrl}/${id}`;
  //   return this.http.get(url, {headers:this.headers})
  //     .toPromise()
  //     .then(response => response.json() as Customer)
  //     .catch(this.handleError);
  // }

  // create(customer: Customer): Promise<Customer> {
  //   return this.http
  //     .post(this.customersUrl, JSON.stringify(customer), {headers: this.headers})
  //     .toPromise()
  //     .then(res => res.json() as Customer)
  //     .catch(this.handleError);
  // }

  // update(customer: Customer): Promise<Customer> {
  //   const url = `${this.customersUrl}/${customer.id}`;
  //   return this.http
  //     .put(url, JSON.stringify(customer), {headers: this.headers})
  //     .toPromise()
  //     .then(() => customer)
  //     .catch(this.handleError);
  // }

  // delete(id: number): Promise<void> {
  //   const url = `${this.customersUrl}/${id}`;
  //   return this.http.delete(url, {headers: this.headers})
  //     .toPromise()
  //     .then(() => null)
  //     .catch(this.handleError);
  // }

  private handleError(error: any): Promise<any> {
    console.error('Error', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
