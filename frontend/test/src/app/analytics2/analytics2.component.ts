import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Item } from '../item';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../login.service';
import { ChartConfiguration } from 'chart.js';
import { ChartType } from 'ng-apexcharts';

@Component({
  selector: 'app-analytics2',
  templateUrl: './analytics2.component.html',
  styleUrls: ['./analytics2.component.css']
})
export class Analytics2Component implements OnInit {
  items: Item[]=[]
  uItems: Item[]=[]
  x="";
  x1=1;x2=1;x3=0;x4=0;x5=0;
  // showitem=false;
  uItem=new Item;
  showBox=false;
  out1:any;
  // chartData:any;
  labels: string[]=['0-1', '1-2', '2-3', '3-4', '4-5'];
  public lineChartData: ChartConfiguration['data'] | undefined;
  public lineChartOptions: ChartConfiguration['options']={
    elements:{
      line:{
        tension:0
      }
    },
    scales:{
      x:{
        title:{
          display:true,
          text:'Rating'
        }
      },
      y:{
        title:{
          display:true,
          text:'Users with rating'
        }
      }
    }
  };
  public lineChartType:ChartType='line';
  constructor(private dataService: DataService, private cookie: CookieService, private loginService: LoginService) {}


//Initializing Primary X Axis

  getAnalytics2() {
    return this.dataService.getAnalytics1()
    .then(response => {
      var y=JSON.parse(JSON.stringify(response));
      this.out1=y.data;
      console.log(this.out1);
      for(var k=0; k<this.out1.length; k++){
        var t=this.out1[k]['rating'];
        if(t>=0 && t<1){
          this.x1=this.x1+1;
        }
        else if(t>=1 && t<2){
          this.x2=this.x2+1;
        }
        else if(t>=2 && t<3){
          this.x3=this.x3+1;
        }else if(t>=3 && t<4){
          this.x4=this.x4+1;
        }else if(t>=4 && t<=5){
          this.x5=this.x5+1;
        }
      }
      this.lineChartData={
        datasets:[
          {
          data:[this.x1, this.x2, this.x3, this.x4, this.x5],
          label: "Users with rating",
          pointRadius:1,
          },
        ],
      labels: this.labels
      }
      // console.log("completed");
    })
  }

  ngOnInit(): void {
    this.loginService.checkLoginFromDashboard();
     this.getAnalytics2();
  }


}
