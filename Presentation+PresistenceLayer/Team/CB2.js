

const express = require('express');
const authenticate = require('../../BusinessLayer/authenticate'); /////  1
const db = require('../../BusinessLayer/databaseConect').db;


const appl=express.Router();


appl.use(authenticate);///       2

appl.get('/addCB2',(req,res)=>{

  var CB2 = '%'+req.query.CB2+'%';
  

  var ema=req.session.user;
    let sql = 'SELECT * FROM teamposition WHERE email =?';
    db.query(sql,[ema], function (err, result) {

      if (err) throw err;

      if(result !='')
      {
     
  /////////////////    LB  //////////////////////////////////
  let LBs = "SELECT * FROM players WHERE lName like ? and position like '%CB%' and available ='y'";
  db.query(LBs,[CB2], function (err, result) {
    
 if (err)
 {
   res.json("CB2 cannot be added")

  }

else
{
    
  ////////
  var LBss = "UPDATE players SET available = 'n' WHERE lName like ?";
  db.query(LBss,[CB2], function (err, result) {

    if (err)
    res.json("Error IN Added")

     else 
     {

    //
    var GKsss = 'UPDATE teamposition SET CB2 = ? WHERE email =?';
          db.query(GKsss,[req.query.CB2,ema], function (err, result) {

      if (err)
      res.json("CB2 add NOT  in database")

       else 

       res.json("CB2 add in database")

     
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