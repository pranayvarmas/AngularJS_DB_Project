import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Table } from '../table';
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-booking-tables',
  templateUrl: './booking-tables.component.html',
  styleUrls: ['./booking-tables.component.css'],
  providers: [DatePipe]
})
export class BookingTablesComponent implements OnInit {
  tables: Table[]=[]
  uTables: Table[]=[]
  x="";
  currentdate=new Date('2012-01-12');
  booking_from = new Date;
  booking_to = new Date;
  
 // let currentdate = new Date();
  uTable=new Table;
  upto="";
  showBox=false;
  person_id="";
  constructor(private dataService: DataService, private cookie: CookieService,private datePipe: DatePipe) {
    //this.mydate = this.datePipe.transform(this.mydate, 'yyyy-MM-dd');
    this.person_id=cookie.get('person_id');
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
      this.showBox=true;
    }
  }

  BookTable(){
    this.dataService.BookTable(this.uTable.table_id, this.person_id,this.currentdate,this.booking_from,this.booking_to)
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
  

  ngOnInit(): void {
     this.getFreeTables();
  }
  

}
