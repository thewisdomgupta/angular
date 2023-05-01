const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyparser.json());


//connect mysql database

const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'userinfo',
    port: 3306
});

//check database connection 
db.connect(err=>{
    if(err){
        console.log(err);
    }
    else{console.log('Database connected successfully!!!')}
    
})

//get all data

app.get('/user',(req,resp)=>{
    let qrr =`SELECT * FROM users`;
    db.query(qrr,(err,results)=>{
        if(err){
            console.log(err,'Error');
        }
        if(results.length>0){
            resp.send({
                message: 'All users data',
                data: results
            })
        }
    })
})

//get single data by Id

app.get('/user/:id',(req,resp)=>{
    let qrId = req.params.id;
    let qr =`SELECT * FROM users where id=${qrId}`;
    db.query(qr,(err,results)=>{
        if(err){
            console.log(err, Error);
        }
        if(results.length>0){
            resp.send({
                message: 'Getting Data by ID',
                data: results
            })
        }
        else{
            resp.send({
                message: 'Requested ID Not Found'
            })
        }
    })
})

//post data
app.post('/user',(req,res)=>{
    // console.log(req.body,'Post Data Success');
    let fullName = req.body.fullname;
    let eMail = req.body.email;
    let Mobile = req.body.mobile;

    let qr=`insert into users(fullname,email,mobile) value('${fullName}', '${eMail}','${Mobile}')`;
    db.query(qr,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message: 'User inserted Successfully',
            data: results
        })
    })
})

//update data
app.put('/user/:id',(req,res)=>{
    // console.log(req.body,"Data Updated");
    let uID = req.params.id;
    let fullName = req.body.fullname;
    let eMail = req.body.email;
    let Mobile = req.body.mobile;

    let qr=`UPDATE users set fullname='${fullName}', email='${eMail}', mobile='${Mobile}' where users.id=${uID}`;
    db.query(qr, (err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message: 'User updated successfully',
            data: results
        })
    })
})

//delete data
app.delete('/user/:id',(req, res)=>{
    let uID= req.params.id;
    let qr= `delete from users where id=${uID}`;
    db.query(qr,(err,results)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message: 'User deleted successfully',
            data: results
        })
    })
})

app.listen(3000,()=>{
    console.log("Vivek your Server is running on 3000 PORT");
});