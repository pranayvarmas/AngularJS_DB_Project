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

var server = app.listen(3030, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
// client.end();