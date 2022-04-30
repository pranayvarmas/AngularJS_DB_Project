DROP TABLE IF EXISTS items Cascade;
DROP TABLE IF EXISTS ingredients Cascade;
DROP TABLE IF EXISTS persons Cascade;
DROP TABLE IF EXISTS purchases Cascade;
DROP TABLE IF EXISTS tables Cascade;
DROP TABLE IF EXISTS delivery_persons Cascade;
DROP TABLE IF EXISTS item_feedback Cascade;
DROP TABLE IF EXISTS dp_feedback Cascade;
DROP TABLE IF EXISTS offline_orders Cascade;
DROP TABLE IF EXISTS online_orders Cascade;
DROP TABLE IF EXISTS coupons Cascade;
DROP TABLE IF EXISTS cancellations Cascade;
DROP TABLE IF EXISTS item_ing Cascade;
DROP TABLE IF EXISTS pur_ing Cascade;
DROP TABLE IF EXISTS offline_items Cascade;
DROP TABLE IF EXISTS online_items Cascade;
DROP TABLE IF EXISTS coupons_users Cascade;
DROP TABLE IF EXISTS book_tables Cascade;
--------Item information-------
CREATE TABLE items (
  item_id INT,
  item_name TEXT,
  item_type TEXT,
  availability INT,
  price INT,
  PRIMARY KEY(item_id)
);
CREATE SEQUENCE items_seq START WITH 10 INCREMENT BY 1;
alter table items alter item_id set default nextval('items_seq');


------------Ingredients information-------
CREATE TABLE ingredients(
  ing_id INT,
  ing_name TEXT,
  availability INT,
  price INT,
  PRIMARY KEY(ing_id) 
);  
CREATE SEQUENCE ings_seq START WITH 10 INCREMENT BY 1;
alter table ingredients alter ing_id set default nextval('ings_seq');


---------------Persons information------------
CREATE TABLE persons (
 person_id INT,
 person_name TEXT,
 person_type TEXT,
 type_from DATE,
 type_to DATE,
 address INT,
 phone_no TEXT,
 salary INT,
 email TEXT,
 password TEXT,
 PRIMARY KEY(person_id)
);

CREATE SEQUENCE persons_seq START WITH 10 INCREMENT BY 1;
alter table persons alter person_id set default nextval('persons_seq');


CREATE TABLE spatial (
    id serial NOT NULL,
    name varchar(255) NOT NULL,
    location Point NOT NULL,
    PRIMARY KEY (id)
);
CREATE SEQUENCE id_seq START WITH 10 INCREMENT BY 1;
alter table spatial alter id set default nextval('id_seq');


----------Purchases information-----------------
CREATE TABLE purchases(
 purchase_id INT,
 purchase_name TEXT,
 purchase_date DATE,
 purchase_time TIME,
 quantity INT,
 PRIMARY  KEY(purchase_id)
);
CREATE SEQUENCE pur_seq START WITH 10 INCREMENT BY 1;
alter table purchases alter purchase_id set default nextval('pur_seq');
-------------Tables  information----------------
CREATE TABLE tables(
 table_id INT,
 table_type TEXT,
 capacity INT,
 price INT,
 PRIMARY KEY(table_id)
);
CREATE SEQUENCE tables_seq START WITH 10 INCREMENT BY 1;
alter table tables alter table_id set default nextval('tables_seq');


----------------delivery persons information-----------
CREATE TABLE delivery_persons(
 dp_id INT,
 dp_name TEXT,
 rating INT,
 primary_no INT,
 secondary_no INT,
 phone_no TEXT,
 availability BOOL,
 salary INT,
 PRIMARY KEY(dp_id)
);
CREATE SEQUENCE dp_seq START WITH 10 INCREMENT BY 1;
alter table delivery_persons alter dp_id set default nextval('dp_seq');
--------------Item feedback information-------------------
CREATE TABLE item_feedback(
 item_f_id INT,
 item_id INT,
 person_id INT,
 feedback_txt TEXT,
 suggestions TEXT,
 rating INT,
 PRIMARY KEY(item_f_id),
 FOREIGN KEY(item_id) references items on delete set null,
 FOREIGN KEY(person_id) references persons on delete set null
);
CREATE SEQUENCE if_seq START WITH 10 INCREMENT BY 1;
alter table item_feedback alter item_f_id set default nextval('if_seq');
--------------DP_feedback information-----------------------

CREATE TABLE dp_feedback(
  dp_f_id INT,
  dp_id INT,
  person_id INT,
  feedback_txt TEXT,
  suggestions TEXT,
  rating INT,
  PRIMARY KEY(dp_f_id),
  FOREIGN KEY(dp_id) references delivery_persons on delete set null,
  FOREIGN KEY(person_id) references persons on delete set null
);
CREATE SEQUENCE dpf_seq START WITH 10 INCREMENT BY 1;
alter table dp_feedback alter dp_f_id set default nextval('dpf_seq');
----------------offline orders information-----------
CREATE TABLE offline_orders(
  off_order_id INT,
  quantity INT,
  order_price INT,
  order_date DATE,
  order_time TIME,
  PRIMARY KEY(off_order_id)
);

