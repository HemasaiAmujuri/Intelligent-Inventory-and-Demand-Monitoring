const InventoryProductsSchema = require("../../models/InventoryProducts/inventoryProducts")


const getInventoryProducts = async(req,res) => {
     try{
        const data = await InventoryProductsSchema.find();
        const count = await InventoryProductsSchema.countDocuments()
        return res.status(200).json({ success : true, count : count, data : data, message : "Data Retrieved Successfully"})
     }catch(err){
        return res.status(500).json({ success : false, message : err.message})
     }
}


const addInventoryProducts = async(req,res) => {
   try{
      const { name, category, quantity, reOrderPoint } = req.body;

      if( !name || !category || !reOrderPoint){
         return res.status(400).json({ message : "Please, fill all required fields"});
      }

      const existingInventory = await InventoryProductsSchema.findOne({ name : name });


      if(existingInventory){
         existingInventory.currentStock += Number(quantity);
         await existingInventory.save();
         return res.status(200).json({ success : true, data : existingInventory, message : "Data updated successfully"})
      }


      const data = await new InventoryProductsSchema({ name, category, currentStock : quantity, reOrderPoint : Number(reOrderPoint) });
      await data.save();
      return res.status(200).json({ success : true, data : data, message : "Data Saved Successfully"})
   }catch(err){
      return res.status(500).json({ success : false, message : err.message })
   }
}


const getCriticalInventoryAlerts = async(req,res) => {
     try{
        const data = await InventoryProductsSchema.find()
        let criticalProducts = data.filter((item) => 
           item.currentStock <= item.reOrderPoint
      )
        const count = criticalProducts.length;
        return res.status(200).json({ success : true, count : count, data : criticalProducts, message: "Critical inventory alerts fetched successfully",})

        }catch(err){
         return res.status(500).json({ success : false , message : err.message})
        }
     };


module.exports = {
   getInventoryProducts,
   addInventoryProducts,
   getCriticalInventoryAlerts };