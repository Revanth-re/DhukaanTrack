const express=require("express")
const dotenv=require("dotenv").config()
const jwt=require("jsonwebtoken")

const VerifyToken=(req,res,next)=>{

    // const token = req.headers.authorization;
    const token = req.headers.authorization.split(" ")[1];
    console.log(token,"this is token");
    
    // console.log(token,"helloRebb");
    


    
//   if (!token) return res.status(401).json({ message: "No token provided" });


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decoded,"decoded");
    
    req.userId = decoded._id;
    console.log(req.userId,"req_user_id");
    
     // store user ID from token
    next();

  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });

  }





}



module.exports=VerifyToken