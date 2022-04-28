import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../login.service';
// import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  person = new Person();
  submitted = false;
  x="";
  email="";
  password="";
  constructor(private dataService: DataService, private cookie: CookieService, private loginService: LoginService) {}

  checkPerson() {
     return this.dataService.checkPerson(this.email, this.password).then(person => this.x = person)
     .then (response =>{
       var y=JSON.parse(JSON.stringify(response));
       if(y=={}){
        console.log("empty");
       }
       else if(y.userExists==false){
          this.submitted=false;
          alert("Email or Password is Incorrect");
       }
       else if(y.userExists==true){
          this.submitted=true;
          var date = new Date();
          // date.setTime(date.getTime()+(10*60*1000));
          date.setTime(date.getTime()+(10*60*1000));
          this.cookie.set( 'person_id', y.data[0]['person_id'].toString(), date);
          this.cookie.set( 'person_name', y.data[0]['person_name'].toString(), date);
          this.cookie.set( 'person_type', y.data[0]['person_type'].toString(), date);
          this.cookie.set( 'type_from', y.data[0]['type_from'].toString(), date);
          this.cookie.set( 'type_to', y.data[0]['type_to'].toString(), date);
          this.cookie.set( 'address', y.data[0]['address'].toString(), date);
          this.cookie.set( 'phone_no', y.data[0]['phone_no'].toString(), date);
          this.cookie.set( 'salary', y.data[0]['salary'].toString(), date);
          this.cookie.set( 'email', y.data[0]['email'].toString(), date);
          window.location.href="/dashboard";
       }
     })
  }

  ngOnInit(): void {
    this.loginService.checkLoginFromLogin();
  }

}
