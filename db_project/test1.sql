INSERT INTO ingredients(ing_id,ing_name,availability,price) VALUES (1,'Prunes',0,494);
INSERT INTO ingredients(ing_id,ing_name,availability,price) VALUES (2,'Lychees',4,74);
INSERT INTO ingredients(ing_id,ing_name,availability,price) VALUES (3,'Enoki Mushrooms',0,298);
INSERT INTO ingredients(ing_id,ing_name,availability,price) VALUES (4,'Shark',5,442);
INSERT INTO ingredients(ing_id,ing_name,availability,price) VALUES (5,'Mahi mahi',0,306);
INSERT INTO ingredients(ing_id,ing_name,availability,price) VALUES (6,'Achacha',8,180);
INSERT INTO ingredients(ing_id,ing_name,availability,price) VALUES (7,'Quark Quinc',3,427);
INSERT INTO ingredients(ing_id,ing_name,availability,price) VALUES (8,'Kokam',9,41);
INSERT INTO ingredients(ing_id,ing_name,availability,price) VALUES (9,'Corn Syrup',7,78);
INSERT INTO persons(person_id,person_name,person_type,type_from,type_to,email,password,salary,address,phone_no) VALUES (1,'Kenneth Jones','Base Customer','2012-09-22','2013-10-22','markmiller@example.com','password1',26658,1,8376444605);
INSERT INTO persons(person_id,person_name,person_type,type_from,type_to,email,password,salary,address,phone_no) VALUES (2,'Jordan Hartman','Chef','2012-12-19','2013-12-19','kylejordan@example.org','password3',16034,2,9661415733);
INSERT INTO persons(person_id,person_name,person_type,type_from,type_to,email,password,salary,address,phone_no) VALUES (3,'Jeffrey Rivas','Premium Customer','2012-12-19','2013-09-22','baileyvanessa@example.org','password2',20031,3,8231994561);
INSERT INTO persons(person_id,person_name,person_type,type_from,type_to,email,password,salary,address,phone_no) VALUES (4,'Jacob Mccoy','Base Customer','2012-10-22','2013-10-22','selena97@example.com','password3',46212,4,9863810212);
INSERT INTO persons(person_id,person_name,person_type,type_from,type_to,email,password,salary,address,phone_no) VALUES (5,'Nathan Hubbard','Food Server','2012-01-12','2013-10-22','charlessanchez@example.org','password2',16585,5,8819154703);
INSERT INTO persons(person_id,person_name,person_type,type_from,type_to,email,password,salary,address,phone_no) VALUES (6,'James Crawford','Food Server','2012-12-19','2013-01-12','robin88@example.net','password1',35128,6,8494025756);
INSERT INTO persons(person_id,person_name,person_type,type_from,type_to,email,password,salary,address,phone_no) VALUES (7,'Jorge Nguyen','Delivery Person','2012-09-22','2013-10-22','herrerabarbara@example.com','password2',48009,7,8061662658);
INSERT INTO persons(person_id,person_name,person_type,type_from,type_to,email,password,salary,address,phone_no) VALUES (8,'Michelle Ortega','Delivery Person','2012-09-22','2013-09-22','hudsoncory@example.com','password1',45439,8,7201898511);
INSERT INTO persons(person_id,person_name,person_type,type_from,type_to,email,password,salary,address,phone_no) VALUES (9,'Crystal Owens','Chef','2012-10-22','2013-09-22','brian05@example.com','password3',35349,9,8071940218);
INSERT INTO purchases(purchase_id,quantity,purchase_name,purchase_date,purchase_time) VALUES (1,6,'merchant','2012-10-22','02:02:09');
INSERT INTO purchases(purchase_id,quantity,purchase_name,purchase_date,purchase_time) VALUES (2,5,'merchant','2012-09-22','12:54:22');
INSERT INTO purchases(purchase_id,quantity,purchase_name,purchase_date,purchase_time) VALUES (3,8,'wholesale','2012-01-12','02:02:09');
INSERT INTO purchases(purchase_id,quantity,purchase_name,purchase_date,purchase_time) VALUES (4,5,'wholesale','2012-10-22','23:45:32');
INSERT INTO purchases(purchase_id,quantity,purchase_name,purchase_date,purchase_time) VALUES (5,5,'merchant','2012-01-12','02:02:09');
INSERT INTO purchases(purchase_id,quantity,purchase_name,purchase_date,purchase_time) VALUES (6,2,'wholesale','2012-12-19','13:55:12');
INSERT INTO purchases(purchase_id,quantity,purchase_name,purchase_date,purchase_time) VALUES (7,7,'merchant','2012-09-22','02:02:09');
INSERT INTO purchases(purchase_id,quantity,purchase_name,purchase_date,purchase_time) VALUES (8,5,'merchant','2012-09-22','13:55:12');
INSERT INTO purchases(purchase_id,quantity,purchase_name,purchase_date,purchase_time) VALUES (9,7,'merchant','2012-10-22','12:54:22');
INSERT INTO tables(table_id,table_type,capacity,price) VALUES (1,'Normal',7,359);
INSERT INTO tables(table_id,table_type,capacity,price) VALUES (2,'Booth',9,152);
INSERT INTO tables(table_id,table_type,capacity,price) VALUES (3,'Booth',3,59);
INSERT INTO tables(table_id,table_type,capacity,price) VALUES (4,'Family',6,174);
INSERT INTO tables(table_id,table_type,capacity,price) VALUES (5,'Outdoor',4,471);
INSERT INTO tables(table_id,table_type,capacity,price) VALUES (6,'Booth',2,269);
INSERT INTO tables(table_id,table_type,capacity,price) VALUES (7,'Booth',4,20);
INSERT INTO tables(table_id,table_type,capacity,price) VALUES (8,'Family',8,391);
INSERT INTO tables(table_id,table_type,capacity,price) VALUES (9,'Outdoor',4,350);
INSERT INTO delivery_persons(dp_id,dp_name,rating,primary_no,salary,secondary_no,phone_no) VALUES (1,'Tracy Winters',3,1,47109,2,9453767039);
INSERT INTO delivery_persons(dp_id,dp_name,rating,primary_no,salary,secondary_no,phone_no) VALUES (2,'Margaret Perez',0,1,36522,9,9488478657);
INSERT INTO delivery_persons(dp_id,dp_name,rating,primary_no,salary,secondary_no,phone_no) VALUES (3,'Tammy Phillips',1,5,36209,3,8238263096);
INSERT INTO delivery_persons(dp_id,dp_name,rating,primary_no,salary,secondary_no,phone_no) VALUES (4,'Alyssa Davis',0,1,42666,9,7924412108);
INSERT INTO delivery_persons(dp_id,dp_name,rating,primary_no,salary,secondary_no,phone_no) VALUES (5,'Mark Best',2,1,31673,7,9039347338);
INSERT INTO delivery_persons(dp_id,dp_name,rating,primary_no,salary,secondary_no,phone_no) VALUES (6,'David Houston',3,5,15563,3,9245674466);
INSERT INTO delivery_persons(dp_id,dp_name,rating,primary_no,salary,secondary_no,phone_no) VALUES (7,'Timothy Lee',3,8,38543,2,9232974578);
INSERT INTO delivery_persons(dp_id,dp_name,rating,primary_no,salary,secondary_no,phone_no) VALUES (8,'Amber Sweeney',4,1,37747,9,8370739855);
INSERT INTO delivery_persons(dp_id,dp_name,rating,primary_no,salary,secondary_no,phone_no) VALUES (9,'Jennifer Medina',2,5,22022,4,9953703113);
INSERT INTO item_feedback(item_f_id,item_id,person_id,feedback_txt,suggestions,rating) VALUES (1,1,7,'Bad','Bad process',0);
INSERT INTO item_feedback(item_f_id,item_id,person_id,feedback_txt,suggestions,rating) VALUES (2,2,7,'Bad','Found better option',4);
INSERT INTO item_feedback(item_f_id,item_id,person_id,feedback_txt,suggestions,rating) VALUES (3,3,1,'Excellent','Not liked',5);
INSERT INTO item_feedback(item_f_id,item_id,person_id,feedback_txt,suggestions,rating) VALUES (4,4,2,'Good','Found better option',5);
INSERT INTO item_feedback(item_f_id,item_id,person_id,feedback_txt,suggestions,rating) VALUES (5,5,6,'Excellent','Long time',4);
INSERT INTO item_feedback(item_f_id,item_id,person_id,feedback_txt,suggestions,rating) VALUES (6,6,5,'Good','Not liked',4);
INSERT INTO item_feedback(item_f_id,item_id,person_id,feedback_txt,suggestions,rating) VALUES (7,7,2,'Excellent','Not liked',1);
INSERT INTO item_feedback(item_f_id,item_id,person_id,feedback_txt,suggestions,rating) VALUES (8,8,2,'Bad','Bad process',2);
INSERT INTO item_feedback(item_f_id,item_id,person_id,feedback_txt,suggestions,rating) VALUES (9,9,1,'Bad','Bad process',2);
INSERT INTO dp_feedback(dp_f_id,dp_id,person_id,feedback_txt,suggestions,rating) VALUES (1,1,7,'Bad','Bad process',1);
INSERT INTO dp_feedback(dp_f_id,dp_id,person_id,feedback_txt,suggestions,rating) VALUES (2,2,4,'Good','Not liked',1);
INSERT INTO dp_feedback(dp_f_id,dp_id,person_id,feedback_txt,suggestions,rating) VALUES (3,3,7,'Good','Bad process',1);
INSERT INTO dp_feedback(dp_f_id,dp_id,person_id,feedback_txt,suggestions,rating) VALUES (4,4,4,'Bad','Not liked',1);
INSERT INTO dp_feedback(dp_f_id,dp_id,person_id,feedback_txt,suggestions,rating) VALUES (5,5,9,'Average','Found better option',4);
INSERT INTO dp_feedback(dp_f_id,dp_id,person_id,feedback_txt,suggestions,rating) VALUES (6,6,4,'Bad','Bad process',4);
INSERT INTO dp_feedback(dp_f_id,dp_id,person_id,feedback_txt,suggestions,rating) VALUES (7,7,4,'Average','Long time',2);
INSERT INTO dp_feedback(dp_f_id,dp_id,person_id,feedback_txt,suggestions,rating) VALUES (8,8,2,'Excellent','Found better option',1);
INSERT INTO dp_feedback(dp_f_id,dp_id,person_id,feedback_txt,suggestions,rating) VALUES (9,9,5,'Good','Not liked',0);
INSERT INTO offline_orders(off_order_id,quantity,order_price,order_date,order_time) VALUES (1,8,219,'2012-09-22','13:55:12');
INSERT INTO offline_orders(off_order_id,quantity,order_price,order_date,order_time) VALUES (2,8,697,'2012-01-12','13:55:12');
INSERT INTO offline_orders(off_order_id,quantity,order_price,order_date,order_time) VALUES (3,7,744,'2012-01-12','13:55:12');
INSERT INTO offline_orders(off_order_id,quantity,order_price,order_date,order_time) VALUES (4,1,115,'2012-12-19','13:55:12');
INSERT INTO offline_orders(off_order_id,quantity,order_price,order_date,order_time) VALUES (5,8,63,'2012-12-19','13:55:12');
INSERT INTO offline_orders(off_order_id,quantity,order_price,order_date,order_time) VALUES (6,4,596,'2012-12-19','02:02:09');
INSERT INTO offline_orders(off_order_id,quantity,order_price,order_date,order_time) VALUES (7,3,509,'2012-10-22','23:45:32');
INSERT INTO offline_orders(off_order_id,quantity,order_price,order_date,order_time) VALUES (8,7,854,'2012-10-22','02:02:09');
INSERT INTO offline_orders(off_order_id,quantity,order_price,order_date,order_time) VALUES (9,7,101,'2012-01-12','12:54:22');
INSERT INTO online_orders(on_order_id,quantity,person_id,dp_feedback,item_feedback,order_price,order_date,order_time,delivery_address,is_delivered,is_cancelled,estimated_time,dp_id,delivery_date,delivery_time) VALUES (1,9,7,False,False,432,'2012-09-22','23:45:32',7,True,False,'14:55:12',6,'2012-12-20','03:03:09');
INSERT INTO online_orders(on_order_id,quantity,person_id,dp_feedback,item_feedback,order_price,order_date,order_time,delivery_address,is_delivered,is_cancelled,estimated_time,dp_id,delivery_date,delivery_time) VALUES (2,5,9,False,False,380,'2012-10-22','23:45:32',9,True,False,'23:50:32',6,'2012-10-23','14:55:12');
INSERT INTO online_orders(on_order_id,quantity,person_id,dp_feedback,item_feedback,order_price,order_date,order_time,delivery_address,is_delivered,is_cancelled,estimated_time,dp_id,delivery_date,delivery_time) VALUES (3,4,5,False,False,488,'2012-12-19','13:55:12',5,True,False,'03:03:09',4,'2012-12-20','13:53:22');
INSERT INTO online_orders(on_order_id,quantity,person_id,dp_feedback,item_feedback,order_price,order_date,order_time,delivery_address,is_delivered,is_cancelled,estimated_time,dp_id,delivery_date,delivery_time) VALUES (4,4,8,False,False,351,'2012-01-12','12:54:22',8,True,False,'13:53:22',1,'2012-12-20','23:50:32');
INSERT INTO online_orders(on_order_id,quantity,person_id,dp_feedback,item_feedback,order_price,order_date,order_time,delivery_address,is_delivered,is_cancelled,estimated_time,dp_id,delivery_date,delivery_time) VALUES (5,2,5,False,False,857,'2012-10-22','12:54:22',5,True,False,'13:53:22',4,'2012-12-20','13:53:22');
INSERT INTO online_orders(on_order_id,quantity,person_id,dp_feedback,item_feedback,order_price,order_date,order_time,delivery_address,is_delivered,is_cancelled,estimated_time,dp_id,delivery_date,delivery_time) VALUES (6,9,7,False,False,565,'2012-09-22','12:54:22',7,True,False,'03:03:09',2,'2012-12-20','13:53:22');
INSERT INTO online_orders(on_order_id,quantity,person_id,dp_feedback,item_feedback,order_price,order_date,order_time,delivery_address,is_delivered,is_cancelled,estimated_time,dp_id,delivery_date,delivery_time) VALUES (7,1,4,False,False,895,'2012-09-22','13:55:12',4,True,False,'13:53:22',6,'2012-10-23','13:53:22');
INSERT INTO online_orders(on_order_id,quantity,person_id,dp_feedback,item_feedback,order_price,order_date,order_time,delivery_address,is_delivered,is_cancelled,estimated_time,dp_id,delivery_date,delivery_time) VALUES (8,8,4,False,False,130,'2012-10-22','23:45:32',4,True,False,'23:50:32',1,'2012-01-13','13:53:22');
INSERT INTO online_orders(on_order_id,quantity,person_id,dp_feedback,item_feedback,order_price,order_date,order_time,delivery_address,is_delivered,is_cancelled,estimated_time,dp_id,delivery_date,delivery_time) VALUES (9,4,5,False,False,340,'2012-09-22','12:54:22',5,True,False,'14:55:12',5,'2012-01-13','23:50:32');
INSERT INTO coupons(coupon_id,coupon_txt,coupon_type,availability,start_date,end_date) VALUES (1,'Free Discount','free',2,'2012-09-22','2013-09-22');
INSERT INTO coupons(coupon_id,coupon_txt,coupon_type,availability,start_date,end_date) VALUES (2,'Bug 2 get 1','premium',9,'2012-12-19','2013-12-19');
INSERT INTO coupons(coupon_id,coupon_txt,coupon_type,availability,start_date,end_date) VALUES (3,'Bug 2 get 1','free',5,'2012-01-12','2013-10-22');
INSERT INTO coupons(coupon_id,coupon_txt,coupon_type,availability,start_date,end_date) VALUES (4,'Free Discount','free',1,'2012-10-22','2013-10-22');
INSERT INTO coupons(coupon_id,coupon_txt,coupon_type,availability,start_date,end_date) VALUES (5,'Bug 2 get 1','free',9,'2012-10-22','2013-12-19');
INSERT INTO coupons(coupon_id,coupon_txt,coupon_type,availability,start_date,end_date) VALUES (6,'Bug 2 get 1','free',1,'2012-09-22','2013-10-22');
INSERT INTO coupons(coupon_id,coupon_txt,coupon_type,availability,start_date,end_date) VALUES (7,'50 discount','free',2,'2012-10-22','2013-10-22');
INSERT INTO coupons(coupon_id,coupon_txt,coupon_type,availability,start_date,end_date) VALUES (8,'Bug 2 get 1','premium',1,'2012-09-22','2013-01-12');
INSERT INTO coupons(coupon_id,coupon_txt,coupon_type,availability,start_date,end_date) VALUES (9,'Bug 2 get 1','free',3,'2012-12-19','2013-10-22');
INSERT INTO cancellations(c_id,on_order_id,c_reason,date,time) VALUES (1,6,'Bad process','2012-10-22','02:02:09');
INSERT INTO cancellations(c_id,on_order_id,c_reason,date,time) VALUES (2,3,'Bad process','2012-01-12','13:55:12');
INSERT INTO cancellations(c_id,on_order_id,c_reason,date,time) VALUES (3,3,'Not liked','2012-09-22','13:55:12');
INSERT INTO cancellations(c_id,on_order_id,c_reason,date,time) VALUES (4,6,'Found better option','2012-12-19','02:02:09');
INSERT INTO cancellations(c_id,on_order_id,c_reason,date,time) VALUES (5,8,'Long time','2012-01-12','13:55:12');
INSERT INTO cancellations(c_id,on_order_id,c_reason,date,time) VALUES (6,8,'Found better option','2012-12-19','12:54:22');
INSERT INTO cancellations(c_id,on_order_id,c_reason,date,time) VALUES (7,2,'Bad process','2012-09-22','23:45:32');
INSERT INTO cancellations(c_id,on_order_id,c_reason,date,time) VALUES (8,8,'Not liked','2012-12-19','23:45:32');
INSERT INTO cancellations(c_id,on_order_id,c_reason,date,time) VALUES (9,9,'Long time','2012-10-22','23:45:32');
INSERT INTO item_ing(item_id,ing_id,quantity) VALUES (1,1,2);
INSERT INTO item_ing(item_id,ing_id,quantity) VALUES (1,2,1);
INSERT INTO item_ing(item_id,ing_id,quantity) VALUES (2,1,2);
INSERT INTO item_ing(item_id,ing_id,quantity) VALUES (2,2,4);
INSERT INTO item_ing(item_id,ing_id,quantity) VALUES (3,1,4);
INSERT INTO item_ing(item_id,ing_id,quantity) VALUES (3,2,2);
INSERT INTO item_ing(item_id,ing_id,quantity) VALUES (4,4,4);
INSERT INTO item_ing(item_id,ing_id,quantity) VALUES (4,5,1);
INSERT INTO item_ing(item_id,ing_id,quantity) VALUES (5,3,2);
INSERT INTO item_ing(item_id,ing_id,quantity) VALUES (5,4,4);
INSERT INTO item_ing(item_id,ing_id,quantity) VALUES (6,3,4);
INSERT INTO item_ing(item_id,ing_id,quantity) VALUES (6,4,1);
INSERT INTO item_ing(item_id,ing_id,quantity) VALUES (7,5,2);
INSERT INTO item_ing(item_id,ing_id,quantity) VALUES (7,6,2);
INSERT INTO item_ing(item_id,ing_id,quantity) VALUES (8,1,1);
INSERT INTO item_ing(item_id,ing_id,quantity) VALUES (8,2,2);
INSERT INTO item_ing(item_id,ing_id,quantity) VALUES (9,3,2);
INSERT INTO item_ing(item_id,ing_id,quantity) VALUES (9,4,1);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (1,3,3);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (1,4,4);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (1,5,3);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (1,6,4);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (1,7,2);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (2,3,5);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (2,4,1);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (2,5,1);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (2,6,2);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (2,7,2);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (3,1,1);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (3,2,4);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (3,3,4);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (3,4,1);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (3,5,5);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (4,5,3);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (4,6,5);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (4,7,2);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (4,8,1);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (4,9,3);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (5,6,4);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (5,7,4);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (5,8,2);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (5,9,1);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (5,10,5);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (6,2,1);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (6,3,2);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (6,4,1);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (6,5,2);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (6,6,2);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (7,5,2);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (7,6,3);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (7,7,2);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (7,8,1);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (7,9,1);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (8,5,1);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (8,6,1);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (8,7,2);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (8,8,2);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (8,9,4);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (9,6,3);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (9,7,3);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (9,8,4);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (9,9,2);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (9,10,3);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (1,5,5);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (1,6,3);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (1,7,1);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (1,8,3);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (1,9,3);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (2,2,2);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (2,3,3);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (2,4,5);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (2,5,4);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (2,6,3);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (3,4,5);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (3,5,5);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (3,6,3);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (3,7,3);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (3,8,4);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (4,3,3);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (4,4,1);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (4,5,5);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (4,6,2);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (4,7,2);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (5,4,2);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (5,5,2);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (5,6,1);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (5,7,4);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (5,8,2);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (6,2,2);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (6,3,1);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (6,4,2);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (6,5,4);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (6,6,4);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (7,2,3);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (7,3,3);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (7,4,5);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (7,5,5);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (7,6,4);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (8,2,2);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (8,3,3);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (8,4,1);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (8,5,3);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (8,6,2);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (9,1,1);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (9,2,4);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (9,3,5);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (9,4,5);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (9,5,5);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (1,6,4);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (1,7,5);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (1,8,4);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (1,9,2);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (1,10,1);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (2,3,2);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (2,4,1);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (2,5,2);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (2,6,5);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (2,7,2);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (3,3,3);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (3,4,5);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (3,5,1);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (3,6,4);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (3,7,4);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (4,5,4);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (4,6,2);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (4,7,4);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (4,8,1);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (4,9,3);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (5,5,5);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (5,6,1);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (5,7,5);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (5,8,2);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (5,9,3);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (6,6,1);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (6,7,1);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (6,8,4);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (6,9,1);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (6,10,1);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (7,3,3);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (7,4,5);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (7,5,5);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (7,6,1);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (7,7,4);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (8,3,4);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (8,4,2);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (8,5,5);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (8,6,1);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (8,7,5);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (9,3,1);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (9,4,3);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (9,5,1);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (9,6,3);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (9,7,2);
INSERT INTO coupons_users(coupon_id,person_id,use_date,use_time,is_used) VALUES (1,5,'2012-09-22','23:45:32',True);
INSERT INTO coupons_users(coupon_id,person_id,use_date,use_time,is_used) VALUES (2,7,'2012-12-19','23:45:32',True);
INSERT INTO coupons_users(coupon_id,person_id,use_date,use_time,is_used) VALUES (3,2,'2012-09-22','02:02:09',True);
INSERT INTO coupons_users(coupon_id,person_id,use_date,use_time,is_used) VALUES (4,4,'2012-10-22','23:45:32',True);
INSERT INTO coupons_users(coupon_id,person_id,use_date,use_time,is_used) VALUES (5,4,'2012-09-22','12:54:22',True);
INSERT INTO coupons_users(coupon_id,person_id,use_date,use_time,is_used) VALUES (6,1,'2012-10-22','02:02:09',True);
INSERT INTO coupons_users(coupon_id,person_id,use_date,use_time,is_used) VALUES (7,3,'2012-01-12','23:45:32',True);
INSERT INTO coupons_users(coupon_id,person_id,use_date,use_time,is_used) VALUES (8,7,'2012-09-22','02:02:09',True);
INSERT INTO coupons_users(coupon_id,person_id,use_date,use_time,is_used) VALUES (9,1,'2012-09-22','12:54:22',True);
INSERT INTO book_tables(booking_id,table_id,person_id,booking_date,slot) VALUES (1,4,5,'2012-01-12',9);
INSERT INTO book_tables(booking_id,table_id,person_id,booking_date,slot) VALUES (2,8,2,'2012-01-12',9);
INSERT INTO book_tables(booking_id,table_id,person_id,booking_date,slot) VALUES (3,3,7,'2012-01-12',6);
INSERT INTO book_tables(booking_id,table_id,person_id,booking_date,slot) VALUES (4,8,2,'2012-10-22',9);
INSERT INTO book_tables(booking_id,table_id,person_id,booking_date,slot) VALUES (5,6,3,'2012-01-12',12);
INSERT INTO book_tables(booking_id,table_id,person_id,booking_date,slot) VALUES (6,2,3,'2012-01-12',6);
INSERT INTO book_tables(booking_id,table_id,person_id,booking_date,slot) VALUES (7,9,3,'2012-10-22',2);
INSERT INTO book_tables(booking_id,table_id,person_id,booking_date,slot) VALUES (8,5,8,'2012-09-22',9);
INSERT INTO book_tables(booking_id,table_id,person_id,booking_date,slot) VALUES (9,5,2,'2012-01-12',7);
