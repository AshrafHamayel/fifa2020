
  // this is used to get the information needed for the player 
  //(name , age ,position , price ... etc)

  //  ---------each login will be inserted like this 

const express = require('express');
const authenticate = require('../BusinessLayer/authenticate'); /////  1
const db = require('../BusinessLayer/databaseConect').db;

const appl=express.Router();


appl.use(authenticate);///       2
  // Select palyers dpending on part of their name
  appl.get('/find',(req,res)=>{
    
    var lName = '%'+req.query.lName+'%';
    var position='%'+req.query.position+'%';
    var minOverall=req.query.minOverall;
    var maxOverall=req.query.maxOverall;
    var minAge=req.query.minAge;
    var maxAge=req.query.maxAge;

    if (position == 'all'){

      let sql = 'SELECT * FROM players WHERE lName like ?  and overall BETWEEN ? and ?  and age  BETWEEN ? and ?';
    
      db.query(sql,[lName,minOverall,maxOverall,minAge,maxAge], function (err, result) {
  
        if (err) throw err;
        if(result !='')
        {
          res.send(result);
      
        } 
        else 
        {
          
          res.json("not found players ");
        }
      
      });

    }else {

    let sql = 'SELECT * FROM players WHERE lName like ?  and overall BETWEEN ? and ?  and age  BETWEEN ? and ? and position like ?';
    
    db.query(sql,[lName,minOverall,maxOverall,minAge,maxAge,position], function (err, result) {

      if (err) throw err;
      if(result !='')
      {
        res.send(result);
    
      } 
      else 
      {
        
        res.json("not found players ");
      }
    
    });
    }
  });
  
  



module.exports=appl;