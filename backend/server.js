const express = require('express');
const connectDB = require('./config/db');
const app = express();

//  ---database connection started from here
connectDB();

//    Init middleware from here kya bache he kya 
 app.use(express.json({extended:false}));
const port = process.env.PORT ||5000

app.use(express.json({extended:false}));

// app.get('/',(req,res)=> res.send("hello world")); // Testing route wether routes are working or not 
// app.post('/resister',(req,res)=> res.send(req.body)); 

app.use('/route/candidate', require('./routes/candidate')); // Route for registration...
app.use('/route/auth', require('./routes/auth'));

// app.post('/resister',(req,res)=> {
//     // console.log(req);
//     // res.json(req.body);

//     // console.log(req.body);
// }); 

app.listen( port ,()=> console.log(`Server is runnig on http://localhost:${port} `));