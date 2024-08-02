const express=require("express")
const {addMonthlyFee,addAttendance}=require("../controllers/AttendanceFees")
const route=express.Router();

route.post("/addmonthlyfee",addMonthlyFee)
route.post("/addAttandance",addAttendance)
module.exports =route;

