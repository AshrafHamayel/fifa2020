

const express = require('express');
const authenticate = require('../BusinessLayer/authenticate'); /////  1
const db = require('../BusinessLayer/databaseConect').db;


const appl=express.Router();


appl.use(authenticate);///       2

appl.get('/addteam',(req,res)=>{

  
  var LB='%'+req.query.LB+'%';
  var CB1='%'+req.query.CB1+'%';
  var CB2='%'+req.query.CB2+'%';
  var RB='%'+req.query.RB+'%';
  var DM='%'+req.query.DM+'%';
  var CM1='%'+req.query.CM1+'%';
  var CM2='%'+req.query.CM2+'%';

  var LW='%'+req.query.LW+'%';

  var CF='%'+req.query.CF+'%';

  var RW='%'+req.query.RW+'%';


  var ema=req.session.user;
    let sql = 'SELECT * FROM teamposition WHERE email =?';
    db.query(sql,[ema], function (err, result) {

      if (err) throw err;

      if(result !='')
      {
     
      } 
      else 
      {
        res.json("not found email ");
      }
    
    });
    });




module.exports=appl;