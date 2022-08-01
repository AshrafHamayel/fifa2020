const express = require('express');
const authenticate = require('../BusinessLayer/authenticate');


const appl=express.Router();




appl.use(authenticate);

appl.get('/logout',(req,res) => {
    //res.redirect('/login/login');
    req.session.destroy();
  res.send(" logout done ");
});




module.exports=appl;