CREATE SEQUENCE off_orders_seq START WITH 10 INCREMENT BY 1;
alter table offline_orders alter off_order_id set default nextval('off_orders_seq');


-----------online orders information-------------------
CREATE TABLE online_orders(
  on_order_id  INT,
  quantity   INT,
  person_id INT,
  order_price  INT,
  order_date  DATE,
  order_time  TIME,
  delivery_address  INT,
  is_delivered   BOOL,
  is_cancelled  BOOL,
  is_dp_feedback BOOL,
  is_item_feedback BOOL,
  estimated_time  INT,
  dp_id INT,
  delivery_date  DATE,
  delivery_time  TIME,
  PRIMARY KEY(on_order_id),
  FOREIGN KEY(person_id) references persons on delete set null,
  FOREIGN KEY(dp_id) references delivery_persons on delete set null
);
CREATE SEQUENCE on_orders_seq START WITH 10 INCREMENT BY 1;
alter table online_orders alter on_order_id set default nextval('on_orders_seq');

---------------coupons information--------------------
CREATE TABLE coupons(
 coupon_id INT,
 coupon_txt  TEXT,
 coupon_type TEXT,
 availability INT,
 start_date DATE,
 end_date  DATE,
 PRIMARY KEY(coupon_id)
);

CREATE SEQUENCE coupons_seq START WITH 10 INCREMENT BY 1;
alter table coupons alter coupon_id set default nextval('coupons_seq');



--------------------cancellations information-------------
CREATE TABLE cancellations(
  c_id INT,
  on_order_id INT,
  c_reason TEXT,
  date DATE,
  time TIME,
  PRIMARY KEY(c_id),
  FOREIGN KEY(on_order_id) references online_orders on delete set null
);
CREATE SEQUENCE can_seq START WITH 10 INCREMENT BY 1;
alter table cancellations alter c_id set default nextval('can_seq');
-----------------------------------------------------------------------------------------------
-----------------------------RELATIONS--------------------------
-----------------------------------------------------------------------------------------------
-------------item ingredients information------------------
CREATE TABLE item_ing(
  item_id INT,
  ing_id INT,
  quantity INT,
  PRIMARY KEY(item_id, ing_id),
  FOREIGN KEY(item_id) references items on delete set null,
  FOREIGN KEY(ing_id) references ingredients on delete set null
);

----------------Cart---------------------------------------

CREATE TABLE cart(
  person_id INT,
  item_id INT,
  quantity INT,
  PRIMARY KEY(person_id, item_id),
  FOREIGN KEY(person_id) references persons on delete set null,
  FOREIGN KEY(item_id) references items on delete set null
);

---------------Purchased ingredients-----------------------
CREATE TABLE pur_ing(
 purchase_id INT,
 ing_id INT,
 quantity INT,
 PRIMARY KEY(ing_id, purchase_id),
 FOREIGN KEY(purchase_id) references purchases on delete set null,
 FOREIGN KEY(ing_id) references ingredients on delete set null
);

--------------------Items sold to user-----------------------
-- CREATE TABLE items_sold(
--  item_id INT,
--  person_id INT,
--  quantity INT,
--  PRIMARY KEY(id),
--  FOREIGN KEY(item_id) references items on delete set null,
--  FOREIGN KEY(person_id) references persons on delete set null
-- );

-------------------Feedback of items-------------------------
-- CREATE TABLE feedback_of_items(
--   id INT,
--   item_f_id INT,
--   item_id  INT,
--   PRIMARY KEY(id),
--   FOREIGN KEY(item_id) references items on delete set null,
--   FOREIGN KEY(item_f_id) references item_feedback on delete set null

-- );
-----------------Feedback by user for items-------------------
-- CREATE TABLE feedback_by_user_items(
--   id INT,
--   item_f_id INT,
--   person_id INT,
--   PRIMARY KEY(id),
--   FOREIGN KEY(item_f_id) references item_feedback on delete set null,
--   FOREIGN KEY(person_id) references persons on delete set null

-- );
-------------------Feedback by user for deleivery persons-----------
-- CREATE TABLE feedback_by_user_dp(
--   id INT,
--   dp_f_id INT,
--   person_id INT,
--   PRIMARY KEY(id),
--   FOREIGN KEY(dp_f_id) references dp_feedback on delete set null,
--   FOREIGN KEY(person_id) references persons on delete set null

-- );


--------------------Feedback to delivery persons-----------------
-- CREATE TABLE feedback_to_dp(
--   id INT,
--   dp_f_id INT,
--   dp_id INT,
--   PRIMARY KEY(id),
--   FOREIGN KEY(dp_f_id) references dp_feedback on delete set null,
--   FOREIGN KEY(dp_id) references delivery_persons on delete set null

-- );

