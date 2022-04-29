import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Item } from '../item';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-item-analytics',
  templateUrl: './item-analytics.component.html',
  styleUrls: ['./item-analytics.component.css']
})
export class ItemAnalyticsComponent implements OnInit {
  items: Item[]=[]
  uItems: Item[]=[]
  x="";
  showitem=false;
  uItem=new Item;
  showBox=false;
  constructor(private dataService: DataService, private cookie: CookieService, private loginService: LoginService) {}

  getItemAnalytics() {
    return this.dataService.getItemAnalytics()
    .then(response => {
      var y=JSON.parse(JSON.stringify(response));

    })
  }

  ngOnInit(): void {
    this.loginService.checkLoginFromDashboard();
     this.getItemAnalytics();
  }


}
