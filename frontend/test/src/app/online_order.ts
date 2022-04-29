export class OnlineOrder {
  on_order_id: number = 0;
  quantity: number = 0;
  person_id: number = 0;
  order_price: number = 0;
  order_date: Date = new Date();
  delivery_address:number=0;
  is_delivered:boolean=false;
  is_cancelled:boolean=false;
  estimated_time:number=0;
  dp_id:number=0;
  delivery_date:Date=new Date();
  // order_time: numbe = 0;

}
