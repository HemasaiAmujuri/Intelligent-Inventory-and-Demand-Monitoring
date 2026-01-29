const InventoryProductsSchema = require("../../models/InventoryProducts/inventoryProducts")


const getInventoryProducts = async(req,res) => {
     try{
        const data = await InventoryProductsSchema.find();
        return res.status(200).json({ success : true, data : data, message : "Data Retrieved Successfully"})
     }catch(err){
        return res.status(500).json({ success : false, message : err.message})
     }
}


module.exports = getInventoryProducts;