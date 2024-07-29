const {Items,Members,Balance,Blog, Transaction} = require('../mongo');
const cloudinary = require('../cloudinaryConfig');
const path = require('path');
const fs = require('fs');

// Adjust the function to use the file from `req.file`
const registerMember = async (req, res) => {
  try {
    const { name, address, dob, contact, email, joiningDate, role, userType,password } = req.body;
    const imageFile = req.file;
    const foundContact= await Members.findOne({"contact":contact})
    console.log("password",password)
    console.log(foundContact)
    if(foundContact){
      return res.status(500).json({data:"Member Already Exits"})
    }

    let imageUrl = null;

    if (imageFile) {
      // Upload image to Cloudinary
      const uploadedResponse = await cloudinary.uploader.upload(imageFile.path, {
        upload_preset: 'ml_default',
        resource_type: 'image'
      });

      // Remove the image file from server after uploading
      fs.unlinkSync(imageFile.path);

      imageUrl = uploadedResponse.secure_url;
    }

    // Save the member details in MongoDB
    const member = new Members({
      name,
      address,
      dob,
      contact,
      email,
      joiningDate,
      role,
      userType,
      password,
      imageUrl
    });

    await member.save();

    return res.status(200).json("Registration Successful");
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({data:"Error occurred"});
  }
};

const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, dob, contact, email, joiningDate, role, userType } = req.body;
    const imageFile = req.file;
    
    // Find the member by ID
    let member = await Members.findById(id);
    if (!member) {
      return res.status(404).json({ msg: 'Member not found' });
    }

    // If an image file is provided, upload it and update the image URL
    if (imageFile) {
      const uploadedResponse = await cloudinary.uploader.upload(imageFile.path, {
        upload_preset: 'ml_default',
        resource_type: 'image'
      });
      fs.unlinkSync(imageFile.path); // Remove the image file from server
      member.imageUrl = uploadedResponse.secure_url;
    }

    // Update member details
    member.name = name || member.name;
    member.address = address || member.address;
    member.dob = dob || member.dob;
    member.contact = contact || member.contact;
    member.email = email || member.email;
    member.joiningDate = joiningDate || member.joiningDate;
    member.role = role || member.role;
    member.userType = userType || member.userType;

    // Save the updated member
    await member.save();

    return res.status(200).json({ msg: 'Member updated successfully', member });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ msg: 'Error occurred', error });
  }
};
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Members.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json({ data: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
const DashboardContant=async(req,res)=>{
  try {
    let data = {
      users: 0,
      blogs: 0,
      balance: 0
    };
  
    // Count the number of users
    data.users = await Members.countDocuments();
  
    // Get the most recent balance entry
    const latestBalance = await Transaction.findOne({}).sort({ _id: -1 });
    data.balance = latestBalance ? latestBalance.balance : 0;
  
    // Count the number of blogs
    data.blogs = await Blog.countDocuments();
  
    res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }

  
}
module.exports = {registerMember,updateMember,deleteUser,DashboardContant};
