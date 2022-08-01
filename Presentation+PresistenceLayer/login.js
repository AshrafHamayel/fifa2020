//  ---------each login will be inserted like this 

const express = require('express');
const db = require('../BusinessLayer/databaseConect').db; // use this line to login to the database 
// const connect = require('./databaseConect')



const appl=express.Router();
// appl.use(connect);




   // Verify login information (email and password)
   appl.get('/login',(req,res)=>{

var email = req.query.email;
var pass = req.query.password;
var sql = 'SELECT * FROM all_accounts WHERE email =? and password =?';
db.query(sql, [email, pass], function (err, result) {

  if (err) throw err;

  if(result !='')
  {
    
    
    req.session.user = email;
    console.log(req.session.user)
    res.send(result);
  }
  
  else{
    res.json("Email or password is incorrect")
    console.error(err);


    

 }
 console.log(`email = ${email} and password = ${pass}`);
});
    });
  //Query a Database

//   con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Result: " + result);
//     });
//   });


module.exports=appl;


