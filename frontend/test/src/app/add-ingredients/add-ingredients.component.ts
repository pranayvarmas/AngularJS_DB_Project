import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Item } from '../item';
import { Coupon } from '../coupon';
import { Ingredient } from '../ingredient';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-add-ingredients',
  templateUrl: './add-ingredients.component.html',
  styleUrls: ['./add-ingredients.component.css']
})
export class AddIngredientsComponent implements OnInit {
  ing= new Ingredient;
  x="";
  submitted=false;

  constructor(private dataService: DataService, private cookie: CookieService) {}


  addIngredient(){
    this.dataService.addIng(this.ing)
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
