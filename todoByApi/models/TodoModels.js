const mongoose=require("mongoose")



const todosSchema = new mongoose.Schema({
  productname: String,
  productCategory: String,
  productQuantity: Number,
 
  productActualPrice: Number,
  productSellingPrice: Number,
  ProductExpiry: String,
  base64: String, // Image in Base64
  inpValue:Number,
  uploadedBy:String
});

const kathasData = new mongoose.Schema({

   customerName: String,
    items: String,
    totalMoney: Number,
    moneyGiven: Number,
    remainderDate: String,
    uploadedBy:String,
    paymentStatus:String

});
const users=new mongoose.Schema({

  name:String,
  password:String,
  number:String
  

})
const todosModel=mongoose.model("todo",todosSchema)
const userModel=mongoose.model("usersData",users)
const kathasModel=mongoose.model("kathasData",kathasData)
module.exports={todosModel,userModel,kathasModel}

 