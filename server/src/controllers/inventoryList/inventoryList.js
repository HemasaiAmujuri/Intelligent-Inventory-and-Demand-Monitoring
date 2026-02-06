const InventoryProductsSchema = require("../../models/InventoryProducts/inventoryProducts")


const getInventoryProducts = async(req,res) => {
     try{
        const data = await InventoryProductsSchema.find();   //return all products
        const count = await InventoryProductsSchema.countDocuments()  //count all products 
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

      const existingInventory = await InventoryProductsSchema.findOne({ name : name });   //check product exist or not


      if(existingInventory){
         existingInventory.currentStock += Number(quantity);    //if exist add quantity
         await existingInventory.save();  //data updated in existing product
         return res.status(200).json({ success : true, data : existingInventory, message : "Data updated successfully"})
      }


      const data = await new InventoryProductsSchema({ name, category, currentStock : quantity, reOrderPoint : Number(reOrderPoint) });
      await data.save();   //create new document if product not exist
      return res.status(200).json({ success : true, data : data, message : "Data Saved Successfully"})
   }catch(err){
      return res.status(500).json({ success : false, message : err.message })
   }
}


const getCriticalInventoryAlerts = async(req,res) => {
     try{
        const data = await InventoryProductsSchema.find()
        let criticalProducts = data.filter((item) =>   // filter critical items 
           item.currentStock < item.reOrderPoint
      )
        const count = criticalProducts.length;
        return res.status(200).json({ success : true, count : count, data : criticalProducts, message: "Critical inventory alerts fetched successfully",})

        }catch(err){
         return res.status(500).json({ success : false , message : err.message})
        }
     };


const getAllProductNames = async(req,res) => {
     try{
        const data = await InventoryProductsSchema.find();
        const productNames = data.map((item) => {   // store all product names in an array
           return item.name;
        });
        const uniqueProductNames = [...new Set(productNames)];   // remove duplicate product names
        return res.status(200).json({ success : true, data : uniqueProductNames, message : "Data Received Successfully"})
     }catch(err){
        return res.status(500).json({ success : false, message : err.message})
     }
}


module.exports = {
   getInventoryProducts,
   addInventoryProducts,
   getCriticalInventoryAlerts,
   getAllProductNames };