---------------------online ordered items--------------------------
CREATE TABLE online_items(
  on_order_id INT,
  item_id INT,
  quantity INT,
  PRIMARY KEY(on_order_id, item_id),
  FOREIGN KEY(on_order_id) references online_orders on delete set null,
  FOREIGN KEY(item_id) references items on delete set null
);
-------------------online ordered user-----------------------------
-- CREATE TABLE online_ordered_user(
--   id INT,
--   on_order_id INT,
--   person_id INT,
--   PRIMARY KEY(id),
--   FOREIGN KEY(on_order_id) references online_orders on delete set null,
--   FOREIGN KEY(person_id) references persons on delete set null

-- );

---------------online ordered by delivery person---------------------
-- CREATE TABLE online_ordered_dp(
--   id INT,
--   on_order_id INT,
--   dp_id INT,
--   PRIMARY KEY(id),
--   FOREIGN KEY(on_order_id) references online_orders on delete set null,
--   FOREIGN KEY(dp_id) references delivery_persons on delete set null
 
-- );

-----------------offline orders items-------------------------------
CREATE TABLE offline_items(
  off_order_id INT,
  item_id INT,
  quantity INT,
  PRIMARY KEY(off_order_id, item_id),
  FOREIGN KEY(off_order_id) references offline_orders on delete set null,
  FOREIGN KEY(item_id) references items on delete set null 
);
-------------------coupons for online customers-----------------------
CREATE TABLE coupons_users(
  coupon_id INT,
  person_id INT,
  use_date DATE,
  use_time TIME,
  is_used BOOL,
  PRIMARY KEY(coupon_id, person_id),
  FOREIGN KEY(coupon_id) references coupons on delete set null,
  FOREIGN KEY(person_id) references persons on delete set null
);
--------------------table booking for online users---------------------
CREATE TABLE book_tables(
  booking_id INT,
  table_id INT,
  person_id INT,
  booking_date DATE,
  slot INT,
  PRIMARY KEY(booking_id),
  FOREIGN KEY(table_id) references tables on delete set null,
  FOREIGN KEY(person_id) references persons on delete set null

);
CREATE SEQUENCE bt_seq START WITH 10 INCREMENT BY 1;
alter table book_tables alter booking_id set default nextval('bt_seq');
-----------------------cancelled orders------------------------------
-- CREATE TABLE cancelled_orders(
--    id INT,
--    on_order_id INT,
--    c_id INT,
--    PRIMARY KEY(id),
--    FOREIGN KEY(on_order_id) references online_orders on delete set null,
--    FOREIGN KEY(c_id) references cancellations on delete set null
   
-- );



