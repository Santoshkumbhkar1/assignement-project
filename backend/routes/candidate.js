
const express =require('express');
const Candidate = require('../models/candidate')
const router = express.Router();
const {body ,validationResult}= require('express-validator');
const bcrypt = require('bcryptjs');
const jwt   = require('jsonwebtoken');
const config  = require('config');


// @route  post route/candidate 
// register candidate

  router.post('/',
  [
    body('name', 'Name field is empty').isLength({min:2}),
    body('email', 'Enter vaild Email').isEmail(),
    body('password', 'password should be atleast 6 character long.').isLength({min:2}), 
    body('curr_place', 'password should be atleast 6 character long.').isLength({min:1}),


  ], 
  async(req,res)=>{

     const errors =validationResult(req);

     if(!errors.isEmpty()){
        console.log(res.status(400).json({error:errors.array()}));
        return res.status(400).json({error:errors.array()});
     }
   
     const{name,email,password, curr_place} =req.body;

     try{
        
        console.log('try  me se bol raha hu');
        let cand_user = await Candidate.findOne({email});
        console.log(cand_user);
        if(cand_user ){
            // console.log('try ke if se bol rahga hu');
            return res.status(401).json(({error:[{msq: "User Already Exits" }]}));
        }
     

       cand_user =   new Candidate({
          name ,
          email,
          password,
          curr_place
       
        });

        const  salt = await bcrypt.genSalt(10);
        cand_user.password = await bcrypt.hash(password,salt);
        await cand_user.save();
        console.log(req.body); 
        res.json(req.body);

     
   }
     catch(errors){
        
        console.log(errors.message);
        res.status(500).json({error:[{msg:" catch is responsible yaha server error aa rahi he"}]})
     }
 });
 
    
module.exports =router;