const express=require("express")
const route=express.Router();
const getAbsentContact=require('../background')
route.get("/absent-today",getAbsentContact)
module.exports=route