import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Item } from '../item';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-show-items',
  templateUrl: './show-items.component.html',
  styleUrls: ['./show-items.component.css']
})
export class ShowItemsComponent implements OnInit {
  items: Item[]=[]
  items1:Item[]=[]
  uItems: Item[]=[]
  x="";
  showed=false;
  showitem=false;
  uItem=new Item;
  showBox=false;
  constructor(private dataService: DataService, private cookie: CookieService, private loginService: LoginService) {}


  showUpdateItem(id:number){
    var i=new Item;
    this.uItems=this.items;
    var j;
    this.showitem=true;
    for(var k=0; k<this.uItems.length; k++){
      if(this.uItems[k].item_id==id){
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

  updateItem(){
    this.dataService.updateItem(this.uItem.item_id, this.uItem)
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
  show_all(){
    this.items1=this.items;
  }
  show_f(){
    this.items1=[];
    for(var k=0; k<this.items.length; k++){
      if(this.items[k]['item_type']=="food"){
        this.items1.push(this.items[k]);
      }
    }
  }
  show_b(){
    this.items1=[];
    for(var k=0; k<this.items.length; k++){
      if(this.items[k]['item_type']=="bevarage"){
        this.items1.push(this.items[k]);
      }
    }
  }
  deleteItem(id:number){
    this.dataService.deleteItem(id)
    .then(response =>{
      var y=JSON.parse(JSON.stringify(response));
      if(y.success==true){
        alert("Deleted");
        // this.submitted=true;
      }
      else{
        alert("Error");
      }
    })
  }
  getItems() {
    return this.dataService.getItems().then( items => this.x = items)
    .then(response => {
      var y=JSON.parse(JSON.stringify(response));
      if(y.itemsExists==true){
        this.items=y.data;
        this.items1=this.items;
      }
      else if(y.itemsExists==false){
        alert("No Items are available");
      }
      else{
        console.log("empty");
      }
    })
  }
  itemToCart(id:number, quantity:number){
    this.dataService.itemToCart(parseInt(this.cookie.get('person_id')), id, quantity)
    .then(response =>{
      var y=JSON.parse(JSON.stringify(response));
      if(y.success==true){
        alert("Added");
      }
      else{
        alert("Error");
      }
    })
  }

  ngOnInit(): void {
    this.loginService.checkLoginFromDashboard();
     this.getItems();
     var d=this.cookie.get('person_type');
     if(d=="Kitchen Manager" || d=="General Manager" || d=="Super User"){
       this.showed=true;
     }
  }


}
