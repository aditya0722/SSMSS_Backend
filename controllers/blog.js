const cloudinary = require('../cloudinaryConfig');
const path = require('path');
const fs = require('fs');
const { Blog } = require("../mongo");
const Blogpost = async (req, res) => {
    const { title, description, date, location } = req.body;
    const imageFile = req.file;
    let imageUrl = null;

    try {
        if (imageFile) {
            // Upload image to Cloudinary
            const uploadedResponse = await cloudinary.uploader.upload(imageFile.path, {
                upload_preset: 'ml_default',
                resource_type: 'image'
            });

            // Remove the image file from the server after uploading
            fs.unlinkSync(imageFile.path);

            imageUrl = uploadedResponse.secure_url;
        }

        const blog = new Blog({
            imageUrl,
            title,
            description,
            date,
            location
        });

        await blog.save();
        return res.status(200).json({ data: "Success" });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ data: "Internal Server Error" });
    }
};
const deleteBlog = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const result = await Blog.findByIdAndDelete(id)
        if (!result) {
            res.status(500).json({ data: "Cammot Find the blog" });
        }
        res.status(200).json({data:"success"});
    } catch (e) {
        console.log(e);
        res.status(500).json({ data: "Internal server Error" });
    }
}
const blogs = async (req, res) => {
    try {
        const data = await Blog.find().sort({ _id: -1 });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: `${error}` });
    }
};


const updateBlog = async (req, res) => {
    const { _id } = req.params;
    const { title, description, date, location } = req.body;
    const imageFile = req.file;
    console.log(_id)
    let imageUrl = null;
    try {
        const blog = await Blog.findById(_id);
        if (!blog) {
            return res.status(500).json({ data: "cannot Find Blog" })
        }

        if (imageFile) {
            // Upload image to Cloudinary
            const uploadedResponse = await cloudinary.uploader.upload(imageFile.path, {
                upload_preset: 'ml_default',
                resource_type: 'image'
            });

            // Remove the image file from the server after uploading
            fs.unlinkSync(imageFile.path);

            imageUrl = uploadedResponse.secure_url;
        }

        
            blog.imageUrl=imageUrl || blog.imageUrl;
            blog.title=title || blog.title;
            blog.description=description || blog.description;
            blog.date=date || blog.date;
            blog.location=location|| date.location
    

        await blog.save();
        return res.status(200).json({ data: "Success" });
    } 
    catch (e) {
       
        console.error(e);
        if (!res.headersSent) { // Ensure headers are not sent before sending a response
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = { Blogpost, blogs, deleteBlog,updateBlog }