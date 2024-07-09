const jwt = require('jsonwebtoken')
require('dotenv').config()

const checkToken  = (req,res,next)=>{
    let token = req.headers.authorization.split(' ')[1]

    if(token === 'null'){
        res.send({message: "unauthorized access... login to continue"})
    }
    else{
        jwt.verify(token,process.env.SECRET,(err,decodedToken)=>{
            if(err){
                res.send({message:"session expired.. login again"})
            }
            else{
                next()
            }
        })
    }
}

module.exports = checkToken