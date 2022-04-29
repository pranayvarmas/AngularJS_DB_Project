import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Table } from '../table';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-show-tables',
  templateUrl: './show-tables.component.html',
  styleUrls: ['./show-tables.component.css']
})
export class ShowTablesComponent implements OnInit {
  tables: Table[]=[]
  uTables: Table[]=[]
  x="";
  uTable=new Table;
  showBox=false;
  constructor(private dataService: DataService, private cookie: CookieService, private loginService: LoginService) {}


  showUpdateTable(id:number){
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

  updateTable(){
    this.dataService.updateTable(this.uTable.table_id, this.uTable)
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

  
  getTables() {
    return this.dataService.getTables().then( tables => this.x = tables)
    .then(response => {
      var y=JSON.parse(JSON.stringify(response));
      if(y.tablesExists==true){
        this.tables=y.data;
      }
      else if(y.tablesExists==false){
        alert("No Tables are available");
      }
      else{
        console.log("empty");
      }
    })
  }
  

  ngOnInit(): void {
    this.loginService.checkLoginFromDashboard();
     this.getTables();
  }
  

}