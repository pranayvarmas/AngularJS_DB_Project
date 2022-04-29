import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Item } from '../item';
import { Coupon } from '../coupon';
import { Ingredient } from '../ingredient';
import { ActivatedRoute, Params } from '@angular/router';
import { Person } from '../person';
import { DeliveryPerson } from '../delivery_person';
import { CookieService } from 'ngx-cookie-service';
import { OnlineOrder } from '../online_order';


@Component({
  selector: 'app-dp-details',
  templateUrl: './dp-details.component.html',
  styleUrls: ['./dp-details.component.css']
})
export class DpDetailsComponent implements OnInit {
  person= new DeliveryPerson;
  orders:OnlineOrder[]=[];
  x="";
  submitted=false;
  id=0;

  constructor(private dataService: DataService, private cookie: CookieService, private route: ActivatedRoute) {}


  getDp() {
    return this.dataService.getDp(this.id).then( persons => this.x = persons)
    .then(response => {
      var y=JSON.parse(JSON.stringify(response));
      if(y.data.length>0){
        this.orders=y.data;
        this.person=y.data1[0];
        console.log(this.person, this.orders);
      }
      else{
        console.log("empty");
      }
    })
  }
  orderDelivered(id:number){
    return this.dataService.orderDelivered(this.id, id).then( response => this.x = response)
    .then(response => {
      var y=JSON.parse(JSON.stringify(response));
      if(y.success){
        alert("Delivered");
      }
      else{
        alert("Error Occured");
      }
    })
  }


  ngOnInit(): void {
    this.route.params
    .subscribe((params: Params) => {
      this.id=params['id'];
      this.getDp();
    })
  }

}
