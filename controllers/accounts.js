const {Members,Items,Transaction,Balance} =require("../mongo")

const getAccountDetails = async (req, res) => {
    try {
        const transactions = await Transaction.find();

        const transactionsWithMemberNames = await Promise.all(transactions.map(async (transaction) => {
            let transactionWithMemberName = { ...transaction._doc }; // Create a shallow copy of the transaction object

            if (transaction.memberId) {
                const member = await Members.findById(transaction.memberId);
                transactionWithMemberName.name = member ? member.name : "Unknown";
            }

            return transactionWithMemberName;
        }));

        console.log(transactionsWithMemberNames);
        return res.status(200).json({ data: transactionsWithMemberNames });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ data: "Error Occurred" });
    }
}


const getBalance=async(req,res)=>{
    try{
        const data=await Balance.find();
        return res.status(200).json({data:"success"});

    }catch(e){
        return res.status(500).json({data:"Error Occured"});

    }
}
const addTransaction = async (req, res) => {
    try {
        const { description, ammount, category, date, memberId, type } = req.body;

        let tran;
        if (memberId) {
            tran = new Transaction({
                ammount,
                type,
                description,
                date,
                category,
                memberId,
            });
        } else {
            tran = new Transaction({
                ammount,
                type,
                description,
                date,
                category,
            });
        }

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
        console.log(ammount)
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

module.exports={getAccountDetails,getBalance,addTransaction,DeleteTransaction,UpdateTransaction}