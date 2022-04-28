import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Item } from '../item';
import { Coupon } from '../coupon';
import { Ingredient } from '../ingredient';
import { CookieService } from 'ngx-cookie-service';
import { Table } from '../table';


@Component({
  selector: 'app-add-tables',
  templateUrl: './add-tables.component.html',
  styleUrls: ['./add-tables.component.css']
})
export class AddTablesComponent implements OnInit {
  table= new Table;
  x="";
  submitted=false;

  constructor(private dataService: DataService, private cookie: CookieService) {}


  addTable(){
    this.dataService.addTable(this.table)
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
