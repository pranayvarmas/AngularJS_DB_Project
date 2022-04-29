import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Coupon } from '../coupon';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-show-coupons',
  templateUrl: './show-coupons.component.html',
  styleUrls: ['./show-coupons.component.css']
})
export class ShowCouponsComponent implements OnInit {
  items: Coupon[]=[]
  uItems: Coupon[]=[]
  x="";
  uItem=new Coupon;
  showBox=false;
  constructor(private dataService: DataService, private cookie: CookieService) {}

  showUpdateCoupon(id:number){
    var i=new Coupon;
    this.uItems=this.items;
    var j;
    for(var k=0; k<this.uItems.length; k++){
      if(this.uItems[k].coupon_id==id){
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

  updateCoupon(){
    this.dataService.updateCoupon(this.uItem.coupon_id, this.uItem)
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

  getCoupons() {
    return this.dataService.getCoupons().then( items => this.x = items)
    .then(response => {
      var y=JSON.parse(JSON.stringify(response));
      if(y.itemsExists==true){
        this.items=y.data;
      }
      else if(y.itemsExists==false){
        alert("No Items are available");
      }
      else{
        console.log("empty");
      }
    })
  }
  ngOnInit(): void {
    this.getCoupons();
  }

}
