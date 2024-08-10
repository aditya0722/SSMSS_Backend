const {Members,Items} =require("../mongo");

const addItem = async (req, res) => {
    try {
      console.log(req.body)
      const { itemName,price,stock,rentPrice } = req.body;
      const foundContact= await Items.findOne({"itemName":itemName})
      console.log(foundContact)
      if(foundContact){
        return res.status(500).json({data:"Item Already Exits"})
      }
      // Save the Item details in MongoDB
      const item = new Items({
        itemName,
        price,
        stock,
        rentPrice
      });
  
      await item.save();
      return res.status(200).json("Item Added Successfully");
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({data:"Error occurred"});
    }
};
const DeleteItem=async(req,res)=>{
  const  {id}  = req.params;
  try{
    const result =await Items.findByIdAndDelete(id);
    if(!result){
      return res.status(500).json({data:"User not found"})
    }
    return res.status(200).json({data:"User Deleted Successfulyy"})
  }catch(e){
    console.log(e)
    return res.status(500).json({data:"Error Occured"})
  }
}
const UpdateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { itemName,price,stock,rentPrice } = req.body;
    console.log(itemName,price,stock)
    const item =await Items.findById(id)
    // Update Item details
    
    item.name = itemName || item.itemName;
    item.price = price || item.price;
    item.stock = stock || item.stock;
    item.rentPrice = rentPrice || item.rentPrice;
    

    // Save the updated member
    await item.save();

    return res.status(200).json({ msg: 'Item updated successfully' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ msg: 'Error occurred'
   });
  }
};
const displayItems=async(req,res)=>{
    try{
        const items= await Items.find().sort({ _id: -1 });
        res.status(200).json(items)
    }catch(error){
        res.status(500).json({data:"Error Occured"})
    }
};
module.exports={addItem,displayItems,DeleteItem,UpdateItem}
  