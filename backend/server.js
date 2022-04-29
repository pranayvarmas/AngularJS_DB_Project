const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
  
// Set up Global configuration access
dotenv.config();
var express = require('express');
var app = express();

app.post("/user/generateToken", (req, res) => {
    // Validate User Here
    // Then generate JWT Token
  
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: 12,
    }
  
    const token = jwt.sign(data, jwtSecretKey);
  
    res.send(token);
});
app.get("/user/validateToken", (req, res) => {
    // Tokens are generally passed in header of request
    // Due to security reasons.
  
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
  
    try {
        const token = req.header(tokenHeaderKey);
  
        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            return res.send("Successfully Verified");
        }else{
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
});
// app.use(express.json()) // for parsing application/json
// app.use(express.urlencoded({ extended: true }))
const router = express.Router();
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

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
app.all(function(req, res){
    var token=req.header('Authorization').replace('Bearer ', '');
    var verified=jwt.verify(token, jwtSecretKey);
    console.log("dfghj");
    if(verified){
        next();
    }
    else{
        res.send({
            success:false
        })
    }
})
app.use(bodyParser.json());
var t=0;
const { Client } = require('pg');
const e = require('express');
    // const client = new Client({host:'arjuna.db.elephantsql.com', port:5432, user:'eyatqyqu', password:'mnHq4s0lDXsV8VR54tRmEL-PWzxOdmkX', database:'eyatqyqu',})
    
    const client = new Client({host:'localhost', port:5432, user:'test', password:'test', database:'test',})
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

    client.query("begin")
    .then(res1 =>{
        return client.query(q);
    })
    .then(res2 =>{
        if(res2.rows.length==0){
            res.send({
                success:true,
                userExists:false,
                data:[]
            })
        }
        else{
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            let data = {
                time: Date(),
                userId: res2.rows[0]['person_id'],
            }
            const token = jwt.sign(data, jwtSecretKey);
            res.send({
                success:true,
                userExists:true,
                data:res2.rows,
                token:token
            })
        }
        return client.query("commit");
    })
    .catch((err) =>{
        console.log(err);
        return client.query("rollback");
    })
    .catch((err) =>{
        console.log("error rolling back");
    })

})

app.get('/items', function(req, res) {
    var token=req.header('Authorization').replace('Bearer ', '');
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    var verified=jwt.verify(token, jwtSecretKey);
    if(verified){
    }
    else{
        res.send({
            success:false
        })
    }
    q=mysql.format("select * from items order by item_id;");
    // console.log(req.header('Authorization'));
    client.query("begin")
    .then(res1 =>{
        return client.query(q);
    })
    .then(res2 =>{
        if(res2.rows.length==0){
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
                data:res2.rows
            })
        }
        return client.query("commit");
    })
    .catch((err) =>{
        console.log(err);
        return client.query("rollback");
    })
    .catch((err) =>{
        console.log("error rolling back");
    })
})

app.get('/getdp/:id', function(req, res) {
    var token=req.header('Authorization').replace('Bearer ', '');
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    var verified=jwt.verify(token, jwtSecretKey);
    if(verified){
    }
    else{
        res.send({
            success:false
        })
    }
    var id=req.params.id;
    q=mysql.format("select * from online_orders where dp_id=? order by on_order_id", id);
    q1=mysql.format("select * from delivery_persons where dp_id=?", id);
    var data;
    var data1;
    client.query("begin")
    .then(res1 => {
        return client.query(q);
    })
    .then(res2 => {
        data=res2.rows;
        return client.query(q1);
    })
    .then(res3 =>{
        data1=res3.rows;
        res.send({
            success:true,
            data:data,
            data1:data1
        })
    })
    .catch((err) =>{
        console.log(err);
        return client.query("rollback");
    })
    .catch((err) =>{
        console.log("error rolling back");
    })
})


