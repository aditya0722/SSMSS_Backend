const mongo = require('../mongo');
const {Members,Items}=mongo;

//login
const login = async (req, res) => {
  const { contact, password } = req.body;
  try {
    const data = await Members.find({"contact":contact,"password":password});
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
  return res.status(200).json('this is forgotPassword');
};
//updaing the password
const updatePassword = async (req, res) => {
  return res.status(200).json('password Updated');
};

// Api of members for viewing

const members=async (req, res) => {
  try {
    const data = await Members.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
};


module.exports = { login, forgotPassword, updatePassword,members };
