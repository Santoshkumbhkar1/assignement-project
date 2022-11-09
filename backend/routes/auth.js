
const express = require('express');
const router = express.Router();
const  tokenChecker  = require('../middleware/tokenChecker');
const  User  =   require('../models/candidate');
const {body,validationResult}  = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt   = require('jsonwebtoken');
const config  = require('config');


// 2. Login user 
router.post('/',
[
    body('email', 'Enter vaild Email').isEmail(),
    body('password', 'Password is required.').isLength({min:2}),
],
async (req, res ) => {
     const errors = validationResult(req);
     if(!errors.isEmpty()){
         return res.status(400).json({error:errors.array()})
     }
     const {email,password} = req.body;
     
      try {
 
          let user = await User.findOne({email});
          if(!user){
              return res.status(401).json({error:[{msg:"Please Login with correct credential"}]});
          }
          let correctPass  = await bcrypt.compare(password, user.password)
          if(!correctPass){
              return res.status(401).json( {error:[{msg:"Please Login with correct credential"}]});
          }

         const payload ={
             user : user.id,
         } 

         // Here constraint is option but i am putting here.
          jwt.sign( 
          payload, 
          "santosh",
          {expiresIn:6000},
          (error,token)=>{
            if(error) return error;
            res.json({token});
          }
          )
     }

     catch (error) {
          console.error(error.messeage);
          res.status(500).json({error:[{msg:"Server error."}]})
     }
 
 });
 
// Get User
router.get('/',tokenChecker,
async(req, res )=>{
  
  try {
    const user = await User.findById(req.user).select("-password");
    if(!user) return res.status(401).json({error:[{msg:"Invalid credentials."}]})
     res.json(user);
      
  } catch (error) {
      res.status(500).json({error:[{msg:"Server error."}]})
  }
})


module.exports = router;