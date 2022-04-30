import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Table } from '../table';
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common';
import { Booktable } from '../book_table';

@Component({
  selector: 'app-booking-tables',
  templateUrl: './booking-tables.component.html',
  styleUrls: ['./booking-tables.component.css'],
  providers: [DatePipe]
})
export class BookingTablesComponent implements OnInit {
  tables: Table[]=[]
  uTables: Table[]=[]
  mytables:Booktable[]=[]
  x="";
  z="";
  booktable = new Booktable;
  currentdate=this.booktable.booking_date;
  slot =0;
   timestamp1 = this.currentdate.getDate();
   timestamp2 = this.currentdate.getMonth();
   timestamp3 = this.currentdate.getFullYear();
  timestamp=this.currentdate.getHours().toString()+":"+ this.currentdate.getMinutes().toString()+":"+this.currentdate.getSeconds().toString()
 // let currentdate = new Date();
  uTable=new Table;
  upto="";
  showBox=false;
  person_id="";
  constructor(private dataService: DataService, private cookie: CookieService,private datePipe: DatePipe) {
    //this.mydate = this.datePipe.transform(this.mydate, 'yyyy-MM-dd');
    this.person_id=cookie.get('person_id');
    this.booktable.person_id=Number(this.person_id);
    console.log(this.timestamp);
  }

  showBookTable(id:number){
    var i=new Table;
    this.uTables=this.tables;

    var j;
    for(var k=0; k<this.uTables.length; k++){
      if(this.uTables[k].table_id==id){
        j=this.uTables[k];
      }
    }
    // var j=this.uItems.find(Item => Item.item_id = id);
    if(j==undefined){
      // this.showBox=false;
    }
    else{
      i=j;
      console.log(i);
      this.uTable = i;
      this.booktable.table_id=this.uTable.table_id;
      this.showBox=true;
    }
  }

  BookTable(){
    this.dataService.BookTable(this.booktable)
    .then(response =>{
      var y=JSON.parse(JSON.stringify(response));
      if(y.success==true){
        alert("Booked");
        this.showBox=false;
      }
      else{
        alert("Error");
      }
    })
    // this.showBox=false;
  }


  getFreeTables() {
    return this.dataService.getFreeTables(this.currentdate).then( tables => this.x = tables)
    .then(response => {
      var y=JSON.parse(JSON.stringify(response));
      if(y.tablesExists==true){
        this.tables=y.data;
      }
      else if(y.tablesExists==false){
        alert("No free tables Tables are available");
      }
      else{
        console.log("empty");
      }
    })
  }
  getBookedTables(){
    return this.dataService.getBookedTables(Number(this.person_id)).then( mytables => this.z = mytables)
    .then(response => {
      var y=JSON.parse(JSON.stringify(response));
      if(y.tablesExists==true){
        this.mytables=y.data;
      }
      else if(y.tablesExists==false){
        alert("No Booked Tables are available");
      }
      else{
        console.log("empty");
      }
    })
  }

  ngOnInit(): void {
    var type=this.cookie.get('person_type');
    if(type=="Base Customer" || type=="Premium Customer" ){

    }
    else{
      alert("Invalid Page");
      window.location.href='/';
    }
     this.getFreeTables();
     this.getBookedTables();

  }


}
