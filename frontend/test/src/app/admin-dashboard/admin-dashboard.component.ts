import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { DataService } from '../data.service';
import { LoginService } from '../login.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {



  constructor(private dataService: DataService, private cookie: CookieService, private loginService: LoginService) {}


  ngOnInit(): void {
    this.loginService.checkLoginFromDashboard();
  }

}
