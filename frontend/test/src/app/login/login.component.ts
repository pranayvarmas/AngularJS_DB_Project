import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
// import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  person = new Person();
  submitted = false;
  email="";
  password="";
  constructor(private dataService: DataService, private cookie: CookieService) {}

  checkPerson() {
     return this.dataService.checkPerson(this.email, this.password).then(person => this.person = person)
     .then (response =>{
       if(response.person_id==0){
        alert("Email or Password is Incorrect");
       }
       else{
         this.submitted=true;
         var date = new Date();
        // date.setTime(date.getTime()+(10*60*1000));
        date.setTime(date.getTime()+(5*1000));
        this.cookie.set( 'person_id', response.person_id.toString(), date);
        this.cookie.set( 'person_name', response.person_name.toString(), date);
        this.cookie.set( 'person_type', response.person_type.toString(), date);
        this.cookie.set( 'type_from', response.type_from.toString(), date);
        this.cookie.set( 'type_to', response.type_to.toString(), date);
        this.cookie.set( 'address', response.address.toString(), date);
        this.cookie.set( 'phone_no', response.phone_no.toString(), date);
        this.cookie.set( 'salary', response.salary.toString(), date);
        this.cookie.set( 'email', response.email.toString(), date);
        window.location.href="/dashboard";
        // this.cookie.set( 'password', response.person_id.toString());
       }
     })
  }

  ngOnInit(): void {
    //  this.getCustomers();
    console.log(this.cookie.get('person_id'));
    if(this.cookie.get('person_id')==''){
      console.log("No Cookie");
    }
    else{
      // console.log(this.cookie.get('person_id'));
      console.log("Cookie there");
      window.location.href="/dashboard";
    }
  }

}
