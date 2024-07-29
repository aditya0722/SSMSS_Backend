const {Members,Items,Transaction} =require("../mongo")
const mongoose = require('mongoose');
const getAccountDetails = async (req, res) => {
    try {
        const transactions = await Transaction.find();

        const transactionsWithMemberNames = await Promise.all(transactions.map(async (transaction) => {
            let transactionWithMemberName = { ...transaction._doc }; // Create a shallow copy of the transaction object

            if (transaction.memberId) {
                const member = await Members.findById(transaction.memberId).sort({ _id: -1 });
                transactionWithMemberName.name = member ? member.name : "Unknown";
            }

            return transactionWithMemberName;
        }));

        return res.status(200).json({ data: transactionsWithMemberNames });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ data: "Error Occurred" });
    }
}







const addTransaction = async (req, res) => {
    try {
        const { description, ammount, category, date, memberId, type } = req.body;

        // Ensure ammount is a valid number
        if (isNaN(ammount)) {
            return res.status(400).json({ data: "Invalid amount" });
        }
        const lastBalanceRecord = await Transaction.findOne({}).sort({ _id: -1 }).limit(1);

        let currentBalance = lastBalanceRecord ? lastBalanceRecord.balance : 0;
        
        // Update balance based on transaction type
        if (type === 'Income') {
            currentBalance += Number(ammount);
        } else if (type === 'Expenditure') {
            currentBalance += Number(ammount); // Subtract for expenditure
        } else {
            return res.status(400).json({ data: "Invalid transaction type" });
        }
        let balance=currentBalance;
        // Create a new transaction object
        const transactionData = {
            ammount: Number(ammount),
            type,
            description,
            date: date || new Date(),
            category,
            balance
        };

        // If memberId is a valid ObjectId, include it
        if (mongoose.Types.ObjectId.isValid(memberId)) {
            transactionData.memberId = memberId;
        }

        const tran = new Transaction(transactionData);
        await tran.save();

        return res.status(200).json({ data: "success" });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ data: "Error Occurred" });
    }
};








const DeleteTransaction=async (req,res)=>{
    try{
    const {id}=req.params;
    console.log(id)
    const member= await Transaction.findById(id)
    if(!member){
        return res.status(404).json({ data: "Member Not Found" });
    }
    await Transaction.findByIdAndDelete(id);
    return res.status(200).json({ data: "success" });
    }
    catch(e){
        return res.satus(500).json({msg:"Internal Server Error"});     
    }
}
const UpdateTransaction=async(req,res)=>{
    try{
       
     
        const {id}=req.params;
        let {description, ammount, category, date, memberId, type }=req.body;
        const transac= await Transaction.findById(id);

        
        if(!transac){
            return res.status(400).json({msg:"Transaction Not Found"});        
        }
        if(category!=="Donations"){
            memberId=null;
        }
        transac.description=description||transac.description;
        transac.ammount=ammount||transac.ammount;
        transac.category=category||transac.category;
        transac.date=date||transac.date;
        transac.memberId=memberId;
        transac.type=type||transac.type;
        transac.save();
        return res.status(200).json({ data: "success" });
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:"Internal Server Error"});      
    }
}

module.exports={getAccountDetails,addTransaction,DeleteTransaction,UpdateTransaction}