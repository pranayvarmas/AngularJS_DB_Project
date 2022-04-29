import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../login.service';
import { DpFeedback } from '../dp_feedback';
import { ActivatedRoute, Params } from '@angular/router';
// import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dp-feedback',
  templateUrl: './dp-feedback.component.html',
  styleUrls: ['./dp-feedback.component.css']
})
export class DpFeedbackComponent implements OnInit {
  dpf=new DpFeedback;
  dp_id=0;
  order_id=0;
  submitted=false;
  constructor(private route: ActivatedRoute,private dataService: DataService, private cookie: CookieService, private loginService: LoginService) {}

  onSubmit(){
    this.dpf.person_id=parseInt(this.cookie.get('person_id'));
    this.dpf.dp_id=this.dp_id;
    this.dpf.on_order_id=this.order_id;
    this.dataService.dpFeedback(this.dpf)
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
      this.dp_id=params['id'];
      this.order_id=params['order_id'];
    })
    // .subscribe(customer => this.customer = customer);
  }

}
