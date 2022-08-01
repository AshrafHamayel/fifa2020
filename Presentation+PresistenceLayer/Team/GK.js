

const express = require('express');
const authenticate = require('../../BusinessLayer/authenticate'); /////  1
const db = require('../../BusinessLayer/databaseConect').db;


const appl=express.Router();


appl.use(authenticate);///       2

appl.get('/addGK',(req,res)=>{

  var GK = '%'+req.query.GK+'%';
  

  var ema=req.session.user;
    let sql = 'SELECT * FROM teamposition WHERE email =?';
    db.query(sql,[ema], function (err, result) {

      if (err) throw err;

      if(result !='')
      {
     
  /////////////////    GK  //////////////////////////////////
  let GKs = "SELECT * FROM players WHERE lName like ? and position = 'GK' and available ='y'";
  db.query(GKs,[GK], function (err, result) {
    
 if (err)
 {
   res.json("GK cannot be added")

  }

else
{
  ////////
  var GKss = "UPDATE players SET available = 'n' WHERE lName like ?";
  db.query(GKss,[GK], function (err, result) {

    if (err)
    res.json("Error IN Added")

     else 
     {

    //
    var GKsss = 'UPDATE teamposition SET GK = ? WHERE email =?';
          db.query(GKsss,[req.query.GK,ema], function (err, result) {

      if (err)
      res.json("GK add NOT  in database")

       else 

       res.json("GK add in database")

     
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