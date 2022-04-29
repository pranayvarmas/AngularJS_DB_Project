import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Item } from '../item';
import { OnlineOrder } from '../online_order';
import { Cancellation } from '../cancellation';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../login.service';
import { OnlineItems } from '../online_items';

@Component({
  selector: 'app-show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.css']
})
export class ShowOrdersComponent implements OnInit {
  orders: OnlineOrder[]=[]
  uOrders: OnlineOrder[]=[]
  cancel = new Cancellation
  order1=new OnlineOrder
  order2=new OnlineItems
  x="";
  showBox=false;
  constructor(private dataService: DataService, private cookie: CookieService, private loginService: LoginService) {}


  // showUpdateItem(id:number){
  //   var i=new Item;
  //   this.uOrders=this.orders;
  //   var j;
  //   for(var k=0; k<this.uOrders.length; k++){
  //     if(this.uOrders[k].on_order_id==id){
  //       j=this.uOrders[k];
  //     }
  //   }
  //   // var j=this.uOrders.find(Item => Item.item_id = id);
  //   if(j==undefined){
  //     // this.showBox=false;
  //   }
  //   else{
  //     i=j;
  //     console.log(i);
  //     this.uOrder = i;
  //     this.showBox=true;
  //   }
  // }

  // updateItem(){
  //   this.dataService.updateItem(this.uOrder.on_order_id, this.uOrder)
  //   .then(response =>{
  //     var y=JSON.parse(JSON.stringify(response));
  //     if(y.success==true){
  //       alert("Updated");
  //       this.showBox=false;
  //     }
  //     else{
  //       alert("Error");
  //     }
  //   })
  //   // this.showBox=false;
  // }

  // deleteItem(id:number){
  //   this.dataService.deleteItem(id)
  //   .then(response =>{
  //     var y=JSON.parse(JSON.stringify(response));
  //     if(y.success==true){
  //       alert("Deleted");
  //       // this.submitted=true;
  //     }
  //     else{
  //       alert("Error");
  //     }
  //   })
  // }
  getOrders() {
    return this.dataService.getOrders(parseInt(this.cookie.get('person_id'))).then( orders => this.x = orders)
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
    return this.dataService.getOrderDetails(id).then( orders => this.x = orders)
    .then(response => {
      var y=JSON.parse(JSON.stringify(response));
      if(y.orderExists==true){
        this.order1=y.data[0];
        this.order2=y.data1;
        console.log(this.order1);
        console.log(this.order2);
        this.showBox=true;
      }
      else if(y.orderExists==false){
        alert("Order Details are not available");
      }
      else{
        console.log("empty");
      }
    })
  }
  cancelOrder(id:number){
    // this.cancel.on_order_id=id;
    this.dataService.cancelOrder(id)
    .then(response =>{
      var y=JSON.parse(JSON.stringify(response));
      if(y.success==true){
        alert("Canceled");
        // this.submitted=true;
      }
      else{
        alert("Error");
      }
    })
  }
  // itemToCart(id:number, quantity:number){
  //   this.dataService.itemToCart(parseInt(this.cookie.get('person_id')), id, quantity)
  //   .then(response =>{
  //     var y=JSON.parse(JSON.stringify(response));
  //     if(y.success==true){
  //       alert("Added");
  //     }
  //     else{
  //       alert("Error");
  //     }
  //   })
  // }

  ngOnInit(): void {
    this.loginService.checkLoginFromDashboard();
     this.getOrders();
  }


}
