// const config = require('config');
const jwt = require('jsonwebtoken');
const tokenValidator = (req, res, next) =>{

    try {

        const token = req.header('auth-token');
        console.log(token);
        if(!token) return res.status(401).json({msg:" No token is found."});
        const decodedPayload =  jwt.verify(token,'santosh');
        req.user = decodedPayload.user;
        next();
    
} catch (error) {
    res.status(401).json({msg:" catch Token is not found."})
}

}


module.exports = tokenValidator;