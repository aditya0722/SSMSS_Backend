// routes/receiptRoutes.js
const express = require('express');
const { Receipt } = require("../mongo")

// Route to create a new receipt
const savereceipt = async (req, res) => {
    try {
        const receiptData = req.body;
        console.log(receiptData)
        const receipt = new Receipt(receiptData);
        await receipt.save();
        res.status(201).json(receipt);
    } catch (error) {
        console.error('Error saving receipt:', error);
        res.status(500).json({ message: 'Error saving receipt' });
    }
};
const receiptdata = async (req, res) => {
    try {
        const receipts = await Receipt.find();
        res.status(200).json(receipts);
    } catch (error) {
        console.error('Error fetching receipts:', error);
        res.status(500).json({ message: 'Error fetching receipts' });
    }
};
const updatereceipt = async (req, res) => {
    try {
        const receiptId = req.params.id;
        const updatedData = req.body;
        console.log(receiptId)
        console.log(updatedData)
        // Update the receipt
        const receipt = await Receipt.findByIdAndUpdate(receiptId, updatedData, { new: true });

        if (!receipt) {
            return res.status(404).json({ message: 'Receipt not found' });
        }

        res.status(200).json("success");
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
}
const deletereceipt= async (req,res)=>{
    try{
        const {id}=req.params;
        console.log(id)
        const response=await Receipt.findByIdAndDelete(id);
        if(!response){
           return  res.status(404).json("Id not found")
        }
        res.status(200).json("sucess")
    }catch(error){
        console.log(error)
        res.status(500).json("error")

    }
}


module.exports = { savereceipt, receiptdata, updatereceipt,deletereceipt };
