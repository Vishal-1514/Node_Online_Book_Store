const jwt=require('jsonwebtoken');
require('dotenv').config;

const jwtAuthMiddleware=(req,res,next)=>{
    const token=req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(500).json({message:'unauthorized'})
    }
    try{
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decode
        next();
    }catch(err){
        console.log(err);
        return res.status(500).json({error:'internal server error'})
    }
}
const genratToken=(userData)=>{
    return jwt.sign(userData,process.env.JWT_SECRET)
}

module.exports={jwtAuthMiddleware,genratToken}