import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../login.service';
// import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-login',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})

export class SignupComponent implements OnInit {
  person = new Person();
  submitted = false;
  x="";
  msg="";
  email="";
  password="";
  constructor(private dataService: DataService, private cookie: CookieService, private loginService: LoginService) {}

  signUp(){
    if(this.person.person_name=="" || this.person.person_type=="" || this.person.email=="" || this.person.password=="" || this.person.address=="" || this.person.phone_no==""){
      this.msg="Please enter all the details";
    }
    this.dataService.signUp(this.person)
    .then(response =>{
      var y=JSON.parse(JSON.stringify(response));
      if(y.success==true){
        alert("Submitted");
        window.location.href="/login";
        this.submitted=true;

      }
      else{
        alert("Error");
      }
    })
  }

  ngOnInit(): void {
    this.loginService.checkLoginFromLogin();
  }

}
