--------Item information-------
CREATE TABLE items (
  item_id INT,
  item_name TEXT,
  item_type TEXT,
  availability INT,
  price INT,
  PRIMARY KEY(item_id)
);

------------Ingredients information-------
CREATE TABLE ingredients(
  ing_id INT,
  ing_name TEXT,
  availability INT,
  price INT,
  PRIMARY KEY(ing_id) 
);  


---------------Persons information------------
CREATE TABLE persons (
 person_id INT,
 person_name TEXT,
 person_type TEXT,
 type_from DATE,
 type_to DATE,
 address TEXT,
 phone_no INT,
 PRIMARY KEY(person_id)
);

----------Purchases information-----------------
CREATE TABLE purchases(
 purchase_id INT,
 purchase_name TEXT,
 purchase_date DATE,
 purchase_time TIME,
 quantity INT,
 PRIMARY  KEY(purchase_id)
);

-------------Tables  information----------------
CREATE TABLE tables(
 table_id INT,
 table_type TEXT,
 capacity INT,
 price INT,
 PRIMARY KEY(table_id)
);

----------------delivery persons information-----------
CREATE TABLE delivery_persons(
 dp_id INT,
 dp_name TEXT,
 dp_rating INT,
 primary_no INT,
 secondary_no INT,
 phone_no INT,
 PRIMARY KEY(dp_id)
);

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

----------------offline orders information-----------
CREATE TABLE offline_orders(
  off_order_id INT,
  quantity INT,
  order_price INT,
  order_date DATE,
  order_time TIME,
  PRIMARY KEY(off_order_id)
);


-----------online orders information-------------------
CREATE TABLE online_orders(
  on_order_id  INT,
  quantity   INT,
  person_id INT,
  order_price  INT,
  order_date  DATE,
  order_time  TIME,
  delivery_address  TEXT,
  is_delivered   BOOL,
  is_cancelled  BOOL,
  estimated_time  TIME,
  dp_id INT,
  delivery_date  DATE,
  delivery_time  TIME,
  PRIMARY KEY(on_order_id),
  FOREIGN KEY(person_id) references persons on delete set null,
  FOREIGN KEY(dp_id) references delivery_persons on delete set null
);

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


--------------------cancellations information-------------
CREATE TABLE cancellations(
  c_id INT,
  on_order_id INT,
  c_reason TEXT,
  c_date DATE,
  c_time TIME,
  PRIMARY KEY(c_id)

);
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
CREATE TABLE online_order_items(
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
CREATE TABLE offline_ordered_items(
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
CREATE TABLE book_table(
  booking_id INT,
  table_id INT,
  person_id INT,
  booking_date DATE,
  booking_from TIME,
  booking_to TIME,
  PRIMARY KEY(booking_id),
  FOREIGN KEY(table_id) references tables on delete set null,
  FOREIGN KEY(person_id) references persons on delete set null

);

-----------------------cancelled orders------------------------------
-- CREATE TABLE cancelled_orders(
--    id INT,
--    on_order_id INT,
--    c_id INT,
--    PRIMARY KEY(id),
--    FOREIGN KEY(on_order_id) references online_orders on delete set null,
--    FOREIGN KEY(c_id) references cancellations on delete set null
   
-- );








