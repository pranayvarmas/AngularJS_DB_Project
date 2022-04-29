import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Item } from '../item';
import { Coupon } from '../coupon';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-add-coupons',
  templateUrl: './add-coupons.component.html',
  styleUrls: ['./add-coupons.component.css']
})
export class AddCouponsComponent implements OnInit {
  coupon= new Coupon;
  x="";
  submitted=false;

  constructor(private dataService: DataService, private cookie: CookieService) {}


  addCoupon(){
    this.dataService.addCoupon(this.coupon)
    .then(response =>{
      var y=JSON.parse(JSON.stringify(response));
      if(y.success==true){
        alert("Added");
        this.submitted=true;
      }
      else{
        alert("Error");
      }
    })
  }



  ngOnInit(): void {
    var type=this.cookie.get('person_type');
    if(type=="Billing Manager" || type=="General Manager"){

    }
    else{
      alert("Invalid Page");
      window.location.replace("/dashboard");
    }
  }

}
