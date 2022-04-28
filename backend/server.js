var express = require('express');
var app = express();
// app.use(express.json()) // for parsing application/json
// app.use(express.urlencoded({ extended: true }))
const router = express.Router();
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
});

var mysql = require('mysql');
var bodyParser = require('body-parser');  
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());
var t=0;
const { Client } = require('pg');
const e = require('express');
    // const client = new Client({host:'arjuna.db.elephantsql.com', port:5432, user:'eyatqyqu', password:'mnHq4s0lDXsV8VR54tRmEL-PWzxOdmkX', database:'eyatqyqu',})
    
    const client = new Client({host:'localhost', port:5432, user:'postgres', password:'pgadmin', database:'adepu',})
    client.connect()
        .then(() => {
            // Client is now connected
            console.log("Connected");
        })
        .catch((err) => {
            console.error('Error connecting: %s', err);
        });
app.get('/login/:email/:password', function(req, res) {
    var email=req.params.email;
    var password=req.params.password;
    q=mysql.format("select * from persons where email = ? and password = ?;", [email, password]);
    // console.log(q);
    client.query(q, (err1, res1) =>{
        if(err1){
            console.error(err1.stack);
            res.send({
                success:false
            })
        }
        else{
            // console.log("Not Error");
            if(res1.rows.length==0){
                res.send({
                    success:true,
                    userExists:false,
                    data:[]
                })
            }
            else{
                res.send({
                    success:true,
                    userExists:true,
                    data:res1.rows
                })
            }
        }
        // console.log(res1.rows);
        // res.send(res1.rows);
    })
})

app.get('/items', function(req, res) {
    q=mysql.format("select * from items order by item_id;");
    // console.log(q);
    client.query(q, (err1, res1) =>{
        if(err1){
            console.error(err1.stack);
            res.send({
                success:false
            })
        }
        else{
            // console.log("Not Error");
            if(res1.rows.length==0){
                res.send({
                    success:true,
                    itemsExists:false,
                    data:[]
                })
            }
            else{
                res.send({
                    success:true,
                    itemsExists:true,
                    data:res1.rows
                })
            }
            // console.log(res1.rows);
        }
    })
})
app.get('/ingredients', function(req, res) {
    q=mysql.format("select * from ingredients order by ing_id;");
    // console.log(q);
    client.query(q, (err1, res1) =>{
        if(err1){
            console.error(err1.stack);
            res.send({
                success:false
            })
        }
        else{
            // console.log("Not Error");
            if(res1.rows.length==0){
                res.send({
                    success:true,
                    itemsExists:false,
                    data:[]
                })
            }
            else{
                res.send({
                    success:true,
                    itemsExists:true,
                    data:res1.rows
                })
            }
            // console.log(res1.rows);
        }
    })
})
    // app.post('/venues/add', function(req, res, next){
    //     // console.log(req.json());
    //     var inp=JSON.parse(Object.keys(req.body)[0]);
    //     // var inp=req.body;
    //     q1="insert into venue(venue_name, city_name, country_name, capacity) values ("+"'"+inp['venue_name']+"'"+','+"'"+inp['city_name']+"'"+','+"'"+inp['country_name']+"'"+','+inp['capacity']+')';
    //     console.log(q1);
    //     client.query(q1, (err0, res0) =>{
    //         if(err0){
    //             console.log(err0 ? err0.stack : res0.rows) // Hello World!
    //             res.send({
    //                 success:false,
    //                 data: err0.stack
    //             })
    //         }
    //         else{
    //             res.send({
    //                 success:true
    //             });
    //         }
    //     })
    // })
    // })
