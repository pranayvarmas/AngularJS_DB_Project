import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../login.service';
import { DpFeedback } from '../dp_feedback';
import { ItemFeedback } from '../item_feedback';
import { ActivatedRoute, Params } from '@angular/router';
// import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-item-feedback',
  templateUrl: './item-feedback.component.html',
  styleUrls: ['./item-feedback.component.css']
})
export class ItemFeedbackComponent implements OnInit {
  itemf=new ItemFeedback;
  item_id=0;
  order_id=0;
  submitted=false;
  constructor(private route: ActivatedRoute,private dataService: DataService, private cookie: CookieService, private loginService: LoginService) {}

  onSubmit(){
    this.itemf.person_id=parseInt(this.cookie.get('person_id'));
    this.itemf.item_id=this.item_id;
    this.itemf.on_order_id=this.order_id;
    this.dataService.itemFeedback(this.itemf)
    .then(response =>{
      var y=JSON.parse(JSON.stringify(response));
      if(y.success==true){
        alert("Submitted");
        this.submitted=true;
      }
      else{
        alert("Error");
      }
    })
  }
  ngOnInit(): void {
    this.route.params
    .subscribe((params: Params) => {
      this.item_id=params['id'];
      this.order_id=params['order_id'];
    })
    // .subscribe(customer => this.customer = customer);
  }

}
