import { Component, OnInit } from '@angular/core';
import { Person } from './person';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test';
  isLogged=false;
  constructor(private cookie: CookieService){}
  logOut(){
    this.cookie.deleteAll();
    window.location.href="/login";
  }
  ngOnInit(): void {
    if(this.cookie.get('person_id')==""){
      this.isLogged=false;
    }
    else{
      this.isLogged=true;
    }
  }
}