app.get('/orders/:id', function(req, res) {
    var token=req.header('Authorization').replace('Bearer ', '');
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    var verified=jwt.verify(token, jwtSecretKey);
    if(verified){
    }
    else{
        res.send({
            success:false
        })
    }
    var id=req.params.id;
    q=mysql.format("select * from online_orders, online_items where person_id=? and online_orders.on_order_id=online_items.on_order_id order by online_orders.on_order_id;", id);
    // console.log(q);
    client.query("begin")
    .then(res1 =>{
        return client.query(q);
    })
    .then(res2 =>{
        if(res2.rows.length==0){
            res.send({
                success:true,
                ordersExists:false,
                data:[]
            })
        }
        else{
            res.send({
                success:true,
                ordersExists:true,
                data:res2.rows
            })
        }
        return client.query("commit");
    })
    .catch((err) =>{
        console.log(err);
        return client.query("rollback");
    })
    .catch((err) =>{
        console.log("error rolling back");
    })
})
app.post('/cancel_order', function(req, res, next){
    var token=req.header('Authorization').replace('Bearer ', '');
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    var verified=jwt.verify(token, jwtSecretKey);
    if(verified){
    }
    else{
        res.send({
            success:false
        })
    }
    var id=req.body['on_order_id'];
    q=mysql.format("update online_orders set is_cancelled=true where on_order_id=?", id);
    var date=new Date().toLocaleDateString();
    var time=new Date().toLocaleTimeString();
    q1=mysql.format("insert into cancellations(on_order_id, c_reason, date, time) values(?, ?, ?, ?);", [id, "Cancelled", date, time]);
    q2=mysql.format("select dp_id from online_orders where on_order_id=?", id);
    client.query("begin")
    .then((res1) => {
        // console.log("q");
        return client.query(q)
    })
    .then((res2) =>{
        // console.log("q1");
        return client.query(q1)
    })
    .then((res3) =>{
        // console.log("q2");
        return client.query(q2);
    })
    .then((res4) =>{
        // console.log("q3");
        q3=mysql.format("update delivery_persons set availability=True where dp_id=?", res4.rows[0]['dp_id']);
        return client.query(q3);
    })
    .then((res5) =>{
        // console.log("q4");
        res.send({
            success:true
        })
        return client.query("commit");
    })
    .catch((err) =>{
        console.log(err);
        return client.query("rollback");
    })
    .catch((err) =>{
        console.log("error rolling back");
    })
})
app.post('/order_delivered', function(req, res, next){
    var token=req.header('Authorization').replace('Bearer ', '');
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    var verified=jwt.verify(token, jwtSecretKey);
    if(verified){
    }
    else{
        res.send({
            success:false
        })
    }
    var inp=req.body;
    var date=new Date().toLocaleDateString();
    var time=new Date().toLocaleTimeString();
    q=mysql.format("update online_orders set is_delivered=True,delivery_date=?,delivery_time=? where on_order_id=?", [date, time, inp['id']]);
    q1=mysql.format("update delivery_persons set availability=True where dp_id=?", inp['dp_id']);
    console.log(q);
    console.log(q1);
    client.query("begin")
    .then((res1) => {
        return client.query(q)
    })
    .then((res2) =>{
        return client.query(q1)
    })
    .then((res5) =>{
        // console.log("q4");
        res.send({
            success:true
        })
        return client.query("commit");
    })
    .catch((err) =>{
        console.log(err);
        return client.query("rollback");
    })
    .catch((err) =>{
        console.log("error rolling back");
    })
})

app.post('/dp_feedback', function(req, res, next){
    var token=req.header('Authorization').replace('Bearer ', '');
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    var verified=jwt.verify(token, jwtSecretKey);
    if(verified){
    }
    else{
        res.send({
            success:false
        })
    }
    var inp=req.body;
    q=mysql.format("insert into dp_feedback(dp_id, person_id, feedback_txt, suggestions, rating) values(?, ?, ?, ?, ?);", [inp['dp_id'], inp['person_id'], inp['feedback_txt'], inp['suggestions'], inp['rating']]);
    q1=mysql.format("update online_orders set dp_feedback=true where on_order_id=?", inp['on_order_id']);
    client.query("begin")
    .then((res1) => {
        return client.query(q)
    })
    .then((res2) =>{
        return client.query(q1)
    })
    .then((res3) =>{
        res.send({
            success:true
        })
        return client.query("commit");
    })
    .catch((err) =>{
        console.log(err);
        return client.query("rollback");
    })
    .catch((err) =>{
        console.log("error rolling back");
    })
})
app.post('/item_feedback', function(req, res, next){
    var token=req.header('Authorization').replace('Bearer ', '');
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    var verified=jwt.verify(token, jwtSecretKey);
    if(verified){
    }
    else{
        res.send({
            success:false
        })
    }
    var inp=req.body;
    q=mysql.format("insert into item_feedback(item_id, person_id, feedback_txt, suggestions, rating) values(?, ?, ?, ?, ?);", [inp['item_id'], inp['person_id'], inp['feedback_txt'], inp['suggestions'], inp['rating']]);
    q1=mysql.format("update online_orders set item_feedback=true where on_order_id=?", inp['on_order_id']);
    client.query("begin")
    .then((res1) => {
        return client.query(q)
    })
    .then((res2) =>{
        return client.query(q1)
    })
    .then((res3) =>{
        res.send({
            success:true
        })
        return client.query("commit");
    })
    .catch((err) =>{
        console.log(err);
        return client.query("rollback");
    })
    .catch((err) =>{
        console.log("error rolling back");
    })
})

