

const express = require('express');
const authenticate = require('../../BusinessLayer/authenticate'); /////  1
const db = require('../../BusinessLayer/databaseConect').db;


const appl=express.Router();


appl.use(authenticate);///       2

appl.get('/addCB1',(req,res)=>{

  var CB1 = '%'+req.query.CB1+'%';
  

  var ema=req.session.user;
    let sql = 'SELECT * FROM teamposition WHERE email =?';
    db.query(sql,[ema], function (err, result) {

      if (err) throw err;

      if(result !='')
      {
     
  /////////////////    LB  //////////////////////////////////
  let LBs = "SELECT * FROM players WHERE lName like ? and position like '%CB%' and available ='y'";
  db.query(LBs,[CB1], function (err, result) {
    
 if (err)
 {
   res.json("CB1 cannot be added")

  }

else
{
    
  ////////
  var LBss = "UPDATE players SET available = 'n' WHERE lName like ?";
  db.query(LBss,[CB1], function (err, result) {

    if (err)
    res.json("Error IN Added")

     else 
     {

    //
    var GKsss = 'UPDATE teamposition SET CB1 = ? WHERE email =?';
          db.query(GKsss,[req.query.CB1,ema], function (err, result) {

      if (err)
      res.json("CB1 add NOT  in database")

       else 

       res.json("CB1 add in database")

     
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