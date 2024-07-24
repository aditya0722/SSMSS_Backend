const express=require("express")
const router=express.Router();
const {forgotPassword,login,updatePassword,members} =require("../Controllers/login")


router.route("/").post(login)
router.route("/forgotPassword").post(forgotPassword);
router.route("/updatePassword").post(updatePassword);
router.route("/members").get(members);
module.exports=router;