const mongo = require('../mongo');
const {Members,Items}=mongo;

//login
const login = async (req, res) => {
  const { contact, password } = req.body;
  console.log(contact, password )
  try {
    const data = await Members.find({"contact":contact,"password":password});
    console.log(data)
    if (data) {
      return res.status(200).json({
        message: 'details Matched',
        data: data,
      });
    } else {
      return res.status(400).json('not found');
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Server error' });
  }
};
//forgot checking the number exits or not
const forgotPassword = async (req, res) => {
  try{
    

    const {phoneNumber}=req.body;
   const contact=parseInt(phoneNumber)
    const response=await Members.find({contact:contact})
    if(response){
      return res.status(200).json('Found');
    }
    return res.status(400).json("Not Found")
  
    
  }
  catch(error){
    console.log(error);
    res.status(500).json('Internal Server Error');
  }
  
};
//updaing the password
const updatePassword = async (req, res) => {
  try {
    const { phoneNumber, newPassword } = req.body;
    await Members.updateOne({ contact: phoneNumber }, { $set: { password: newPassword } });
    return res.status(200).json('success');
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error');
  }
};


// Api of members for viewing

const members=async (req, res) => {
  try {
    const data = await Members.find().sort({ _id: -1 });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
};


module.exports = { login, forgotPassword, updatePassword,members };