app.post('/signup', function(req, res, next){
    var token=req.header('Authorization').replace('Bearer ', '');
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    var verified=jwt.verify(token, jwtSecretKey);
    if(verified){
    }
    else{
        res.send({
            success:false
        })
    }
    var inp=req.body;
    q=mysql.format("insert into persons(person_name, person_type, type_from, type_to, address, phone_no, salary, email, password) values(?, ?, ?, ?, ?, ?, ?, ?, ?);", [inp['person_name'], inp['person_type'], inp['type_from'], inp['type_to'], inp['address'], inp['phone_no'], inp['salary'], inp['email'], inp['password']]);
    // q1=mysql.format("update online_orders set item_feedback=true where on_order_id=?", inp['on_order_id']);
    client.query("begin")
    .then((res1) => {
        return client.query(q)
    })
    .then((res3) =>{
        res.send({
            success:true
        })
        return client.query("commit");
    })
    .catch((err) =>{
        console.log(err);
        return client.query("rollback");
    })
    .catch((err) =>{
        console.log("error rolling back");
    })
})
app.get('/orders/details/:id', function(req, res) {
    var token=req.header('Authorization').replace('Bearer ', '');
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    var verified=jwt.verify(token, jwtSecretKey);
    if(verified){
    }
    else{
        res.send({
            success:false
        })
    }
    var id=req.params.id;
    q=mysql.format("select * from online_orders where on_order_id=?;", parseInt(id));
    console.log(q);
    var t1, t2;
    client.query("begin")
    .then(res1 =>{
        return client.query(q);
    })
    .then(res2 =>{
        if(res2.rows.length==0){
            res.send({
                success:true,
                orderExists:false,
                data:[]
            })
            // console.log("dfghjk");
            return ;
        }
        t1=res2.rows
        q1=mysql.format("select * from online_items where on_order_id=?", parseInt(id));
        return client.query(q1);
    })
    .then(res3 =>{
        res.send({
            success:true,
            orderExists:true,
            data:t1,
            data1:res3.rows
        })
        return client.query("commit");
    })
    .catch((err) =>{
        console.log(err);
        return client.query("rollback");
    })
    .catch((err) =>{
        console.log("error rolling back");
    })

    // var id=req.params.id;
    // q=mysql.format("select * from online_orders where on_order_id=?;", parseInt(id));
    
    // client.query("begin")
    // .then((res1) => {
    //     return client.query(q)
    // })
    // .then((res2) =>{
    //     return client.query(q1)
    // })
    // .then((res3) =>{
    //     return client.query(q2);
    // })
    // .then((res4) =>{
    //     q3=mysql.format("update delivery_persons set availability=True where dp_id=?", res4.rows[0]['dp_id']);
    //     return client.query(q3);
    // })
    // .then((res5) =>{
    //     res.send({
    //         success:true
    //     })
    //     return client.query("commit");
    // })
    // .catch((err) =>{
    //     console.log(err);
    //     return client.query("rollback");
    // })
    // .catch((err) =>{
    //     console.log("error rolling back");
    // })
})

app.get('/ingredients', function(req, res) {
    var token=req.header('Authorization').replace('Bearer ', '');
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    var verified=jwt.verify(token, jwtSecretKey);
    if(verified){
    }
    else{
        res.send({
            success:false
        })
    }
    q=mysql.format("select * from ingredients order by ing_id;");
    // console.log(q);
    client.query("begin")
    .then(res1 =>{
        if(res1.rows.length==0){
            res.send({
                success:true,
                ingsExists:false,
                data:[]
            })
        }
        else{
            res.send({
                success:true,
                ingsExists:true,
                data:res1.rows
            })
        }
        return client.query("commit");
    })
    .catch((err) =>{
        console.log(err);
        return client.query("rollback");
    })
    .catch((err) =>{
        console.log("error rolling back");
    })
    // .then(res2)
})
app.get('/cart/:id', function(req, res) {
    var token=req.header('Authorization').replace('Bearer ', '');
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    var verified=jwt.verify(token, jwtSecretKey);
    if(verified){
    }
    else{
        res.send({
            success:false
        })
    }
    var id=req.params.id;
    console.log(id);
    q=mysql.format("select * from cart where person_id = ? order by item_id;", id);
    console.log(q);
    client.query("begin")
    .then(res1 =>{
        return client.query(q);
    })
    .then(res2 =>{
        if(res2.rows.length==0){
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
                data:res2.rows
            })
        }
        return client.query("commit");
    })
    .catch((err) =>{
        console.log(err);
        return client.query("rollback");
    })
    .catch((err) =>{
        console.log("error rolling back");
    })
})

app.get('/coupons_person/:id', function(req, res) {
    var token=req.header('Authorization').replace('Bearer ', '');
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    var verified=jwt.verify(token, jwtSecretKey);
    if(verified){
    }
    else{
        res.send({
            success:false
        })
    }
    var id=req.params.id;
    console.log(id);
    q=mysql.format("select * from coupons_users, coupons where person_id = ? and coupons_users.coupon_id=coupons.coupon_id order by coupons.coupon_id;", id);
    console.log(q);
    client.query("begin")
    .then(res1 =>{
        return client.query(q);
    })
    .then(res2 =>{
        if(res2.rows.length==0){
            res.send({
                success:true,
                couponsExists:false,
                data:[]
            })
        }
        else{
            res.send({
                success:true,
                couponsExists:true,
                data:res2.rows
            })
        }
        return client.query("commit");
    })
    .catch((err) =>{
        console.log(err);
        return client.query("rollback");
    })
    .catch((err) =>{
        console.log("error rolling back");
    })
})