app.post('/item_to_cart', function(req, res, next) {
    // var inp=JSON.parse(Object.keys(req.body)[0]);
    var inp = req.body;
    q=mysql.format("insert into cart(person_id, item_id, quantity) values (?, ?, ?)", [inp['person_id'], inp['item_id'], inp['quantity']]);
    // console.log(q);
    client.query(q, (err1, res1) =>{
        if(err1){
            console.error(err1.stack);
            res.send({
                success:false,
                data:err1.stack
            })
        }
        else{
            res.send({
                success:true
            })
        }
    })
})
app.post('/add_coupon', function(req, res, next) {
    // var inp=JSON.parse(Object.keys(req.body)[0]);
    var inp = req.body;
    q=mysql.format("insert into coupons( coupon_txt, coupon_type, availability, start_date, end_date) values (?, ?, ?, ?, ?)", [inp['coupon_txt'], inp['coupon_type'], inp['availability'], inp['start_date'], inp['end_date']]);
    console.log(q);
    client.query(q, (err1, res1) =>{
        if(err1){
            console.error(err1.stack);
            res.send({
                success:false,
                data:err1.stack
            })
        }
        else{
            res.send({
                success:true
            })
        }
    })
})
app.post('/add_person', function(req, res, next) {
    // var inp=JSON.parse(Object.keys(req.body)[0]);
    var inp = req.body;
    q=mysql.format("insert into persons( person_name, person_type, type_from, type_to, address, phone_no, salary, email, password) values (?, ?, ?, ?, ?, ?, ?, ?, ?)", [inp['person_name'], inp['person_type'], inp['type_from'], inp['type_to'], inp['address'], inp['phone_no'], inp['salary'], inp['email'], inp['password']]);
    console.log(q);
    client.query(q, (err1, res1) =>{
        if(err1){
            console.error(err1.stack);
            res.send({
                success:false,
                data:err1.stack
            })
        }
        else{
            res.send({
                success:true
            })
        }
    })
})
app.post('/add_table', function(req, res, next) {
    // var inp=JSON.parse(Object.keys(req.body)[0]);
    var inp = req.body;
    q=mysql.format("insert into tables( table_type, capacity, price) values (?, ?, ?)", [inp['table_type'], inp['capacity'], inp['price']]);
    console.log(q);
    client.query(q, (err1, res1) =>{
        if(err1){
            console.error(err1.stack);
            res.send({
                success:false,
                data:err1.stack
            })
        }
        else{
            res.send({
                success:true
            })
        }
    })
})
app.post('/add_item', function(req, res, next) {
    // var inp=JSON.parse(Object.keys(req.body)[0]);
    var inp = req.body;
    q=mysql.format("insert into items( item_name, item_type, availability, price) values (?, ?, ?, ?)", [inp['item_name'], inp['item_type'], inp['availability'], inp['price']]);
    console.log(q);
    client.query(q, (err1, res1) =>{
        if(err1){
            console.error(err1.stack);
            res.send({
                success:false,
                data:err1.stack
            })
        }
        else{
            res.send({
                success:true
            })
        }
    })
})

app.put('/update_item/:id', function(req, res, next) {
    // var inp=JSON.parse(Object.keys(req.body)[0]);
    var id=req.params.id;
    var inp = req.body;
    q=mysql.format("update items set item_name = ?, item_type = ?, availability = ?, price = ? where item_id = ?;", [inp['item_name'], inp['item_type'], inp['availability'], inp['price'], id]);
    console.log(q);
    client.query(q, (err1, res1) =>{
        if(err1){
            console.error(err1.stack);
            res.send({
                success:false,
                data:err1.stack
            })
        }
        else{
            res.send({
                success:true
            })
        }
    })
})


app.delete('/delete_item/:id', function(req, res, next) {
    // var inp=JSON.parse(Object.keys(req.body)[0]);
    var id = req.params.id;
    console.log(id);
    console.log(id);
    q=mysql.format("delete from items where item_id = ?", id);
    console.log(q);
    client.query(q, (err1, res1) =>{
        if(err1){
            console.error(err1.stack);
            res.send({
                success:false,
                data:err1.stack
            })
        }
        else{
            res.send({
                success:true
            })
        }
    })
})

