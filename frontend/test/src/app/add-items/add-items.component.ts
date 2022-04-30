import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Item } from '../item';
import { Coupon } from '../coupon';
import { Ingredient } from '../ingredient';
// import { Item } from '../item';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css']
})
export class AddItemsComponent implements OnInit {
  item= new Item;
  x="";
  submitted=false;

  constructor(private dataService: DataService, private cookie: CookieService) {}


  addItem(){
    this.dataService.addItem(this.item)
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
    if(type=="Kitchen Manager" || type=="SuperUser" || type=="General Manager"){

    }
    else{
      alert("Invalid Page");
      window.location.href='/';
    }
  }

}
