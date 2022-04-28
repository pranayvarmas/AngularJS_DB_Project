import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Item } from '../item';
import { Coupon } from '../coupon';
import { Ingredient } from '../ingredient';
import { Person } from '../person';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-add-persons',
  templateUrl: './add-persons.component.html',
  styleUrls: ['./add-persons.component.css']
})
export class AddPersonsComponent implements OnInit {
  person= new Person;
  x="";
  submitted=false;

  constructor(private dataService: DataService, private cookie: CookieService) {}


  addPerson(){
    this.dataService.addPerson(this.person)
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
  }

}
