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
import { identifierName } from '@angular/compiler';

@Injectable()
export class DataService {

  private customersUrl = 'http://localhost:3030/';  // URL to web API
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  // Get all customers
  getItems(): Promise<string> {
    const url = `${this.customersUrl}items`;
    return this.http.get(url)
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
  checkPerson(email:string, password:string): Promise<string> {
    const url = `${this.customersUrl}login`;
    return this.http.get(url+"/"+email+"/"+password)
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
    return this.http.post(url, {person_id: person_id, item_id:item_id, quantity:quantity})
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
    return this.http.post(url, JSON.parse(JSON.stringify(coupon)))
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

  addItem(item:Item): Promise<string> {
    const url = `${this.customersUrl}add_item`;
    return this.http.post(url, JSON.parse(JSON.stringify(item)))
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
    return this.http.put(url, JSON.parse(JSON.stringify(item)))
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
  deleteItem(id:number): Promise<string> {
    const url = `${this.customersUrl}delete_item/${id}`;
    return this.http.delete(url)
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
    return this.http.post(url, JSON.parse(JSON.stringify(ing)))
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
    return this.http.post(url, JSON.parse(JSON.stringify(table)))
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
    return this.http.post(url, JSON.parse(JSON.stringify(person)))
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
  //   return this.http.get(url)
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