app.get('/get_est_time/:id', function(req, res) {
    var token=req.header('Authorization').replace('Bearer ', '');
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    var verified=jwt.verify(token, jwtSecretKey);
    if(verified){
    }
    else{
        res.send({
            success:false
        })
    }
    var id=req.params.id;
    console.log(id);
    q=mysql.format("SELECT ST_DistanceSpheroid(geometry(a.location), geometry(b.location), 'SPHEROID[\"WGS 84\",6378137,298.257223563]') FROM spatial a, spatial b WHERE a.id=? AND b.id=?;", [1, parseInt(id)]);
    console.log(q);
    dp_id=0;
    var po=0;
    client.query("begin")
    .then(res1 =>{
        return client.query(q);
    })
    .then(res2 =>{
        if(res1.rows.length==0){
            res.send({
                success:true,
                adrExists:false,
                data:0
            })
        }
        q1=mysql.format("select * from delivery_persons where availability=True and primary_no=?", parseInt(id));
        return client.query(q1);
    })
    .then(res3 =>{
        if(res2.rows.length!=0){
            dp_id=res2.rows[0];
            q2=mysql.format("update delivery_persons set availability=False where dp_id=?", dp_id['dp_id']);
            po=1;
        }
        else{
            q2=mysql.format("select * from delivery_persons where availability=True and secondary_no=?", parseInt(id));
            po=2;
        }
        return client.query(q2);
    })
    .then(res4 =>{
        if(po==1){
            res.send({
                success:true,
                adrExists:true,
                dpExists:true,
                data:res2.rows[0]['st_distancespheroid']/1000,
                dp_id: dp_id
            })
            return {};
        }
        else{

        }
    })
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
                    adrExists:false,
                    data:0
                })
            }
            else{
                console.log(res1.rows);
                q1=mysql.format("select * from delivery_persons where availability=True and primary_no=?", parseInt(id));
                console.log(q1);
                client.query(q1, (err2, res2) =>{
                    if(err2){
                        console.error(err2.stack);
                        res.send({
                            success:false
                        })
                    }
                    else{
                        // console.log("Not Error");
                        if(res2.rows.length!=0){
                            dp_id=res2.rows[0];
                            q11=mysql.format("update delivery_persons set availability=False where dp_id=?", dp_id['dp_id']);
                            client.query(q11, (err11, res11) =>{
                                if(err11){
                                    console.log(err11.stack);
                                }
                                else{
                                    res.send({
                                        success:true,
                                        adrExists:true,
                                        dpExists:true,
                                        data:res1.rows[0]['st_distancespheroid']/1000,
                                        dp_id: dp_id
                                    })
                                }
                            })
                            
                        }
                        else{
                            q2=mysql.format("select * from delivery_persons where availability=True and secondary_no=?", parseInt(id));
                            console.log(q2);
                            client.query(q2, (err3, res3) =>{
                                if(err3){
                                    console.error(err3.stack);
                                    res.send({
                                        success:false
                                    })
                                }
                                else{
                                    // console.log("Not Error");
                                    if(res3.rows.length!=0){
                                        dp_id=res3.rows[0];
                                        q11=mysql.format("update delivery_persons set availability=False where dp_id=?", dp_id['dp_id']);
                                        client.query(q11, (err11, res11) =>{
                                            if(err11){
                                                console.log(err11.stack);
                                            }
                                            else{
                                                res.send({
                                                    success:true,
                                                    adrExists:true,
                                                    dpExists:true,
                                                    data:res1.rows[0]['st_distancespheroid']/1000,
                                                    dp_id: dp_id
                                                })
                                            }
                                        })
                            
                                    }
                                    else{
                                        q3=mysql.format("select * from delivery_persons where availability=True");
                                        console.log(q3);
                                        client.query(q3, (err4, res4) =>{
                                            if(err4){
                                                console.error(err4.stack);
                                                res.send({
                                                    success:false
                                                })
                                            }
                                            else{
                                                // console.log("Not Error");
                                                if(res4.rows.length!=0){
                                                    dp_id=res4.rows[0];
                                                    q11=mysql.format("update delivery_persons set availability=False where dp_id=?", dp_id['dp_id']);
                                                    console.log(q11);
                                                    client.query(q11, (err11, res11) =>{
                                                        if(err11){
                                                            console.log(err11.stack);
                                                        }
                                                        else{
                                                            res.send({
                                                                success:true,
                                                                adrExists:true,
                                                                dpExists:true,
                                                                data:res1.rows[0]['st_distancespheroid']/1000,
                                                                dp_id: dp_id
                                                            })
                                                        }
                                                    })
                            
                                                }
                                                else{
                                                    res.send({
                                                        success: true,
                                                        dpExists:false
                                                    })
                                                }
                                                // console.log(res1.rows);
                                            }
                                        })
                                    }
                                    // console.log(res1.rows);
                                }
                            })
                        }
                        // console.log(res1.rows);
                    }
                })
                
            }
            // console.log(res1.rows);
        }
    })
})

app.get('/checkout/:id', function(req, res) {
    var token=req.header('Authorization').replace('Bearer ', '');
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    var verified=jwt.verify(token, jwtSecretKey);
    if(verified){
    }
    else{
        res.send({
            success:false
        })
    }
    var id=req.params.id;
    console.log(id);
    q=mysql.format("select items.item_id, item_name, person_id, price, availability, quantity, item_type from cart, items where person_id = ? and items.item_id=cart.item_id order by items.item_id;", id);
    console.log(q);
    client.query("begin")
    .then(res1 =>{
        return client.query(q);
    })
    .then(res2 =>{
        if(res2.rows.length==0){
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
                data:res2.rows
            })
        }
        return client.query("commit");
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
    var token=req.header('Authorization').replace('Bearer ', '');
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    var verified=jwt.verify(token, jwtSecretKey);
    if(verified){
    }
    else{
        res.send({
            success:false
        })
    }
    // var inp=JSON.parse(Object.keys(req.body)[0]);
    var inp = req.body;
    q0=mysql.format("select * from cart where person_id = ? and item_id = ?", [inp['person_id'], inp['item_id']])
    console.log(q0);
    client.query("begin")
    .then(res1 =>{
        return client.query(q0);
    })
    .then(res2 =>{
        if(res2.rows.length==0){
            q=mysql.format("insert into cart(person_id, item_id, quantity) values (?, ?, ?)", [inp['person_id'], inp['item_id'], inp['quantity']]);
        }
        else{
            q=mysql.format("update cart set quantity=? where person_id=? and item_id=?", [inp['quantity']+res2.rows[0]['quantity'], inp['person_id'], inp['item_id']]);
        }
        return client.query(q);
    })
    .then(res3 =>{
        res.send({
            success:true
        })
        return client.query("commit");
    })
})