app.post('/add_ing', function(req, res, next) {
    // var inp=JSON.parse(Object.keys(req.body)[0]);
    var inp = req.body;
    q=mysql.format("insert into ingredients( ing_name, availability, price) values (?, ?, ?)", [inp['ing_name'], inp['availability'], inp['price']]);
    console.log(q);
    client.query(q, (err1, res1) =>{
        if(err1){
            console.error(err1.stack);
            res.send({
                success:false,
                data:err1.stack
            })
        }
        else{
            res.send({
                success:true
            })
        }
    })
})
///////////////////////////////////////////////////
app.get('/items', function (req, res) {
    // res.send('Hello World');
    q="select distinct item_name from items";
    client.query(q, (err1, res1) => {
        if(err1){
            console.log(err.stack);
          }else{
            x=res1.rows;
            console.log(res1.rows[3]);
            res.send(x);
          }
    })
})
app.get('/ingredients', function (req, res) {
    // res.send('Hello World');
    q="select distinct ing_name from ingredients";
    client.query(q, (err1, res1) => {
        if(err1){
            console.log(err1.stack);
          }else{
            x=res1.rows;
            console.log(res1.rows[3]);
            res.send(x);
          }
    })
})
app.get('/login:usrr', function (req, res) {
    // res.send('Hello World');
    q=" Select * from persons where email = 'input_email' and password = 'input_password' ";
    client.query(q, (err1, res1) => {
        if(err1){
            console.log(err1.stack);
          }else{
            x=res1.rows;
            console.log(x.length);
            if(x.length!=0){
                console.log(res1.rows);
                res.send({
                    userExists: true,
                    data: x
                });
            }
            else{
                res.send({
                    userExists: false,
                    data: []
                });
            }
          }
    })
})
app.get('/staff', function (req, res) {
    // res.send('Hello World');
    q="select distinct person_name from persons";
    client.query(q, (err1, res1) => {
        if(err1){
            console.log(err1.stack);
          }else{
            x=res1.rows;
            console.log(res1.rows[3]);
            res.send(x);
          }
    })
})
app.get('/items_left', function (req, res) {
    // res.send('Hello World');
    q="Select * from items where availability > 0 order by item_id limit 100";
    client.query(q, (err1, res1) => {
        if(err1){
            console.log(err1.stack);
          }else{
            x=res1.rows;
            console.log(res1.rows[3]);
            res.send(x);
          }
    })
})

