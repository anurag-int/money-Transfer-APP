const express = require("express");
const app = express();
app.use(express.json());
const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.auth = async(req, res, next) => {
    try{
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer", "");
        if(!token){
            return res.status(401).json({
                success : false,
                message : `Token is missing`
            });
        }
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }catch(err){
            return res.status(401).json({
                success : false,
                message : `Token is invalid`
            });
        }
        next();
    }catch(err){
        console.log(err.message);
        return res.status(401).json({
            "success" : false,
            "message" : `Something went wrong while validating the token`
        })
        
    }
}