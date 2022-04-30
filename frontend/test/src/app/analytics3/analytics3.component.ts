import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Item } from '../item';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../login.service';
import { ChartConfiguration } from 'chart.js';
import { ChartType } from 'ng-apexcharts';

@Component({
  selector: 'app-analytics3',
  templateUrl: './analytics3.component.html',
  styleUrls: ['./analytics3.component.css']
})
export class Analytics3Component implements OnInit {
  items: Item[]=[]
  uItems: Item[]=[]
  date:any;
  x="";
  left:number[]=[]
  right:number[]=[];
  x1=1;x2=1;x3=0;x4=0;x5=0;
  // showitem=false;
  uItem=new Item;
  showBox=false;
  out1:any;
  // chartData:any;
  labels=this.left;
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
          text:'Quantity'
        }
      },
      y:{
        title:{
          display:true,
          text:'Items sold'
        }
      }
    }
  };
  public lineChartType:ChartType='line';
  constructor(private dataService: DataService, private cookie: CookieService, private loginService: LoginService) {}


//Initializing Primary X Axis

  getAnalytics3() {
    return this.dataService.getAnalytics1()
    .then(response => {
      var y=JSON.parse(JSON.stringify(response));
      this.out1=y.data;
      console.log(this.out1);
      for (var k=0; k<this.out1.length; k++){
        this.date=this.out1[k]['order_date'];
        var u=this.out1[k]['item_name'];
        this.left.push(u);
        this.right.push(this.out1[k]['total']);

      }
      this.lineChartData={
        datasets:[
          {
          data:this.right,
          label: "Items Quantity",
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
     this.getAnalytics3();
  }


}
