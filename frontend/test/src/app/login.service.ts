import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

// import 'rxjs/add/operator/toPromise';



import { Person } from './person';
import { Item } from './item';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {

  private customersUrl = 'http://localhost:3030/';  // URL to web API
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: Http, private cookie: CookieService) { }


  checkLoginFromDashboard(){
    if(this.cookie.get('person_id')==''){
      console.log("No Cookie");
      window.location.href='/login';
    }
    else{
      // console.log(this.cookie.get('person_id'));
      console.log("Cookie there");
    }
  }
  checkLoginFromLogin(){
    if(this.cookie.get('person_id')==''){
      console.log("No Cookie");
    }
    else{
      // console.log(this.cookie.get('person_id'));
      console.log("Cookie there");
      if(this.cookie.get('person_type')=="Free Customer" || this.cookie.get('person_type')=="Premium Customer"){
        window.location.href='/dashboard';
      }
      else{
        window.location.href='/admin-dashboard';
      }
    }
  }

}
