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
  memberId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Members",
    required:false
  }
})
const BalanceSchema=mongoose.Schema({
  balance:{
    type:Number,
    required:true
  },
  date: {
    type: Date,
    default: getCurrentISTDate, 
  },
})
const Members = mongoose.model("Members", MembersSchema);
const Items = mongoose.model("Store", StoreSchema);
const Transaction = mongoose.model("Transaction", TransactionSchema);
const Balance=mongoose.model("Balance",BalanceSchema);
module.exports = {Members,Items,Transaction,Balance};
