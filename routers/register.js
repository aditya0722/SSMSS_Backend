const express = require('express');
const router = express.Router();
const upload = require('../multerConfig');
const {registerMember,updateMember,deleteUser} = require('../controllers/register');

router.post('/register', upload.single('image'), registerMember);
router.put('/updateUser/:id', upload.single('image'), updateMember);
router.delete('/deleteUser/:id',deleteUser);
module.exports = router;