app.post('/add_onlineorder', function(req, res, next) {
    var token=req.header('Authorization').replace('Bearer ', '');
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    var verified=jwt.verify(token, jwtSecretKey);
    if(verified){
    }
    else{
        res.send({
            success:false
        })
    }
    // var inp=JSON.parse(Object.keys(req.body)[0]);
    var inp = req.body;
    q=mysql.format("select * from cart where person_id=?", inp["person_id"]);
    console.log(q);
    var res2;
    client.query("begin")
    .then(res1=>{
        return client.query(q);
    })
    .then(res2 =>{
        this.res2=res2;
        if(res2.rows.length==0){
            res.send({
                success:false
            })
        }
        else{
            q1="insert into online_items(on_order_id, item_id, quantity) values("
            q2="";
            var tot_q=0;
            for(var k=0; k<res2.rows.length; k++){
                tot_q=tot_q+res2.rows[k]['quantity'];
            }
            var on_order_id=0;
            var date=new Date().toLocaleDateString();
            var time=new Date().toLocaleTimeString();
            console.log(date, time, inp['delivery_address']);
            q3=mysql.format("insert into online_orders(quantity, person_id, order_price, order_date, order_time, delivery_address, is_delivered, is_cancelled, estimated_time, dp_id) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", [tot_q, inp['person_id'], inp['order_price'], date, time, inp['delivery_address'], false, false, parseInt(inp['estimated_time']), inp['dp_id']]);
        }
        return client.query(q3);
    })
    .then(res3 =>{
        q4=mysql.format("select max(on_order_id) from online_orders;");
        return client.query(q4);
    })
    .then(res4 =>{
        on_order_id=res4.rows[0]['max'];
        console.log(res4.rows[0]['max']);
        for(var k=0; k<this.res2.rows.length; k++){
            q2=q2+q1+on_order_id.toString()+","+this.res2.rows[k]['item_id']+","+this.res2.rows[k]['quantity']+");";
        }
        return client.query(q2);
    })
    .then(res5 =>{
        q5=mysql.format("delete from cart where person_id=?;", inp['person_id']);
        return client.query(q5);
    })
    .then(res6 =>{
        res.send({
            success:true
        })
        return client.query("commit");
    })
    // client.query(q, (err1, res1) =>{
    //     if(err1){
    //         console.error(err1.stack);
    //         res.send({
    //             success:false,
    //             data:err1.stack
    //         })
    //     }
    //     else{
    //         if(res1.rows.length==0){
    //             res.send({
    //                 success:false
    //             })
    //         }
    //         else{
                
    //             q1="insert into online_items(on_order_id, item_id, quantity) values("
    //             q2="";
    //             var tot_q=0;
    //             for(var k=0; k<res1.rows.length; k++){
    //                 tot_q=tot_q+res1.rows[k]['quantity'];
    //             }
    //             var on_order_id=0;
    //             var date=new Date().toLocaleDateString();
    //             var time=new Date().toLocaleTimeString();
    //             console.log(date, time, inp['delivery_address']);
    //             q3=mysql.format("insert into online_orders(quantity, person_id, order_price, order_date, order_time, delivery_address, is_delivered, is_cancelled, estimated_time, dp_id) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", [tot_q, inp['person_id'], inp['order_price'], date, time, inp['delivery_address'], false, false, parseInt(inp['estimated_time']), inp['dp_id']]);
    //             console.log(q3);
    //             client.query(q3, (err4, res4) =>{
    //                 if(err4){
    //                     console.error(err4.stack);
    //                     res.send({
    //                         success:false,
    //                         data:err4.stack
    //                     })
    //                 }
    //                 else{
    //                     q4=mysql.format("select max(on_order_id) from online_orders;");
    //                     client.query(q4, (err5, res5) =>{
    //                         if(err5){
    //                             console.log(err5.stack);
    //                             res.send({
    //                                 success:false,
    //                                 data:err5.stack
    //                             })
    //                         }
    //                         else{
    //                             on_order_id=res5.rows[0]['max'];
    //                             console.log(res5.rows[0]['max']);
    //                             for(var k=0; k<res1.rows.length; k++){
    //                                 q2=q2+q1+on_order_id.toString()+","+res1.rows[k]['item_id']+","+res1.rows[k]['quantity']+");";
    //                             }
    //                             console.log(q2);
    //                             client.query(q2, (err3, res3) =>{
    //                                 if(err3){
    //                                     console.error(err3.stack);
    //                                     res.send({
    //                                         success:false,
    //                                         data:err3.stack
    //                                     })
    //                                 }
    //                                 else{
    //                                     q5=mysql.format("delete from cart where person_id=?;", inp['person_id']);
    //                                     console.log(q5);
    //                                     client.query(q5, (err6, res6) =>{
    //                                         if(err6){
    //                                             console.log(err6);
    //                                             res.send({
    //                                                 success:false,
    //                                                 data:err6.stack
    //                                             })
    //                                         }
    //                                         else{
    //                                             res.send({
    //                                                 success:true
    //                                             })
    //                                         }
    //                                     })
    //                                 }
    //                             })
    //                         }
    //                     })
                        
    //                 }
    //             })
    //         }
    //     }
    // })
})

