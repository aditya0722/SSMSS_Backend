require('dotenv').config();
const mongoose = require("mongoose");
const mongoUrl = process.env.DbConnection;

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB connected");
})
.catch((err) => {
  console.error("MongoDB Connection Failed:", err);
});

const getCurrentISTDate = () => {
  const date = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
  const istDate = new Date(date.getTime() + istOffset);
  return istDate;
};
const StoreSchema = mongoose.Schema({
  itemName: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  addedAt: {
    type: Date,
    default: getCurrentISTDate,
    immutable: true 
  }
});
const MembersSchema = mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  contact: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  joiningDate: {
    type: Date,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: false
  }
});
const TransactionSchema=mongoose.Schema({
  ammount:{
    type:Number,
    required:true
  },
  type:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  date: {
    type: Date,
    default: getCurrentISTDate,
    immutable: true 
  },
  category:{
    type:String,
    required:true
  },
  balance:{
    type:Number,
    required:true
  },
  memberId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Members",
    required:false
  }
})

const BlogSchema=mongoose.Schema({
  imageUrl:{
    type:String,
    rwquired:true
  },
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    required:true
  },
  location:{
    type:String,
    required:true
  }
})
const receiptSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contactNumber: { type: String, required: true },
  items: [
      {
          name: { type: String, required: true },
          price: { type: Number, required: true },
          stock: { type: Number, required: true },
          quantity: { type: String, required: true }, // If you prefer to store quantity as a string, otherwise change to Number
          broken: { type: String, default: '' },
          checked:{type:Boolean,default:false}
      }
  ],
  status: { type: String, required: true },
  totalAmount: { type: String, required: true } // If you prefer to store totalAmount as a number, change to Number
});

const Receipt = mongoose.model('Receipt', receiptSchema);
const Members = mongoose.model("Members", MembersSchema);
const Items = mongoose.model("Store", StoreSchema);
const Transaction =mongoose.model("transaction",TransactionSchema)
const Blog =mongoose.model("Blog",BlogSchema)
module.exports = {Members,Items,Transaction,Blog,Receipt};
