const User = require("../models/User");
const Account = require("../models/Account")
const z = require("zod");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const passwordSchemaCheck = z.string().min(6).refine(password => 
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password),
    {
        message: "Minimum 6 digit Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }
);

const userNameSchema = z.string().email();
const firstNameSchema = z.string()
const lastNameSchema = z.string()
const passwordSchema = passwordSchemaCheck


exports.signup = async(req, res) => {
    try{
        const { firstName, lastName, password, userName } = req.body; 

        //validation-1
        

        //validation-2(zod)
        const checkUserName = userNameSchema.safeParse(userName);
        const checkFirstName = firstNameSchema.safeParse(firstName);
        const checkLastName = lastNameSchema.safeParse(lastName);
        const checkPassword = passwordSchema.safeParse(password);

        if(!checkUserName.success){
            return res.status(400).json({
                success : false,
                "msg" : "Not a valid email",
                "field" : "Username"
            })
        }
        if(!checkFirstName.success){
            return res.status(400).json({
                success : false,
                "msg" : "Not a valid Data",
                "field": "First Name"
            })
        }

        if(!checkLastName.success){
            return res.status(400).json({
                success : false,
                "msg" : "Not a valid Data",
                "field": "Last Name"
            })
        }

        if(!checkPassword.success){
            return res.status(400).json({
                success : false,
                "msg" : "Not a valid Data",
                "field": "Password"
            })
        }

        //checking for existing email
        const existingUser = await User.findOne({userName : userName});
        if(existingUser){return res.status(401).json({ success : false, "msg" : "User Already Registered"})}

        const user = await User.create({
            firstName, lastName, userName, password
        })

        await Account.create({
            userId : user._id,
            balance : Math.floor(Math.random() * 10000) + 1
        })

        return res.status(200).json({
            success : true,
            "msg" : "User Created Successfully"
        })


 
    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            success : false,
            "msg" : "Internal Server Error"
        })
    }   
}


exports.signin = async(req, res) => {
    try{
        const { userName, password } = req.body;
    
        //validation-1
        if(!userName || !password) return res.status(400).json({ success : false, "msg" : "All field are required" })

        const user = await User.findOne({ userName });


        if(!user){
            return res.status(401).json({ success : false, "msg" : "User Not Exists" })
        }



        if(password == user.password){
            const token = jwt.sign(
                {
                    userName : user.userName,
                    id : user._id,
                    password : user.password
                },
                process.env.JWT_SECRET,
                {
                    expiresIn : "24h"
                })
    
                user.token = token;
                user.password = undefined;
    
                const options = {
                    expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                    httpOnly : true,
                };
                res.cookie("token", token, options).status(200).json({
                    success : true,
                    token,
                    message : "User login successfully"
                });
        }else{
            return res.status(400).json({
                success : false,
                msg : "Invalid Credentials..."
            })
        }
        
    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            success : false,
            "msg" : "Internal Server Error"
        });
    }

    

    
}

exports.bulk = async(req, res) => {
    try{
        const filter = req.query.filter;
    const users = await User.find({
        $or : [
            {firstName : filter},
            {lastName : filter}
        ]
    })
    if(users.length == 0){return res.status(200).json({
        success : true,
        "msg" : "No Users"
    })}

    const usersWithSelectedFields = users.map(user => ({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName
    }));

    return res.status(200).json({
        success : true,
        users : usersWithSelectedFields 
    })
    }catch(err){
        return res.status(500).json(
            { 
                success : false,
                msg : "Internal Server Error" 
            });
    }
}


exports.updateInfo = async(req, res) => {
    try {
    let { firstName, lastName, password } = req.body;
    
    const id = req.user.id;

    if(firstName){await User.findByIdAndUpdate({_id : id}, {firstName})}
    if(lastName){await User.findByIdAndUpdate({_id:id}, {lastName})}
    if(password){await User.findByIdAndUpdate({_id:id}, {password})}

    return res.status(200).json({
        success : true,
        msg : "Data updated successfully"
    })
        
    } catch (err) {
        return res.status(500).json(
            { 
                success : false,
                msg : "Internal Server Error" 
            });
    }

}

