import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Ingredient} from '../ingredient';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-show-ingredients',
  templateUrl: './show-ingredients.component.html',
  styleUrls: ['./show-ingredients.component.css']
})
export class ShowIngredientsComponent implements OnInit {

  items: Ingredient[]=[]
  uItems: Ingredient[]=[]
  x="";
  uItem=new Ingredient;
  showBox=false;
  constructor(private dataService: DataService, private cookie: CookieService) {}
  showUpdateIngredient(id:number){
    var i=new Ingredient;
    this.uItems=this.items;
    var j;
    for(var k=0; k<this.uItems.length; k++){
      if(this.uItems[k].ing_id==id){
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

  updateIngredient(){
    this.dataService.updateIngredient(this.uItem.ing_id, this.uItem)
    .then(response =>{
      var y=JSON.parse(JSON.stringify(response));
      if(y.success==true){
        alert("Updated");
        this.showBox=false;
      }
      else{
        alert("Error");
        console.log("adaddadad");
      }
    })
    // this.showBox=false;
  }
  getIngredients() {
    return this.dataService.getIngredients().then( items => this.x = items)
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
    this.getIngredients();
  }

}
