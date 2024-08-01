const express = require('express');
const router = express.Router();
const {receiptdata,savereceipt,updatereceipt,deletereceipt} =require("../controllers/receipt")

router.get("/receipt",receiptdata);
router.post("/savereceipt",savereceipt)
router.put("/updatereceipt/:id",updatereceipt)
router.delete("/deletereceipt/:id",deletereceipt)
module.exports =router