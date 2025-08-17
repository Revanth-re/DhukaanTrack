const mongoose=require("mongoose")

const ConnectDB=async()=>{
    const uri="mongodb://localhost:27017/"
try {
    await mongoose.connect(uri,{dbName:"TodosConnection"})

    // res.json("database connected")
    console.log("database connected");
    
} catch (error) {
    console.log(error);
    
}



}
module.exports={ConnectDB}