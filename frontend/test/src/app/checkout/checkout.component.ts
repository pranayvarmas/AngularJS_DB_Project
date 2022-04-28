import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Item } from '../item';
import { Coupon } from '../coupon';
import { Cart } from '../cart';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../login.service';
import { CouponsUsers } from '../coupons_users';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  items: Cart[]=[]
  coupons: CouponsUsers[]=[]
  uItems: Cart[]=[]
  x="";
  payOption=true;
  payStatus=false;
  total_price:number=0;
  net_price:number=0;
  uItem=new Cart;
  showBox=false;
  applied=false;
  constructor(private dataService: DataService, private cookie: CookieService, private loginService: LoginService) {}

  applyCoupon(id:number){

  }
  showUpdateItem(id:number){
    var i=new Cart;
    this.uItems=this.items;
    var j;
    for(var k=0; k<this.uItems.length; k++){
      if(this.uItems[k].item_id==id){
        j=this.uItems[k];
      }
    }
    // var j=this.uItems.find(Item => Item.item_id = id);
    if(j==undefined){
      // this.showBox=false;
    }
    else{
      i=j;
      console.log(i);
      this.uItem = i;
      this.showBox=true;
    }
  }

  updateItem(){
    this.dataService.updateItem(this.uItem.item_id, this.uItem)
    .then(response =>{
      var y=JSON.parse(JSON.stringify(response));
      if(y.success==true){
        alert("Updated");
        this.showBox=false;
      }
      else{
        alert("Error");
      }
    })
    // this.showBox=false;
  }

  deleteCart(id:number){
    this.dataService.deleteCart(parseInt(this.cookie.get('person_id')), id)
    .then(response =>{
      var y=JSON.parse(JSON.stringify(response));
      if(y.success==true){
        alert("Deleted");
        // this.submitted=true;
      }
      else{
        alert("Error");
      }
    })
  }
  getCheckout() {
    return this.dataService.getCheckout(parseInt(this.cookie.get('person_id'))).then( items => this.x = items)
    .then(response => {
      var y=JSON.parse(JSON.stringify(response));
      if(y.itemsExists==true){
        this.items=y.data;
        console.log(this.items);
        this.total_price=0;
        for(var k=0; k<this.items.length; k++){
          this.total_price=this.total_price+this.items[k].price*this.items[k].quantity;
        }
        this.net_price=this.total_price;
      }
      else if(y.itemsExists==false){
        alert("No Items are available in checkout");
      }
      else{
        console.log("empty");
      }
    })
  }
  itemToCart(id:number, quantity:number){
    this.dataService.itemToCart(parseInt(this.cookie.get('person_id')), id, quantity)
    .then(response =>{
      var y=JSON.parse(JSON.stringify(response));
      if(y.success==true){
        alert("Added");
      }
      else{
        alert("Error");
      }
    })
  }
  getCoupons(){
    return this.dataService.getCouponsPerson(parseInt(this.cookie.get('person_id'))).then( coupons => this.x = coupons)
    .then(response => {
      var y=JSON.parse(JSON.stringify(response));
      if(y.couponsExists==true){
        this.coupons=y.data;
      }
      else if(y.couponsExists==false){
        alert("No Coupons are available");
      }
      else{
        console.log("empty");
      }
    })
  }
  couponApply(id:number){
      this.applied=true;
      this.net_price=this.total_price/2;
  }
  payment(){
    this.payOption=false;
  }
  payment1(i:number){
    if(i==1){
      console.log("success");
    }
    else{
      window.location.href='/cart';
    }
  }

  ngOnInit(): void {
    this.loginService.checkLoginFromDashboard();
     this.getCheckout();
     this.getCoupons();
  }


}
