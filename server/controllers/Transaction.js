const Account = require("../models/Account");


exports.balance = async(req, res)=>{
    try{
        const id = req.user.id;
        console.log(id)
        const accountDetails = await Account.findOne({userId : id});

        return res.status(200).json({
            success : true,
            "msg" : "Your Balance",
            balance : accountDetails.balance
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            "msg" : "Internal Server Error"
        })
    }
    

}


exports.transfer = async(req, res) => {
    const senderId = req.user.id;
    const { to, amount } = req.body;
    
    if(!to || !amount){return res.status(400).json({success : false, "msg" : "all fields are required"})}

    // receipent Validation
    if(!(await Account.findOne({ userId : to}))){
        return res.status(400).json({
            success : false,
            "msg" : "Invalid account"
        })
    }
    const senderAccount = await Account.findOne({userId : senderId});
    const temp_balance = senderAccount.balance;

    if(senderAccount.balance < amount ){
        return res.status(400).json({
            success : false,
            "msg" : "Insufficient balance"
        })
    }
    
    try{
        await Account.findOneAndUpdate({userId : senderId}, {$inc : {balance : -amount}})
        await Account.findOneAndUpdate({userId : to}, {$inc : {balance : +amount}});
    
        return res.status(200).json({
            success : true,
            "msg" : "Transfer Successful"
        })
    }
    catch(err){
        await Account.findByIdAndUpdate({userId : senderId}, {balance : temp_balance});
        return res.status(500).json({
            success : false,
            "msg" : "Transaction Failed"
        })
    }
    
}