app.get('/coupons', function (req, res) {
    // res.send('Hello World');
    const q={
        text:"Select * from coupons  limit 10"
    }
    client.query(q, (err1, res1) => {
        if(err1){
            console.log(err1.stack);
          }else{
            x=res1.rows;
            console.log(res1.rows[3]);
            res.send(x);
          }
    })
})
app.get('/purchases', function (req, res) {
    // res.send('Hello World');
    q="Select * from purchases  limit 5";
    const q1={
        text: "Select * from purchases  limit 5"
    }
    client.query(q1, (err1, res1) => {
        if(err1){
            console.log(err1.stack);
          }else{
            x=res1.rows;
            console.log(res1.rows[3]);
            res.send(x);
          }
    })
})
app.get('/tables', function (req, res) {
    // res.send('Hello World');
    q="Select * from tables  limit 5";
    client.query(q, (err1, res1) => {
        if(err1){
            console.log(err1.stack);
          }else{
            x=res1.rows;
            console.log(res1.rows[3]);
            res.send(x);
          }
    })
})
app.post('/add_items', function(req, res,next){
    var inp=JSON.parse(Object.keys(req.body)[0]);
    // var inp=req.body;
    //q1="insert into venue(venue_name, city_name, country_name, capacity) values ("+"'"+inp['venue_name']+"'"+','+"'"+inp['city_name']+"'"+','+"'"+inp['country_name']+"'"+','+inp['capacity']+')';
    //console.log(q1);
    const q2 = {
        text: 'INSERT INTO items(item_name, item_type, availability,price) VALUES($1, $2,$3,$4)',
        values: [inp[item_name], inp[item_type],inp[availability],inp[price]],
      }
    client.query(q2, (err0, res0) =>{
        if(err0){
            console.log(err0 ? err0.stack : res0.rows) // Hello World!
            res.send({
                success:false,
                data: err0.stack
            })
        }
        else{
            res.send({
                success:true
            });
        }
    })
})
app.post('/add_ingredients', function(req, res,next){
    var inp=JSON.parse(Object.keys(req.body)[0]);
    // var inp=req.body;
    //q1="insert into venue(venue_name, city_name, country_name, capacity) values ("+"'"+inp['venue_name']+"'"+','+"'"+inp['city_name']+"'"+','+"'"+inp['country_name']+"'"+','+inp['capacity']+')';
    //console.log(q1);
    const q2 = {
        text: 'INSERT INTO ingredients(ing_name, availability,price) VALUES($1, $2,$3)',
        values: [inp[ing_name], inp[availability],inp[price]],
      }
    client.query(q2, (err0, res0) =>{
        if(err0){
            console.log(err0 ? err0.stack : res0.rows) // Hello World!
            res.send({
                success:false,
                data: err0.stack
            })
        }
        else{
            res.send({
                success:true
            });
        }
    })
})
app.post('/add_staff', function(req, res,next){
    var inp=JSON.parse(Object.keys(req.body)[0]);
    // var inp=req.body;
    //q1="insert into venue(venue_name, city_name, country_name, capacity) values ("+"'"+inp['venue_name']+"'"+','+"'"+inp['city_name']+"'"+','+"'"+inp['country_name']+"'"+','+inp['capacity']+')';
    //console.log(q1);
    const q2 = {
        text: 'INSERT INTO persons(person_name, person_type, type_from,type_to,address,phone_no,salary,email,password) VALUES($1,$2,$3,$4,S5,$6,$7,$8,$9)',
        values: [inp[person_name], inp[person_type],inp[type_from],inp[type_to],inp[address],inp[phone_no],inp[salary],inp[email],inp[password]],
      }
    client.query(q2, (err0, res0) =>{
        if(err0){
            console.log(err0 ? err0.stack : res0.rows) // Hello World!
            res.send({
                success:false,
                data: err0.stack
            })
        }
        else{
            res.send({
                success:true
            });
        }
    })
})
app.post('/add_coupons', function(req, res,next){
    var inp=JSON.parse(Object.keys(req.body)[0]);
    // var inp=req.body;
    //q1="insert into venue(venue_name, city_name, country_name, capacity) values ("+"'"+inp['venue_name']+"'"+','+"'"+inp['city_name']+"'"+','+"'"+inp['country_name']+"'"+','+inp['capacity']+')';
    //console.log(q1);
    const q2 = {
        text: 'INSERT INTO coupons(coupon_txt,coupon_type,availability,start_date,end_date) VALUES($1,$2,$3,$4,S5)',
        values: [inp[coupon_txt],inp[coupon_type],inp[availability],inp[start_date],inp[end_date]],
      }
    client.query(q2, (err0, res0) =>{
        if(err0){
            console.log(err0 ? err0.stack : res0.rows) // Hello World!
            res.send({
                success:false,
                data: err0.stack
            })
        }
        else{
            res.send({
                success:true
            });
        }
    })
})
app.post('/delete_coupons', function(req, res,next){
    //get the coupon id from frontend
    var inp=JSON.parse(Object.keys(req.body)[0]);
    // var inp=req.body;
    //q1="insert into venue(venue_name, city_name, country_name, capacity) values ("+"'"+inp['venue_name']+"'"+','+"'"+inp['city_name']+"'"+','+"'"+inp['country_name']+"'"+','+inp['capacity']+')';
    //console.log(q1);
    const q2 = {
        text: 'INSERT INTO items(item_name, item_type, availability,price) VALUES($1, $2,$3,$4)',
        values: [inp[item_name], inp[item_type],inp[availability],inp[price]],
      }
    client.query(q2, (err0, res0) =>{
        if(err0){
            console.log(err0 ? err0.stack : res0.rows) // Hello World!
            res.send({
                success:false,
                data: err0.stack
            })
        }
        else{
            res.send({
                success:true
            });
        }
    })
})
app.post('/add_dp', function(req, res,next){
    var inp=JSON.parse(Object.keys(req.body)[0]);
    // var inp=req.body;
    //q1="insert into venue(venue_name, city_name, country_name, capacity) values ("+"'"+inp['venue_name']+"'"+','+"'"+inp['city_name']+"'"+','+"'"+inp['country_name']+"'"+','+inp['capacity']+')';
    //console.log(q1);
    const q2 = {
        text: 'INSERT INTO delivery_persons(dp_name,rating,primary_no,secondary_no,phone_no,salary) VALUES($1,$2,$3,$4,S5,$6)',
        values: [inp[dp_name],inp[rating],inp[primary_no],inp[secondary_no],inp[phone_no],inp[salary]],
      }
    client.query(q2, (err0, res0) =>{
        if(err0){
            console.log(err0 ? err0.stack : res0.rows) // Hello World!
            res.send({
                success:false,
                data: err0.stack
            })
        }
        else{
            res.send({
                success:true
            });
        }
    })
})
//////////////////////////////////////////////////////////////////////////
var server = app.listen(3030, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
// client.end();
