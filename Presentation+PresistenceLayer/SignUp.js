
  const express = require('express');
  const db = require('../BusinessLayer/databaseConect').db;



  
  const appl=express.Router();
  

  var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

  function isEmailValid(email) {
      if (!email)
          return false;
  
      if(email.length>254)
          return false;
  
      var valid = emailRegex.test(email);
      if(!valid)
          return false;
  
      // Further checking of some things regex can't handle
      var parts = email.split("@");
      if(parts[0].length>64)
          return false;
  
      var domainParts = parts[1].split(".");
      if(domainParts.some(function(part) { return part.length>63; }))
          return false;
  
      return true;
  }
// insert 



appl.get('/newAccount',(req,res)=>{

var email = req.query.email;
if (isEmailValid(email))
{
var name = req.query.name;
var pass = req.query.password;
let post={name:name,password:pass,email:email};
let sql = 'INSERT INTO all_accounts SET ?';
let sql2 = 'INSERT INTO teamposition email = ?';
db.query(sql2, [email], function (err, result) {

  if (err)
  {
    res.json("Email exists")

  }
  
  else
  {
    res.json("done ")
    
  }
});



let query =db.query(sql,post, (err,result)=>{
  if(err) throw err ;
  //console.log(result);
  res.send('the account is added ...');
  //redirect('/login/login');
     });


}
else{
  res.send('Invalid Email !');

}
});





  module.exports=appl;
