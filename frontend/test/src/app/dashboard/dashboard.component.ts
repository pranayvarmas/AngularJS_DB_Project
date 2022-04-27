import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {



  constructor(private dataService: DataService, private cookie: CookieService) {}


  ngOnInit(): void {
    if(this.cookie.get('person_id')==''){
      console.log("No Cookie");
      window.location.href="/login";
    }
    else{
      // console.log(this.cookie.get('person_id'));
      console.log("Cookie there");
    }
  }

}
