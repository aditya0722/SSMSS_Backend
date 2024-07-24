const express =require("express");
const router=express.Router();

const {getAccountDetails,getBalance,addTransaction,DeleteTransaction,UpdateTransaction}=require("../controllers/accounts")
router.get("/getAccountDetails",getAccountDetails)
router.get("/getBalance",getBalance)
router.post('/addTransaction',addTransaction);
router.delete("/deletetransaction/:id",DeleteTransaction);
router.put("/UpdateTransaction/:id",UpdateTransaction);
module.exports=router;