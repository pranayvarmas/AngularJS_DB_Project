// import { Time } from "@angular/common";
// import { Timestamp } from "rxjs-compat";

export class CouponsUsers {
  coupon_id:number = 0;
  coupon_txt: string = "";
  coupon_type: string = "";
  availability: number = 0;
  start_date: Date = new Date();
  end_date: Date = new Date();
  is_used:boolean = false;
  use_date: Date = new Date();
  // use_time: Time = new Timestamp.Get();
}
