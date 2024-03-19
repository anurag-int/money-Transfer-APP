// ---> Problems that comes while doing transactions
// 1---> all the transaction must commit, no partial commit ---> ex.. if the money deducted from user1 and somehow server down and the money not been credited to user2 bank account, ---> than we need to rollback that transactions.
// 2---> at a time only one transaction needs to done. Ex.. --> lets suppose I have 20 rupees and somehow I want to send to the 2 other users 20 each and If I send both at same time this might created issue. to solve this we need to apply logic that at a time only one transaction must be done.



const mongoose = require("mongoose");
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
    const mongoose = require('mongoose');
    const connection = mongoose.connection;
    const session = await connection.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    if (!req.user || !req.body) {
        return res.status(400).json({ error: "Request is missing user or body" });
    }

    const account = await Account.findOne({userId : req.user.id}).session(session);

    if(!account || account.balance < amount){
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ error: "Insufficient Balance" });
    }

    const toAccount = await Account.findOne({ userId : to }).session(session);

    if(!toAccount){
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ error: "Invalid account" });
    }

    await Account.updateOne({ userId : req.user.id }, { $inc : { balance : -amount } }).session(session);
    await Account.updateOne({ userId : to }, { $inc : { balance : amount } }).session(session);

    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ message: "Transaction successful" });
}
