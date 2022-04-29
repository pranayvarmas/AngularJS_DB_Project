import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Item } from '../item';
import { OfflineOrder } from '../offline_order';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../login.service';
import { OfflineItems } from '../offline_items';

@Component({
  selector: 'app-show-offline-orders',
  templateUrl: './show-offline-orders.component.html',
  styleUrls: ['./show-offline-orders.component.css']
})
export class ShowOfflineOrdersComponent implements OnInit {
  orders: OfflineOrder[]=[];
  uOrders: OfflineOrder[]=[];
  items: OfflineItems[]=[];
  x="";
  z="";
  showBox=false;
  constructor(private dataService: DataService, private cookie: CookieService, private loginService: LoginService) {}

  getOrders() {
    return this.dataService.getOfflineOrders().then( orders => this.x = orders)
    .then(response => {
      var y=JSON.parse(JSON.stringify(response));
      if(y.ordersExists==true){
        this.orders=y.data;

      }
      else if(y.ordersExists==false){
        alert("No orders are available");
      }
      else{
        console.log("empty");
      }
    })
  }
  openOrder(id:number){
    return this.dataService.getOfflineOrderDetails(id).then( items => this.z = items)
    .then(response => {
      var y=JSON.parse(JSON.stringify(response));
      if(y.ordersExists==true){
        console.log(y.data);
        this.items=y.data;
        this.showBox=true;
      }
      else if(y.ordersExists==false){
        alert("Order Details are not available");
      }
      else{
        console.log("empty");
      }
    })
  }



  ngOnInit(): void {
    this.loginService.checkLoginFromDashboard();
     this.getOrders();
  }

}
