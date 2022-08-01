

const mysql =require('mysql');

const db = mysql.createConnection ({
  host: "localhost",
  user: "root", 
   password:"", 
  database: "fifa"
  
});

// conect 
db.connect( (err)=>{
if (err){
  throw err;
}
console.log('MySql Connected ...');

});



module.exports.db = db;

