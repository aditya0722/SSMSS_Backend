const express=require("express")
const router=express.Router();
const {Blogpost,blogs,deleteBlog,updateBlog}=require("../controllers/blog");
const upload = require('../multerConfig');
router.post("/postblog",upload.single('image'),Blogpost)
router.get("/blogs",blogs);
router.delete("/deleteBlog/:id",deleteBlog)
router.put("/updateBlog/:_id",upload.single('image'),updateBlog)
module.exports=router;