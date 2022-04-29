import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Person } from '../person';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-show-persons',
  templateUrl: './show-persons.component.html',
  styleUrls: ['./show-persons.component.css']
})
export class ShowPersonsComponent implements OnInit {
  items: Person[]=[]
  uItems: Person[]=[]
  x="";
  uItem=new Person;
  showBox=false;
  constructor(private dataService: DataService, private cookie: CookieService) {}


  showUpdatePerson(id:number){
    var i=new Person;
    this.uItems=this.items;
    var j;
    for(var k=0; k<this.uItems.length; k++){
      if(this.uItems[k].person_id==id){
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

  updatePerson(){
    this.dataService.updatePerson(this.uItem.person_id, this.uItem)
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
  getPersons() {
    return this.dataService.getPerson().then( items => this.x = items)
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
    this.getPersons();
  }

}
