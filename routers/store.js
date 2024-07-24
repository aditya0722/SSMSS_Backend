const express=require("express");
const {addItem,displayItems,DeleteItem,UpdateItem}=require("../controllers/store")
const router=express.Router();
router.get("/store",displayItems);
router.post("/addItem",addItem);
router.delete("/deleteItem/:id",DeleteItem);
router.put("/updateItem/:id",UpdateItem);
module.exports= router;