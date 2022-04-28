import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { DataService } from '../data.service';
import { LoginService } from '../login.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {



  constructor(private dataService: DataService, private cookie: CookieService, private loginService: LoginService) {}


  ngOnInit(): void {
    this.loginService.checkLoginFromDashboard();
  }

}
