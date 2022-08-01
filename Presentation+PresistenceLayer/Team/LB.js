

const express = require('express');
const authenticate = require('../../BusinessLayer/authenticate'); /////  1
const db = require('../../BusinessLayer/databaseConect').db;


const appl=express.Router();


appl.use(authenticate);///       2

appl.get('/addLB',(req,res)=>{

  var LB = '%'+req.query.LB+'%';
  

  var ema=req.session.user;
    let sql = 'SELECT * FROM teamposition WHERE email =?';
    db.query(sql,[ema], function (err, result) {

      if (err) throw err;

      if(result !='')
      {
     
  /////////////////    LB  //////////////////////////////////
  let LBs = "SELECT * FROM players WHERE lName like ? and position like '%LB%' and available ='y'";
  db.query(LBs,[LB], function (err, result) {
    
 if (err)
 {
   res.json("LB cannot be added")

  }

else
{
    
  ////////
  var LBss = "UPDATE players SET available = 'n' WHERE lName like ?";
  db.query(LBss,[LB], function (err, result) {

    if (err)
    res.json("Error IN Added")

     else 
     {

    //
    var GKsss = 'UPDATE teamposition SET LB = ? WHERE email =?';
          db.query(GKsss,[req.query.LB,ema], function (err, result) {

      if (err)
      res.json("LB add NOT  in database")

       else 

       res.json("LB add in database")

     
    });
    //
  }
   
  });
  /////

}
});


/////////////////////////////////////////////////////////

      } 
      else 
      {
        res.json("not found email ");
      }
    
    });
    });




module.exports=appl;