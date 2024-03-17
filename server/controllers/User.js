const User = require("../models/User");
const z = require("zod");
const jwt = require("jsonwebtoken");
const { use } = require("../routes/user");
require("dotenv").config();

const passwordSchemaCheck = z.string().min(6).refine(password => 
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password),
    {
        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
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


        return res.status(200).json({
            success : true,
            "msg" : "User Created Successfully",
            "token" : token
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

    const { userName, password } = req.body;
    
    //validation-1
    if(!userName || !password) return res.status(400).json({ success : false, "msg" : "All field are required" })

    const user = User.findOne({email});
    if(!user){
        return res.status(401).json({ success : false, "msg" : "User Not Exists" })
    }

    //validation-2 - jwt
    //generating JWT - token
    const token = jwt.sign(
        {
            email : user.userName,
            id : user._id,
            
        }
    );
    
    if(!validJWT){return res.status(401).json({ success : false, "msg" : "Invalid JWT" })}


    //validation -3 
    const ifPasswordCorrect = await User.findOne({ email }, { password })    
    if(!ifPasswordCorrect) return res.status(401).json({ success : false, "msg" : "Invalid Credentials" })

    return res.status(200).json({
        success : true,
        "msg" : "Successfully Login"
    })
}


exports.updateInfo = async(req, res) => {
    
}