INSERT INTO items(item_id,item_name,item_type,availability,price) VALUES (1,'Salmon nigiri','bevarage',7,456);
INSERT INTO items(item_id,item_name,item_type,availability,price) VALUES (2,'Katsu Curry','bevarage',2,108);
INSERT INTO items(item_id,item_name,item_type,availability,price) VALUES (3,'Scotch eggs','food',0,283);
INSERT INTO items(item_id,item_name,item_type,availability,price) VALUES (4,'Bruschette with Tomato','food',0,351);
INSERT INTO items(item_id,item_name,item_type,availability,price) VALUES (5,'Cheeseburger','bevarage',6,389);
INSERT INTO items(item_id,item_name,item_type,availability,price) VALUES (6,'French fries with sausages','bevarage',9,59);
INSERT INTO items(item_id,item_name,item_type,availability,price) VALUES (7,'Salmon nigiri','food',0,295);
INSERT INTO items(item_id,item_name,item_type,availability,price) VALUES (8,'Vegetable Soup','bevarage',1,345);
INSERT INTO items(item_id,item_name,item_type,availability,price) VALUES (9,'Chicken wings','bevarage',7,91);
INSERT INTO ingredients(ing_id,ing_name,availability,price) VALUES (1,'Paprik',8,446);
INSERT INTO ingredients(ing_id,ing_name,availability,price) VALUES (2,'Plums',7,350);
INSERT INTO ingredients(ing_id,ing_name,availability,price) VALUES (3,'Oatmeal',7,135);
INSERT INTO ingredients(ing_id,ing_name,availability,price) VALUES (4,'Salmon',0,253);
INSERT INTO ingredients(ing_id,ing_name,availability,price) VALUES (5,'Cannellini Beans',8,133);
INSERT INTO ingredients(ing_id,ing_name,availability,price) VALUES (6,'Almond oil',9,12);
INSERT INTO ingredients(ing_id,ing_name,availability,price) VALUES (7,'Rice Noodles',6,454);
INSERT INTO ingredients(ing_id,ing_name,availability,price) VALUES (8,'Buttermilk',4,459);
INSERT INTO ingredients(ing_id,ing_name,availability,price) VALUES (9,'Flour',9,294);
INSERT INTO persons(person_id,person_name,person_type,type_from,type_to,email,password,salary,address,phone_no) VALUES (1,'Sarah Daniels','Food Server','2012-10-22','2013-12-19','harrischarles@example.net','password3',47309,1,7468247194);
INSERT INTO persons(person_id,person_name,person_type,type_from,type_to,email,password,salary,address,phone_no) VALUES (2,'Amanda Mccoy','Delivery Manager','2012-09-22','2013-10-22','juanwhite@example.com','password2',24372,2,9927891679);
INSERT INTO persons(person_id,person_name,person_type,type_from,type_to,email,password,salary,address,phone_no) VALUES (3,'Wesley Smith','Delivery Manager','2012-09-22','2013-10-22','hallen@example.net','password1',47727,3,7601340649);
INSERT INTO persons(person_id,person_name,person_type,type_from,type_to,email,password,salary,address,phone_no) VALUES (4,'Scott Lane','Food Server','2012-09-22','2013-09-22','ddavenport@example.com','password3',40731,4,9608432313);
INSERT INTO persons(person_id,person_name,person_type,type_from,type_to,email,password,salary,address,phone_no) VALUES (5,'Mark Flores','Base Customer','2012-09-22','2013-12-19','xowens@example.net','password3',36681,5,9864205098);
INSERT INTO persons(person_id,person_name,person_type,type_from,type_to,email,password,salary,address,phone_no) VALUES (6,'Michele Clements','Kitchen Manager','2012-09-22','2013-10-22','thomas36@example.com','password2',12990,6,9806814790);
INSERT INTO persons(person_id,person_name,person_type,type_from,type_to,email,password,salary,address,phone_no) VALUES (7,'Mr. Tony Smith','Base Customer','2012-01-12','2013-12-19','victor86@example.org','password2',23223,7,8231120998);
INSERT INTO persons(person_id,person_name,person_type,type_from,type_to,email,password,salary,address,phone_no) VALUES (8,'Megan Hardin','Base Customer','2012-09-22','2013-01-12','mnewman@example.org','password3',30147,8,8933321532);
INSERT INTO persons(person_id,person_name,person_type,type_from,type_to,email,password,salary,address,phone_no) VALUES (9,'William Smith','Base Customer','2012-10-22','2013-10-22','amanda72@example.com','password2',24464,9,8666332561);
INSERT INTO purchases(purchase_id,quantity,purchase_name,purchase_date,purchase_time) VALUES (1,1,'merchant','2012-01-12','02:02:09');
INSERT INTO purchases(purchase_id,quantity,purchase_name,purchase_date,purchase_time) VALUES (2,1,'wholesale','2012-09-22','23:45:32');
INSERT INTO purchases(purchase_id,quantity,purchase_name,purchase_date,purchase_time) VALUES (3,6,'merchant','2012-12-19','02:02:09');
INSERT INTO purchases(purchase_id,quantity,purchase_name,purchase_date,purchase_time) VALUES (4,1,'merchant','2012-09-22','13:55:12');
INSERT INTO purchases(purchase_id,quantity,purchase_name,purchase_date,purchase_time) VALUES (5,2,'merchant','2012-10-22','23:45:32');
INSERT INTO purchases(purchase_id,quantity,purchase_name,purchase_date,purchase_time) VALUES (6,2,'wholesale','2012-09-22','23:45:32');
INSERT INTO purchases(purchase_id,quantity,purchase_name,purchase_date,purchase_time) VALUES (7,2,'merchant','2012-10-22','12:54:22');
INSERT INTO purchases(purchase_id,quantity,purchase_name,purchase_date,purchase_time) VALUES (8,4,'shop','2012-12-19','02:02:09');
INSERT INTO purchases(purchase_id,quantity,purchase_name,purchase_date,purchase_time) VALUES (9,8,'merchant','2012-09-22','13:55:12');
INSERT INTO tables(table_id,table_type,capacity,price) VALUES (1,'Normal',3,445);
INSERT INTO tables(table_id,table_type,capacity,price) VALUES (2,'Outdoor',3,214);
INSERT INTO tables(table_id,table_type,capacity,price) VALUES (3,'Outdoor',4,410);
INSERT INTO tables(table_id,table_type,capacity,price) VALUES (4,'Outdoor',8,360);
INSERT INTO tables(table_id,table_type,capacity,price) VALUES (5,'Outdoor',3,174);
INSERT INTO tables(table_id,table_type,capacity,price) VALUES (6,'Normal',2,455);
INSERT INTO tables(table_id,table_type,capacity,price) VALUES (7,'Outdoor',4,100);
INSERT INTO tables(table_id,table_type,capacity,price) VALUES (8,'Booth',9,216);
INSERT INTO tables(table_id,table_type,capacity,price) VALUES (9,'Normal',3,480);
INSERT INTO delivery_persons(dp_id,dp_name,rating,primary_no,salary,secondary_no,phone_no,availability) VALUES (1,'Lindsey Benson',3,2,12626,4,8907382001, True);
INSERT INTO delivery_persons(dp_id,dp_name,rating,primary_no,salary,secondary_no,phone_no,availability) VALUES (2,'Rhonda Rivera',2,4,33036,7,9177799202, False);
INSERT INTO delivery_persons(dp_id,dp_name,rating,primary_no,salary,secondary_no,phone_no,availability) VALUES (3,'Elizabeth Johnson',2,9,37712,825443,7250935986, True);
INSERT INTO delivery_persons(dp_id,dp_name,rating,primary_no,salary,secondary_no,phone_no,availability) VALUES (4,'Max Gay',0,3,12849,9,7326043956, False);
INSERT INTO delivery_persons(dp_id,dp_name,rating,primary_no,salary,secondary_no,phone_no,availability) VALUES (5,'Brian Johnson',0,6,36449,2,9124821473, True);
INSERT INTO delivery_persons(dp_id,dp_name,rating,primary_no,salary,secondary_no,phone_no,availability) VALUES (6,'Brandon Chandler',5,3,25780,9,7240185399, False);
INSERT INTO delivery_persons(dp_id,dp_name,rating,primary_no,salary,secondary_no,phone_no,availability) VALUES (7,'Donna Allen',3,8,47643,5,7007914050, True);
INSERT INTO delivery_persons(dp_id,dp_name,rating,primary_no,salary,secondary_no,phone_no,availability) VALUES (8,'Timothy Foley',0,4,42892,2,9410440514, False);
INSERT INTO delivery_persons(dp_id,dp_name,rating,primary_no,salary,secondary_no,phone_no,availability) VALUES (9,'Juan Sanford',2,6,12683,9,8796112282, True);
INSERT INTO item_feedback(item_f_id,item_id,person_id,feedback_txt,suggestions,rating) VALUES (1,1,1,'Bad','Bad process',4);
INSERT INTO item_feedback(item_f_id,item_id,person_id,feedback_txt,suggestions,rating) VALUES (2,2,1,'Good','Bad process',4);
INSERT INTO item_feedback(item_f_id,item_id,person_id,feedback_txt,suggestions,rating) VALUES (3,3,7,'Excellent','Long time',5);
INSERT INTO item_feedback(item_f_id,item_id,person_id,feedback_txt,suggestions,rating) VALUES (4,4,7,'Good','Found better option',1);
INSERT INTO item_feedback(item_f_id,item_id,person_id,feedback_txt,suggestions,rating) VALUES (5,5,7,'Good','Found better option',1);
INSERT INTO item_feedback(item_f_id,item_id,person_id,feedback_txt,suggestions,rating) VALUES (6,6,9,'Excellent','Not liked',0);
INSERT INTO item_feedback(item_f_id,item_id,person_id,feedback_txt,suggestions,rating) VALUES (7,7,4,'Bad','Not liked',4);
INSERT INTO item_feedback(item_f_id,item_id,person_id,feedback_txt,suggestions,rating) VALUES (8,8,7,'Excellent','Bad process',3);
INSERT INTO item_feedback(item_f_id,item_id,person_id,feedback_txt,suggestions,rating) VALUES (9,9,8,'Good','Not liked',0);
INSERT INTO dp_feedback(dp_f_id,dp_id,person_id,feedback_txt,suggestions,rating) VALUES (1,1,8,'Average','Bad process',3);
INSERT INTO dp_feedback(dp_f_id,dp_id,person_id,feedback_txt,suggestions,rating) VALUES (2,2,8,'Average','Bad process',1);
INSERT INTO dp_feedback(dp_f_id,dp_id,person_id,feedback_txt,suggestions,rating) VALUES (3,3,3,'Good','Not liked',1);
INSERT INTO dp_feedback(dp_f_id,dp_id,person_id,feedback_txt,suggestions,rating) VALUES (4,4,8,'Average','Bad process',2);
INSERT INTO dp_feedback(dp_f_id,dp_id,person_id,feedback_txt,suggestions,rating) VALUES (5,5,5,'Good','Found better option',5);
INSERT INTO dp_feedback(dp_f_id,dp_id,person_id,feedback_txt,suggestions,rating) VALUES (6,6,1,'Excellent','Long time',3);
INSERT INTO dp_feedback(dp_f_id,dp_id,person_id,feedback_txt,suggestions,rating) VALUES (7,7,8,'Good','Not liked',4);
INSERT INTO dp_feedback(dp_f_id,dp_id,person_id,feedback_txt,suggestions,rating) VALUES (8,8,8,'Good','Not liked',3);
INSERT INTO dp_feedback(dp_f_id,dp_id,person_id,feedback_txt,suggestions,rating) VALUES (9,9,8,'Average','Bad process',0);
INSERT INTO offline_orders(off_order_id,quantity,order_price,order_date,order_time) VALUES (1,2,550,'2012-12-19','02:02:09');
INSERT INTO offline_orders(off_order_id,quantity,order_price,order_date,order_time) VALUES (2,3,700,'2012-09-22','12:54:22');
INSERT INTO offline_orders(off_order_id,quantity,order_price,order_date,order_time) VALUES (3,4,53,'2012-10-22','23:45:32');
INSERT INTO offline_orders(off_order_id,quantity,order_price,order_date,order_time) VALUES (4,9,295,'2012-09-22','23:45:32');
INSERT INTO offline_orders(off_order_id,quantity,order_price,order_date,order_time) VALUES (5,5,455,'2012-09-22','02:02:09');
INSERT INTO offline_orders(off_order_id,quantity,order_price,order_date,order_time) VALUES (6,6,731,'2012-10-22','23:45:32');
INSERT INTO offline_orders(off_order_id,quantity,order_price,order_date,order_time) VALUES (7,9,332,'2012-12-19','13:55:12');
INSERT INTO offline_orders(off_order_id,quantity,order_price,order_date,order_time) VALUES (8,7,496,'2012-12-19','13:55:12');
INSERT INTO offline_orders(off_order_id,quantity,order_price,order_date,order_time) VALUES (9,2,608,'2012-12-19','02:02:09');
INSERT INTO online_orders(on_order_id,quantity,person_id,order_price,order_date,order_time,delivery_address,is_delivered,is_cancelled,estimated_time,dp_id,delivery_date,delivery_time) VALUES (1,4,3,13,'2012-12-19','13:55:12',1,True,False,65,9,'2012-09-23','14:55:12');
INSERT INTO online_orders(on_order_id,quantity,person_id,order_price,order_date,order_time,delivery_address,is_delivered,is_cancelled,estimated_time,dp_id,delivery_date,delivery_time) VALUES (2,1,5,222,'2012-10-22','12:54:22',2,True,False,78,2,'2012-10-23','14:55:12');
INSERT INTO online_orders(on_order_id,quantity,person_id,order_price,order_date,order_time,delivery_address,is_delivered,is_cancelled,estimated_time,dp_id,delivery_date,delivery_time) VALUES (3,9,3,331,'2012-09-22','13:55:12',3,True,False,98,4,'2012-09-23','23:50:32');
INSERT INTO online_orders(on_order_id,quantity,person_id,order_price,order_date,order_time,delivery_address,is_delivered,is_cancelled,estimated_time,dp_id,delivery_date,delivery_time) VALUES (4,5,5,200,'2012-12-19','23:45:32',4,True,False,34,8,'2012-12-20','23:50:32');
INSERT INTO online_orders(on_order_id,quantity,person_id,order_price,order_date,order_time,delivery_address,is_delivered,is_cancelled,estimated_time,dp_id,delivery_date,delivery_time) VALUES (5,1,2,320,'2012-10-22','02:02:09',5,True,False,43,7,'2012-01-13','03:03:09');
INSERT INTO online_orders(on_order_id,quantity,person_id,order_price,order_date,order_time,delivery_address,is_delivered,is_cancelled,estimated_time,dp_id,delivery_date,delivery_time) VALUES (6,4,3,681,'2012-12-19','23:45:32',6,True,False,53,3,'2012-01-13','13:53:22');
INSERT INTO online_orders(on_order_id,quantity,person_id,order_price,order_date,order_time,delivery_address,is_delivered,is_cancelled,estimated_time,dp_id,delivery_date,delivery_time) VALUES (7,5,6,479,'2012-10-22','13:55:12',7,True,False,21,4,'2012-01-13','03:03:09');
INSERT INTO online_orders(on_order_id,quantity,person_id,order_price,order_date,order_time,delivery_address,is_delivered,is_cancelled,estimated_time,dp_id,delivery_date,delivery_time) VALUES (8,5,6,361,'2012-09-22','13:55:12',8,True,False,77,6,'2012-12-20','14:55:12');
INSERT INTO online_orders(on_order_id,quantity,person_id,order_price,order_date,order_time,delivery_address,is_delivered,is_cancelled,estimated_time,dp_id,delivery_date,delivery_time) VALUES (9,6,2,329,'2012-12-19','23:45:32',9,True,False,14,5,'2012-01-13','14:55:12');
INSERT INTO coupons(coupon_id,coupon_txt,coupon_type,availability,start_date,end_date) VALUES (1,'Bug 2 get 1','free',4,'2012-12-19','2013-10-22');
INSERT INTO coupons(coupon_id,coupon_txt,coupon_type,availability,start_date,end_date) VALUES (2,'Free Discount','premium',5,'2012-09-22','2013-09-22');
INSERT INTO coupons(coupon_id,coupon_txt,coupon_type,availability,start_date,end_date) VALUES (3,'Buy 1 get 1','free',9,'2012-01-12','2013-09-22');
INSERT INTO coupons(coupon_id,coupon_txt,coupon_type,availability,start_date,end_date) VALUES (4,'Free Discount','free',7,'2012-10-22','2013-12-19');
INSERT INTO coupons(coupon_id,coupon_txt,coupon_type,availability,start_date,end_date) VALUES (5,'Bug 2 get 1','free',6,'2012-01-12','2013-01-12');
INSERT INTO coupons(coupon_id,coupon_txt,coupon_type,availability,start_date,end_date) VALUES (6,'Free Discount','premium',3,'2012-10-22','2013-10-22');
INSERT INTO coupons(coupon_id,coupon_txt,coupon_type,availability,start_date,end_date) VALUES (7,'Bug 2 get 1','premium',1,'2012-09-22','2013-12-19');
INSERT INTO coupons(coupon_id,coupon_txt,coupon_type,availability,start_date,end_date) VALUES (8,'Buy 1 get 1','free',0,'2012-12-19','2013-12-19');
INSERT INTO coupons(coupon_id,coupon_txt,coupon_type,availability,start_date,end_date) VALUES (9,'50 discount','free',9,'2012-10-22','2013-12-19');
INSERT INTO cancellations(c_id,on_order_id,c_reason,date,time) VALUES (1,4,'Not liked','2012-12-19','02:02:09');
INSERT INTO cancellations(c_id,on_order_id,c_reason,date,time) VALUES (2,7,'Long time','2012-09-22','13:55:12');
INSERT INTO cancellations(c_id,on_order_id,c_reason,date,time) VALUES (3,6,'Not liked','2012-09-22','12:54:22');
INSERT INTO cancellations(c_id,on_order_id,c_reason,date,time) VALUES (4,7,'Not liked','2012-10-22','02:02:09');
INSERT INTO cancellations(c_id,on_order_id,c_reason,date,time) VALUES (5,9,'Not liked','2012-01-12','12:54:22');
INSERT INTO cancellations(c_id,on_order_id,c_reason,date,time) VALUES (6,8,'Bad process','2012-09-22','13:55:12');
INSERT INTO cancellations(c_id,on_order_id,c_reason,date,time) VALUES (7,3,'Not liked','2012-01-12','12:54:22');
INSERT INTO cancellations(c_id,on_order_id,c_reason,date,time) VALUES (8,7,'Not liked','2012-01-12','13:55:12');
INSERT INTO cancellations(c_id,on_order_id,c_reason,date,time) VALUES (9,9,'Found better option','2012-10-22','02:02:09');
INSERT INTO item_ing(item_id,ing_id,quantity) VALUES (1,3,1);
INSERT INTO item_ing(item_id,ing_id,quantity) VALUES (1,4,3);
INSERT INTO item_ing(item_id,ing_id,quantity) VALUES (2,1,4);
INSERT INTO item_ing(item_id,ing_id,quantity) VALUES (2,2,1);
INSERT INTO item_ing(item_id,ing_id,quantity) VALUES (3,2,1);
INSERT INTO item_ing(item_id,ing_id,quantity) VALUES (3,3,2);
INSERT INTO item_ing(item_id,ing_id,quantity) VALUES (4,3,2);
INSERT INTO item_ing(item_id,ing_id,quantity) VALUES (4,4,3);
INSERT INTO item_ing(item_id,ing_id,quantity) VALUES (5,5,2);
INSERT INTO item_ing(item_id,ing_id,quantity) VALUES (5,6,4);
INSERT INTO item_ing(item_id,ing_id,quantity) VALUES (6,4,1);
INSERT INTO item_ing(item_id,ing_id,quantity) VALUES (6,5,3);
INSERT INTO item_ing(item_id,ing_id,quantity) VALUES (7,3,3);
INSERT INTO item_ing(item_id,ing_id,quantity) VALUES (7,4,3);
INSERT INTO item_ing(item_id,ing_id,quantity) VALUES (8,3,4);
INSERT INTO item_ing(item_id,ing_id,quantity) VALUES (8,4,4);
INSERT INTO item_ing(item_id,ing_id,quantity) VALUES (9,4,1);
INSERT INTO item_ing(item_id,ing_id,quantity) VALUES (9,5,1);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (1,6,2);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (1,7,2);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (1,8,5);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (1,9,2);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (1,1,4);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (2,2,4);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (2,3,3);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (2,4,1);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (2,5,4);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (2,6,3);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (3,2,4);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (3,3,5);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (3,4,1);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (3,5,3);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (3,6,2);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (4,6,1);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (4,7,2);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (4,8,3);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (4,9,1);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (4,1,3);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (5,4,4);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (5,5,2);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (5,6,2);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (5,7,5);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (5,8,5);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (6,1,3);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (6,2,3);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (6,3,5);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (6,4,5);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (6,5,1);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (7,2,4);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (7,3,1);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (7,4,5);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (7,5,5);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (7,6,3);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (8,2,1);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (8,3,1);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (8,4,1);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (8,5,2);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (8,6,2);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (9,2,4);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (9,3,3);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (9,4,5);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (9,5,1);
INSERT INTO pur_ing(purchase_id,ing_id,quantity) VALUES (9,6,1);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (1,1,2);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (1,2,3);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (1,3,1);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (1,4,4);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (1,5,5);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (2,3,3);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (2,4,2);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (2,5,5);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (2,6,2);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (2,7,3);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (3,2,5);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (3,3,2);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (3,4,4);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (3,5,1);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (3,6,5);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (4,3,5);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (4,4,5);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (4,5,1);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (4,6,2);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (4,7,3);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (5,5,3);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (5,6,2);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (5,7,1);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (5,8,2);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (5,9,1);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (6,6,3);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (6,7,5);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (6,8,5);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (6,9,5);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (6,1,1);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (7,6,3);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (7,7,1);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (7,8,2);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (7,9,5);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (7,1,3);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (8,2,2);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (8,3,2);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (8,4,3);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (8,5,4);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (8,6,3);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (9,1,2);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (9,2,4);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (9,3,2);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (9,4,5);
INSERT INTO offline_items(off_order_id,item_id,quantity) VALUES (9,5,2);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (1,2,5);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (1,3,1);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (1,4,3);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (1,5,3);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (1,6,5);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (2,5,4);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (2,6,4);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (2,7,5);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (2,8,4);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (2,9,2);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (3,3,4);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (3,4,1);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (3,5,2);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (3,6,5);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (3,7,3);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (4,4,3);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (4,5,5);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (4,6,2);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (4,7,3);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (4,8,3);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (5,2,3);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (5,3,1);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (5,4,4);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (5,5,4);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (5,6,2);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (6,5,2);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (6,6,4);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (6,7,5);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (6,8,2);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (6,9,4);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (7,4,5);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (7,5,2);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (7,6,1);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (7,7,3);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (7,8,2);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (8,5,5);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (8,6,5);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (8,7,1);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (8,8,2);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (8,9,4);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (9,2,3);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (9,3,3);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (9,4,5);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (9,5,3);
INSERT INTO online_items(on_order_id,item_id,quantity) VALUES (9,6,1);
INSERT INTO coupons_users(coupon_id,person_id,use_date,use_time,is_used) VALUES (1,8,'2012-12-19','12:54:22',True);
INSERT INTO coupons_users(coupon_id,person_id,use_date,use_time,is_used) VALUES (2,1,'2012-10-22','02:02:09',True);
INSERT INTO coupons_users(coupon_id,person_id,use_date,use_time,is_used) VALUES (3,2,'2012-01-12','02:02:09',True);
INSERT INTO coupons_users(coupon_id,person_id,use_date,use_time,is_used) VALUES (4,1,'2012-12-19','12:54:22',True);
INSERT INTO coupons_users(coupon_id,person_id,use_date,use_time,is_used) VALUES (5,9,'2012-12-19','23:45:32',True);
INSERT INTO coupons_users(coupon_id,person_id,use_date,use_time,is_used) VALUES (6,7,'2012-12-19','23:45:32',True);
INSERT INTO coupons_users(coupon_id,person_id,use_date,use_time,is_used) VALUES (7,8,'2012-09-22','12:54:22',True);
INSERT INTO coupons_users(coupon_id,person_id,use_date,use_time,is_used) VALUES (8,5,'2012-10-22','13:55:12',True);
INSERT INTO coupons_users(coupon_id,person_id,use_date,use_time,is_used) VALUES (9,9,'2012-12-19','12:54:22',True);
INSERT INTO book_tables(booking_id,table_id,person_id,booking_date,slot) VALUES (1,5,7,'2012-10-22',8);
INSERT INTO book_tables(booking_id,table_id,person_id,booking_date,slot) VALUES (2,5,3,'2012-12-19',6);
INSERT INTO book_tables(booking_id,table_id,person_id,booking_date,slot) VALUES (3,5,3,'2012-12-19',6);
INSERT INTO book_tables(booking_id,table_id,person_id,booking_date,slot) VALUES (4,4,6,'2012-01-12',5);
INSERT INTO book_tables(booking_id,table_id,person_id,booking_date,slot) VALUES (5,9,1,'2012-12-19',5);
INSERT INTO book_tables(booking_id,table_id,person_id,booking_date,slot) VALUES (6,3,9,'2012-09-22',7);
INSERT INTO book_tables(booking_id,table_id,person_id,booking_date,slot) VALUES (7,4,2,'2012-10-22',3);
INSERT INTO book_tables(booking_id,table_id,person_id,booking_date,slot) VALUES (8,5,5,'2012-10-22',8);
INSERT INTO book_tables(booking_id,table_id,person_id,booking_date,slot) VALUES (9,9,2,'2012-09-22',10);
INSERT INTO spatial (name, location) VALUES 
( 'Woking', '(-0.56, 51.3168)' ),
( 'Edinburgh', '(-0.683, 51.9533)' ),
( 'Brimingam', '(-0.156, 51.7168)' ),
( 'Thaiteo', '(-0.93, 55.8533)' ),
( 'Liverpool', '(-0.86, 51.0168)' ),
( 'Sheffield', '(-0.73, 55.1533)' ),
( 'Leeds', '(-0.66, 51.2168)' ),
( 'Plymouth', '(-0.46, 55.4533)' ),
( 'Belmath', '(-0.36, 51.5168)' ),
( 'Cardiff', '(-0.283, 55.6533)' );


