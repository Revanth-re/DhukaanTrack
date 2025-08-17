const express=require("express")
const router=express.Router()
const {getAllProducts,getOne,addProducts,updateTodos,deletetodos,updateDecrease,
    MoreDetails,expiryDateHandler,addKhatas,getKhatas,deleteKhatas,
    updateKhatas}=require("../controllers/todoControl.js")
const {userModel}=require("../models/TodoModels.js")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const Razorpay=require("razorpay")
const dotenv=require("dotenv").config()
const VerifyToken=require("../Authorization/VerifyToken.js")





console.log(process.env.RAZOR_PAY_SECRET_KEY);

// console.log(process.env.RAZOR_PAY_KEY_SECRET,"secret key");


const pay = new Razorpay({
    key_id: process.env.RAZOR_PAY_KEY_ID,
    key_secret: process.env.RAZOR_PAY_SECRET_KEY
});
console.log(pay.orders,"pay");



router.post("/api/create-order", async (req, res) => {
    try {
        const { amount } = req.body; // Amount in INR
        if (!amount) return res.status(400).json({ message: "Amount is required" });

        const options = {
            amount: amount * 100, // Convert to paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };

        const order = await pay.orders.create(options);
        console.log(order,"hello");
        
        res.status(200).json(order);
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        res.status(500).json({ message: "Error creating order" });
    }
});

// Create Order API
// router.post("/api/create-order", async (req, res) => {
//     try {
//         const { amount } = req.body; // Amount in INR

//         const options = {
//             amount: amount * 100, // Amount in paise
//             currency: "INR",
//             receipt: `receipt_${Date.now()}`
//         };

//         const order = await pay.orders.create(options);
//         res.json(order);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Error creating order");
//     }
// });


router.put("/api/updatekhata/:id",updateKhatas)
router.delete("/api/deletekhata/:id",deleteKhatas)

router.post("/api/addkhatas",VerifyToken,addKhatas)
router.get("/api/getAll",VerifyToken,getAllProducts)
router.get("/api/getkhatas",VerifyToken,getKhatas)

router.post("/api/products",VerifyToken, addProducts)

router.post("/api/signup",async(req,res)=>{

    try {
        const {name,password,number}=req.body

        const HashedPassword=await bcrypt.hash(password,12)
        const newUser=new userModel({name:name,password:HashedPassword,number:number})
const user=await newUser.save()

res.status(200).json(user)

    } catch (error) {
      res.json({message:{error}})  
    }



})

router.post("/api/login",async(req,res)=>{
const {name,password}=req.body

try{
const userData=await userModel.findOne({name:name})
if (userData) {
    const compared=await bcrypt.compare(password,userData.password)

if (compared===true) {

const token=jwt.sign(userData.toObject(),process.env.JWT_SECRET_KEY,{expiresIn:"2400h"})


console.log(token)
res.json({userDetails:{name:name,mobileNum:userData.number},accessToken:{token}})




    
    
} else {
   res.json("error occured in validation") 
}
}else{
res.json("no data found")
}
}catch(error){
console.log(error);

}




}


)
    router.put("/api/update/:id", updateTodos)

  


    router.put("/api/updateDec/:id",updateDecrease)

    router.delete(`/api/delete/:id`,deletetodos)

    router.get("/api/MoreDetails/:id",MoreDetails)

router.get("/api/MoreDetails/:id",getOne)

router.put("/api/expiryItems",expiryDateHandler)




module.exports={router}



