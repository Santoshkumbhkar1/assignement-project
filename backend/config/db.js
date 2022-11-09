const mongoose = require('mongoose');
const config   = require('config')
const db  = config.get('url');


// const url ="mongodb+srv://santosh:santosh123@cluster0.s2csche.mongodb.net/?retryWrites=true&w=majority"
 const connectDB = async ()=>{
 try {
     await mongoose.connect(db,{
       useNewUrlParser:true
     });
     console.log("MongoDB has been connected.")
     
 }   catch (error) {
     console.log(error.message);
     //Exit with failure 
     process.exit(1);
 }
} 

 module.exports = connectDB;