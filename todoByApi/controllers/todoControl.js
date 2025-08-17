
const { todosModel,userModel ,kathasModel} = require("../models/TodoModels.js");
const Razorpay=require("razorpay")

// Get all todos

const getKhatas=async(req,res)=>{
  try {
    const Data=await kathasModel.find({uploadedBy:req.userId})
  res.json(Data)
  } 
  
  catch (error) {
    res.status(404).json(error)
  }

}
const deleteKhatas=async(req,res)=>{

  const id=req.params.id
  try {
    
  
const deletedProduct=await kathasModel.findByIdAndDelete(id)
res.json(deletedProduct)

}
catch (error) {
    res.json(error)
  }

}
const updateKhatas=async(req,res)=>{
  
  const id=req.params.id


  console.log(id,"params");
  
  const {money}=req.body
  try {
    
  

const data=await kathasModel.findById(id)
console.log(data)
const updatedStatus="cleared"
const completedMoney=money
const updatedProduct=await kathasModel.findByIdAndUpdate(id,{
  paymentStatus:updatedStatus,
  totalMoney:0



},{new:true})
res.json(updatedProduct)
  }
catch (error) {
    res.json(error)
  }




}
const addKhatas=async(req,res)=>{



  
try {
  const newProduct=await new kathasModel({
  uploadedBy:req.userId,
  ...req.body
})
const NewData=await newProduct.save()
res.status(200).json(NewData)
} 

catch (error) {
  res.status(200).json(error)
}



}
const getAllProducts = async (req, res) => {
 
  
  try {
    const todosData = await todosModel.find({uploadedBy:req.userId});
    console.log(todosData)
    
    res.status(200).json(todosData);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch todos", error });
  }
};


// Add a new todo
const addProducts = async (req, res) => {


  console.log(req.userId,"userid");
  
  try {
    // const data=req.body
    // console.log(data);

    const newProduct = new todosModel({
      uploadedBy: req.userId,
      ...req.body,
       // userId comes from middleware
    })
    const user=await newProduct.save()
    // await newProduct.save();
console.log(user,"user");

    res.json(user);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }}



// Update a todo by ID

// const updateTodos= async (req, res) => {
//   let gettodo;
//   try {
//     const { productQuantity, dupQuantity } = req.body;
//          gettodo = await todosModel.findById(id);
//     const updated=Number(gettodo+1)
//     const Value=Number(dupQuantity)
//     console.log(Value);
    

//     const updatedProduct = await Product.findByIdAndUpdate(
//       req.params.id,
//       { productQuantity:updated, inpValue:Value},
//       { new: true }
//     );
// console.log(updatedProduct);

//     res.json(updatedProduct);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }


// const updateTodos =async (req, res) => {
//    let gettodo;
      
// // console.log(req.body.counter,"this is body");



  
//   try {
//     const id = req.params.id;
//      gettodo = await todosModel.findById(id);
//     res.status(200).json(gettodo);
//   } catch (error) {
//     res.status(400).json({ message: "Failed to get todo", error });
//   }

      
//   try {
//     const {count} = req.body.counter;
//     const {quantity}=req.body.quantity
//     console.log(Number(gettodo.productQuantity+count));
//     console.log(req.body.quantity,"Currvalue");

    
    
//     const updatedTodo=Number(gettodo.productQuantity+req.body.counter)
//     // console.log(updatedTodo,"ekdew");
//     const newValue=Number(gettodo.req.body.quantity-gettodo.req.body.quantity+quantity)
    

//     const id = req.params.id;


//     console.log(id, "Product ID");

//     const updatedProduct = await todosModel.findByIdAndUpdate(
//       id,
//       { productQuantity: updatedTodo },
//    {inpValue:newValue},
//       { new: true }
//     );

//     console.log(updatedProduct, "Updated Document");

//     res.status(200).json(updatedProduct);
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ message: "Failed to update product", error });
//   }
// }
const updateTodos = async (req, res) => {
  try {
    const id = req.params.id;
    const { counter, quantity } = req.body; // Both should be numbers

    // Fetch existing document
    const gettodo = await todosModel.findById(id);
    if (!gettodo) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Calculate new values
    const updatedQuantity = Number(gettodo.productQuantity) + Number(counter);
    const newValue = Number(quantity); // Or your intended calculation

    // Update the product
    const updatedProduct = await todosModel.findByIdAndUpdate(
      id,
      { 
        productQuantity: updatedQuantity,
        inpValue: newValue
      },
      { new: true }
    );

    res.status(200).json(updatedProduct);

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to update product", error });
  }
};

const updateDecrease = async (req, res) => {
  try {
    const id = req.params.id;
    const gettodo = await todosModel.findById(id);

    const count = Number(req.body.counter);
  //  const Currquantity=Number(req.body.quantity)
    const updatedTodo = Number(gettodo.productQuantity) + count // ✅ FIX 2
    // const updatedValue=Number(gettodo.inpValue=Currquantity)

    const updatedProduct = await todosModel.findByIdAndUpdate(
      id,
      { productQuantity: updatedTodo },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: "Failed to update product", error });
  }
};





// Delete a todo by ID
const deletetodos = async(req,res)=>{
      console.log(req,"sdifyheu");
      
const id=req.params.id
console.log(id,"identidty");

    try {
      const deletedProduct=await todosModel.findByIdAndDelete(id)
      res.status(200).json(deletedProduct)
      
    } catch (error) {
      console.log(error)
      
    }

  }


  const expiryDateHandler=async(req,res)=>{
  const {expiry}=req.body.expire

  try {
    const updatedProduct = await todosModel.findByIdAndUpdate(
      id,
      { DateofExpiry: expiry }, // ✅ Only update this field
      { new: true }
    );

    console.log(updatedProduct, "Updated Document");

    res.status(200).json(updatedProduct);
  
  } catch (error) {
    
    console.log(error);
    res.status(400).json({ message: "Failed to update product", error });

  }
  
  }

  const PaymentProcess=async(req,res)=>{
    
const pay = new Razorpay({
    key_id: process.env.RAZOR_PAY_KEY_ID,
    key_secret: process.env.RAZOR_PAY_SECRET_KEY
});
console.log(pay.orders,"pay");




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
  }

  

// Get a single todo by ID
const getOne = async (req, res) => {
  try {
    const {id} = req.params;
    const gettodo = await todosModel.findById(id);
    res.status(200).json(gettodo);
  } catch (error) {
    res.status(400).json({ message: "Failed to get todo", error });
  }
};
const MoreDetails= async(req,res)=>{
      const id=req.params.id

      console.log(id,"wjehwu");

       try {
    const todosData = await todosModel.findById(id);
    console.log(todosData)
    
    res.status(200).json(todosData);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch todos", error });
  }
} 

const LoginController=async(req,res)=>{
 
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

  const signupController=async(req,res)=>{

   
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
    
    
    

  
  
  

  

    

module.exports = {
  getAllProducts,
  getOne,
  addProducts,
  updateTodos,
  updateDecrease,
  deletetodos,
  expiryDateHandler,
  MoreDetails,
  PaymentProcess,
  signupController,
  LoginController,
  addKhatas,
  getKhatas,
  updateKhatas,
  deleteKhatas
};
