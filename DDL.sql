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



