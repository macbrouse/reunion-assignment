const jwt= require('jsonwebtoken')
module.exports = function verifyToken(req,res,next){
    
    const token=req.headers['token']
    if(!token){
        res.send("Access Denied")
    }
    else{
        try{
            req.user= jwt.verify(token,'secretKey')
            next()
        }
        catch(err)
        {
            res.send("Invalid Token")
        }
    }
}
