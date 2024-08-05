const express=require("express")
const {addMonthlyFee,addAttendance,getalldata,updateAttandanceFine,updateMothlyFee}=require("../controllers/AttendanceFees")
const route=express.Router();

route.post("/addmonthlyfee",addMonthlyFee)
route.post("/addAttandance",addAttendance)
route.get("/getalldata",getalldata)
route.post("/updateAttandanceFine",updateAttandanceFine)
route.post('/updateMothlyFee',updateMothlyFee)
module.exports =route;