app.post('/add_coupon', function(req, res, next) {
    var token=req.header('Authorization').replace('Bearer ', '');
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    var verified=jwt.verify(token, jwtSecretKey);
    if(verified){
    }
    else{
        res.send({
            success:false
        })
    }
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
    var token=req.header('Authorization').replace('Bearer ', '');
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    var verified=jwt.verify(token, jwtSecretKey);
    if(verified){
    }
    else{
        res.send({
            success:false
        })
    }
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
    var token=req.header('Authorization').replace('Bearer ', '');
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    var verified=jwt.verify(token, jwtSecretKey);
    if(verified){
    }
    else{
        res.send({
            success:false
        })
    }
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
    var token=req.header('Authorization').replace('Bearer ', '');
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    var verified=jwt.verify(token, jwtSecretKey);
    if(verified){
    }
    else{
        res.send({
            success:false
        })
    }
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
    var token=req.header('Authorization').replace('Bearer ', '');
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    var verified=jwt.verify(token, jwtSecretKey);
    if(verified){
    }
    else{
        res.send({
            success:false
        })
    }
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
    var token=req.header('Authorization').replace('Bearer ', '');
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    var verified=jwt.verify(token, jwtSecretKey);
    if(verified){
    }
    else{
        res.send({
            success:false
        })
    }
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
app.delete('/delete_cart/:person_id/:item_id', function(req, res, next) {
    var token=req.header('Authorization').replace('Bearer ', '');
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    var verified=jwt.verify(token, jwtSecretKey);
    if(verified){
    }
    else{
        res.send({
            success:false
        })
    }
    // var inp=JSON.parse(Object.keys(req.body)[0]);
    var person_id = req.params.person_id;
    var item_id = req.params.item_id;
    // console.log(id);
    // console.log(id);
    q=mysql.format("delete from cart where item_id = ? and person_id = ?", [item_id, person_id]);
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
    var token=req.header('Authorization').replace('Bearer ', '');
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    var verified=jwt.verify(token, jwtSecretKey);
    if(verified){
    }
    else{
        res.send({
            success:false
        })
    }
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
// app.get('/ingredients', function (req, res) {
//     // res.send('Hello World');
//     q="select distinct ing_name from ingredients";
//     client.query(q, (err1, res1) => {
//         if(err1){
//             console.log(err1.stack);
//           }else{
//             x=res1.rows;
//             console.log(res1.rows[3]);
//             res.send(x);
//           }
//     })
// })
app.get('/staff', function (req, res) {
    var token=req.header('Authorization').replace('Bearer ', '');
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    var verified=jwt.verify(token, jwtSecretKey);
    if(verified){
    }
    else{
        res.send({
            success:false
        })
    }
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
    var token=req.header('Authorization').replace('Bearer ', '');
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    var verified=jwt.verify(token, jwtSecretKey);
    if(verified){
    }
    else{
        res.send({
            success:false
        })
    }
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

// app.get('/coupons', function (req, res) {
//     // res.send('Hello World');
//     const q={
//         text:"Select * from coupons  limit 10"
//     }
//     client.query(q, (err1, res1) => {
//         if(err1){
//             console.log(err1.stack);
//           }else{
//             x=res1.rows;
//             console.log(res1.rows[3]);
//             res.send(x);
//           }
//     })
// })
app.get('/purchases', function (req, res) {
    var token=req.header('Authorization').replace('Bearer ', '');
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    var verified=jwt.verify(token, jwtSecretKey);
    if(verified){
    }
    else{
        res.send({
            success:false
        })
    }
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
// app.get('/tables', function (req, res) {
//     // res.send('Hello World');
//     q="Select * from tables  limit 5";
//     client.query(q, (err1, res1) => {
//         if(err1){
//             console.log(err1.stack);
//           }else{
//             x=res1.rows;
//             console.log(res1.rows[3]);
//             res.send(x);
//           }
//     })
// })
// app.post('/add_items', function(req, res,next){
//     var inp=JSON.parse(Object.keys(req.body)[0]);
//     // var inp=req.body;
//     //q1="insert into venue(venue_name, city_name, country_name, capacity) values ("+"'"+inp['venue_name']+"'"+','+"'"+inp['city_name']+"'"+','+"'"+inp['country_name']+"'"+','+inp['capacity']+')';
//     //console.log(q1);
//     const q2 = {
//         text: 'INSERT INTO items(item_name, item_type, availability,price) VALUES($1, $2,$3,$4)',
//         values: [inp[item_name], inp[item_type],inp[availability],inp[price]],
//       }
//     client.query(q2, (err0, res0) =>{
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
// app.post('/add_ingredients', function(req, res,next){
//     var inp=JSON.parse(Object.keys(req.body)[0]);
//     // var inp=req.body;
//     //q1="insert into venue(venue_name, city_name, country_name, capacity) values ("+"'"+inp['venue_name']+"'"+','+"'"+inp['city_name']+"'"+','+"'"+inp['country_name']+"'"+','+inp['capacity']+')';
//     //console.log(q1);
//     const q2 = {
//         text: 'INSERT INTO ingredients(ing_name, availability,price) VALUES($1, $2,$3)',
//         values: [inp[ing_name], inp[availability],inp[price]],
//       }
//     client.query(q2, (err0, res0) =>{
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
// app.post('/add_staff', function(req, res,next){
//     var inp=JSON.parse(Object.keys(req.body)[0]);
//     // var inp=req.body;
//     //q1="insert into venue(venue_name, city_name, country_name, capacity) values ("+"'"+inp['venue_name']+"'"+','+"'"+inp['city_name']+"'"+','+"'"+inp['country_name']+"'"+','+inp['capacity']+')';
//     //console.log(q1);
//     const q2 = {
//         text: 'INSERT INTO persons(person_name, person_type, type_from,type_to,address,phone_no,salary,email,password) VALUES($1,$2,$3,$4,S5,$6,$7,$8,$9)',
//         values: [inp[person_name], inp[person_type],inp[type_from],inp[type_to],inp[address],inp[phone_no],inp[salary],inp[email],inp[password]],
//       }
//     client.query(q2, (err0, res0) =>{
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
// app.post('/add_coupons', function(req, res,next){
//     var inp=JSON.parse(Object.keys(req.body)[0]);
//     // var inp=req.body;
//     //q1="insert into venue(venue_name, city_name, country_name, capacity) values ("+"'"+inp['venue_name']+"'"+','+"'"+inp['city_name']+"'"+','+"'"+inp['country_name']+"'"+','+inp['capacity']+')';
//     //console.log(q1);
//     const q2 = {
//         text: 'INSERT INTO coupons(coupon_txt,coupon_type,availability,start_date,end_date) VALUES($1,$2,$3,$4,S5)',
//         values: [inp[coupon_txt],inp[coupon_type],inp[availability],inp[start_date],inp[end_date]],
//       }
//     client.query(q2, (err0, res0) =>{
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
// app.post('/delete_coupons', function(req, res,next){
//     //get the coupon id from frontend
//     var inp=JSON.parse(Object.keys(req.body)[0]);
//     // var inp=req.body;
//     //q1="insert into venue(venue_name, city_name, country_name, capacity) values ("+"'"+inp['venue_name']+"'"+','+"'"+inp['city_name']+"'"+','+"'"+inp['country_name']+"'"+','+inp['capacity']+')';
//     //console.log(q1);
//     const q2 = {
//         text: 'INSERT INTO items(item_name, item_type, availability,price) VALUES($1, $2,$3,$4)',
//         values: [inp[item_name], inp[item_type],inp[availability],inp[price]],
//       }
//     client.query(q2, (err0, res0) =>{
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
// app.post('/add_dp', function(req, res,next){
//     var inp=JSON.parse(Object.keys(req.body)[0]);
//     // var inp=req.body;
//     //q1="insert into venue(venue_name, city_name, country_name, capacity) values ("+"'"+inp['venue_name']+"'"+','+"'"+inp['city_name']+"'"+','+"'"+inp['country_name']+"'"+','+inp['capacity']+')';
//     //console.log(q1);
//     const q2 = {
//         text: 'INSERT INTO delivery_persons(dp_name,rating,primary_no,secondary_no,phone_no,salary) VALUES($1,$2,$3,$4,S5,$6)',
//         values: [inp[dp_name],inp[rating],inp[primary_no],inp[secondary_no],inp[phone_no],inp[salary]],
//       }
//     client.query(q2, (err0, res0) =>{
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
//////////////////////////////////////////////////////////////////////////
app.get('/ingredients', function(req, res) {
    var token=req.header('Authorization').replace('Bearer ', '');
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    var verified=jwt.verify(token, jwtSecretKey);
    if(verified){
    }
    else{
        res.send({
            success:false
        })
    }
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
            console.log("Not Error");
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
app.get('/coupons', function(req, res) {
    var token=req.header('Authorization').replace('Bearer ', '');
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    var verified=jwt.verify(token, jwtSecretKey);
    if(verified){
    }
    else{
        res.send({
            success:false
        })
    }
    q=mysql.format("select * from coupons order by coupon_id;");
    // console.log(q);
    client.query(q, (err1, res1) =>{
        if(err1){
            console.error(err1.stack);
            res.send({
                success:false
            })
        }
        else{
            console.log("Not Error");
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
app.get('/persons', function(req, res) {
    var token=req.header('Authorization').replace('Bearer ', '');
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    var verified=jwt.verify(token, jwtSecretKey);
    if(verified){
    }
    else{
        res.send({
            success:false
        })
    }
    q=mysql.format("select * from persons order by person_id;");
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
app.get('/tables', function(req, res) {
    var token=req.header('Authorization').replace('Bearer ', '');
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    var verified=jwt.verify(token, jwtSecretKey);
    if(verified){
    }
    else{
        res.send({
            success:false
        })
    }
    q=mysql.format("select * from tables order by table_id;");
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
                    tablesExists:false,
                    data:[]
                })
            }
            else{
                res.send({
                    success:true,
                    tablesExists:true,
                    data:res1.rows
                })
            }
            // console.log(res1.rows);
        }
    })
})
app.get('/booking-tables/:dt', function(req, res) {
    var x=req.params.dt;
    //dateString = 'Wed Mar 19 00:30:00 IST 1997';
    var date = new Date(x.replace('IST', ''));
    console.log(date);
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    let time1=date.getHours();
    let time2=date.getMinutes();
    let time3=date.getSeconds();
    let time = time1 + ":" + time2 + ":" + time3
    x=year+"-"+month+"-"+day;
    //console.log(time);
    //console.log(x);
    q=mysql.format("select * from tables where table_id not in (select distinct table_id from book_tables where booking_date = ? ) order by table_id;",[x]);
     console.log(q);
    
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
                    tablesExists:false,
                    data:[]
                })
            }
            else{
                //console.log(res1.rows);
                res.send({
                    success:true,
                    tablesExists:true,
                    data:res1.rows
                })
            }
            // console.log(res1.rows);
        }
    })
})
app.get('/booked-tables/:id', function(req, res) {
    var id=req.params.id;
    //console.log(x);
    q=mysql.format("select * from book_tables where person_id = ? order by booking_date,table_id;",[Number(id)]);
     console.log(q);
    
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
                    tablesExists:false,
                    data:[]
                })
            }
            else{
                //console.log(res1.rows);
                res.send({
                    success:true,
                    tablesExists:true,
                    data:res1.rows
                })
            }
            // console.log(res1.rows);
        }
    })
})
app.post('/add-booking-tables', function(req, res, next) {
     //var inp=JSON.parse(Object.keys(req.body)[0]);
    var inp = req.body;
    /*var id=req.params.id;
    var person_id=req.params.person_id;
    var currentdate=new Date(req.params.currentdate);
    var x = currentdate.getFullYear()+"-"+(currentdate.getMonth()+1)+"-"+currentdate.getDate();
    /*var booking_from=req.params.booking_from;
    var booking_to=req.params.booking_to;
    var slot=req.params.slot;
    console.log(x);*/
    console.log(inp['booking_date']);
    q=mysql.format("insert into book_tables(table_id,person_id,booking_date,slot) values (?, ?, ?, ?)", [inp['table_id'],inp['person_id'],inp['booking_date'],inp['slot']]);
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
app.get('/offlineorders', function(req, res) {
    console.log("ab");
    q=mysql.format("select * from offline_orders;");
     console.log(q);
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
                    ordersExists:false,
                    data:[]
                })
            }
            else{
                console.log(res1.rows);
                res.send({
                    success:true,
                    ordersExists:true,
                    data:res1.rows
                })
            }
            // console.log(res1.rows);
        }
    })
})
app.get('/offlineorders/details/:id', function(req, res) {
    console.log("ab");
    var id = Number(req.params.id);
    q=mysql.format("select * from offline_items where off_order_id = ? ;",[id]);
     console.log(q);
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
                    ordersExists:false,
                    data:[]
                })
            }
            else{
                console.log(res1.rows);
                res.send({
                    success:true,
                    ordersExists:true,
                    data:res1.rows
                })
            }
            // console.log(res1.rows);
        }
    })
})
app.put('/update_ingredient/:id', function(req, res, next) {
    var token=req.header('Authorization').replace('Bearer ', '');
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    var verified=jwt.verify(token, jwtSecretKey);
    if(verified){
    }
    else{
        res.send({
            success:false
        })
    }
    // var inp=JSON.parse(Object.keys(req.body)[0]);
    var id=req.params.id;
    var inp = req.body;
    q=mysql.format("update ingredients set ing_name = ?,  availability = ?, price = ? where ing_id = ?;", [inp['ing_name'], inp['availability'], inp['price'], id]);
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
app.put('/update_coupon/:id', function(req, res, next) {
    var token=req.header('Authorization').replace('Bearer ', '');
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    var verified=jwt.verify(token, jwtSecretKey);
    if(verified){
    }
    else{
        res.send({
            success:false
        })
    }
    // var inp=JSON.parse(Object.keys(req.body)[0]);
    var id=req.params.id;
    var inp = req.body;
    q=mysql.format("update coupons set coupon_txt = ?, coupon_type = ? , availability = ?, start_date = ? , end_date=? where coupon_id = ?;", [inp['coupon_txt'],inp['coupon_type'], inp['availability'], inp['start_date'],inp['end_date'], id]);
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
app.put('/update_person/:id', function(req, res, next) {
    var token=req.header('Authorization').replace('Bearer ', '');
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    var verified=jwt.verify(token, jwtSecretKey);
    if(verified){
    }
    else{
        res.send({
            success:false
        })
    }
    // var inp=JSON.parse(Object.keys(req.body)[0]);
    var id=req.params.id;
    var inp = req.body;
    q=mysql.format("update persons set person_name = ?, person_type = ? , type_from = ?, type_to = ? , address=? , phone_no = ? ,salary = ? ,email = ? ,password = ?  where person_id = ?;", [inp['person_name'],inp['person_type'], inp['type_from'], inp['type_to'],inp['address'] , inp['phone_no'],inp['salary'],inp['email'],inp['password'],id]);
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
app.put('/update_table/:id', function(req, res, next) {
    var token=req.header('Authorization').replace('Bearer ', '');
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    var verified=jwt.verify(token, jwtSecretKey);
    if(verified){
    }
    else{
        res.send({
            success:false
        })
    }
    // var inp=JSON.parse(Object.keys(req.body)[0]);
    var id=req.params.id;
    var inp = req.body;
    q=mysql.format("update tables set table_type = ?, capacity = ?, price = ? where table_id = ?;", [inp['table_type'], inp['capacity'], inp['price'], id]);
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
/////////////////////////////
var server = app.listen(3030, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
// client.end();
