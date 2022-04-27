import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

// import 'rxjs/add/operator/toPromise';



import { Person } from './person';
import { Observable } from 'rxjs';

@Injectable()
export class DataService {

  private customersUrl = 'http://localhost:3030/';  // URL to web API
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  // Get all customers
  // getCustomers(): Promise<Customer[]> {
  //   return this.http.get(this.customersUrl)
  //              .toPromise()
  //              .then(response => response.json() as Customer[])
  //              .catch(this.handleError);
  // }
  checkPerson(email:string, password:string): Promise<Person> {
    const url = `${this.customersUrl}login`;
    return this.http.get(url+"/"+email+"/"+password)
                  .toPromise()
                 .then(response => {
                   var x= new Person();
                      if(response!=undefined){
                        var res=response.json();
                        if(res.userExists==true){
                          res=res.data[0]
                          console.log(response);
                          // $cookieStore.put('emailAddress', res['data']['email']);
                          x.person_id=res['person_id'];
                          x.person_name=res['person_name'];
                          x.person_type=res['person_type'];
                          x.type_from=res['type_from'];
                          x.type_to=res['type_to'];
                          x.address=res['address'];
                          x.phone_no=res['phone_no'];
                          x.salary=res['salary'];
                          x.email=res['email'];
                          x.password=res['password'];
                        }
                      }
                      else{
                        console.log("undefined");
                      }
                      return x;
                  })
                 .catch(this.handleError);
              //  .catch(this.handleError);
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
