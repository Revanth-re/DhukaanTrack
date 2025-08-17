import React, { useEffect, useState } from "react";
import axios from "axios";
import MoreDetails from "../Components/MoreDetails";
import BestSellers from "./BestSellers";
import SalesPage from "../Components/SalesPage";
import { useNavigate } from "react-router-dom";
const About = () => {
  const Navigate=useNavigate()
  const [AllData, setAllData] = useState([]);
  const[Details,setDetails]=useState([])
  const[count,setCount]=useState(1)
  const[decreaseCount,setDecrease]=useState(-1)
  const [searchTerm,setSearchTerm]=useState("")
const [category, setCategory] = useState("All");

  // filter logic
  
  // const navigate=useNavigate()

  
    // const FinalData = {...HandleProducts,base64,inpValue };
const data=JSON.parse(localStorage.getItem("userToken")) 
console.log(data,"datauser");

const userToken=data.token
// console.log(userToken,"usertoken");
 const FetchingData=async()=>{
   await axios.get("http://localhost:5000/api/getAll",{
    headers: { Authorization: `Bearer ${userToken}` }
   }
  ).then((response) => {
      console.log();

      setAllData(response.data);
    });
}
  useEffect(() => {
   FetchingData()
  }, []);



  //category filteration
console.log(category,"category");

  const filteredData = AllData.filter(
  (p) =>
    (category === "All" || p.productCategory === category) &&
    p.productname.toLowerCase().includes(searchTerm.toLowerCase())
);




  console.log(AllData,"ALLDATA");
const increase = async (item, e) => {
  e.stopPropagation();

  // Safely calculate new count
  
  setCount(+1); // Update local state

  const itemQuant = item.productQuantity;

  try {
    const response = await axios.put(
      `http://localhost:5000/api/update/${item._id}`,
      {
        counter: count,
        quantity: itemQuant+1
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    );

    console.log("Updated successfully:", response.data);
    FetchingData();
  } catch (err) {
    console.error("Error updating:", err);
  }
};

    

    


  const decrease=async(item,e)=>{
    e.stopPropagation()

    setDecrease(-1)
// console.log(count);
    // console.log(item);
    console.log(decreaseCount);
    
    const currValue=item.productQuantity
    console.log(currValue,"value");
    
    
    const response =await axios.put(`http://localhost:5000/api/updateDec/${item._id}`, {counter:decreaseCount}
      , { headers: { "Content-Type": "application/json" } }
    ).then((res)=>console.log(res)
    ).catch((err)=>console.log(err)
    )
    console.log(response);
    FetchingData()
    
    

  }
  const Delete=async(item,e)=>{
        e.stopPropagation()

    console.log(item._id);
    const confirmation=confirm("are you sure to delete product")
    if (confirmation) {
       const response =await axios.delete(`http://localhost:5000/api/delete/${item._id}`)
    .then((res)=>  FetchingData()
    ).catch((err)=>console.log(err)
    )
    }else{
      alert("you cancleed your delete")
    }
    
    
    console.log(response);
  
    

  }

  const AllDetails=async(item,e)=>{
            e.stopPropagation()

console.log(item._id,"shgduse");

    //  const goToDetails = (item) => {
    
  // };
const response=await axios.get(`http://localhost:5000/api/MoreDetails/${item._id}`).then((res)=>setDetails(res.data)
)
console.log(response,"sijhijs9");
console.log(Details);
Navigate(`/MoreDetails/${item._id}`);


  console.log(AllData,"this is all data");
    

  }

  return (
    <div>
      
      <div className="mt-30 mb-30">
      
        <BestSellers ></BestSellers>
        </div>
     
      <div className="p-4 ">




<div className="mb-10 flex flex-col md:flex-row gap-4 md:gap-6 w-full">
  {/* Category Select */}
  <select
    onChange={(e) => setCategory(e.target.value)}
    className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="">Choose Category</option>
    <option>All</option>
    <option>Biscuits</option>
    <option>Stationery</option>
    <option>Cosmetics</option>
    <option>Snacks & Chips</option>
    <option>Chocolates</option>
    <option>Bathroom Essentials</option>
    <option>Edible Oils</option>
    <option>Others</option>
  </select>

  {/* Search Bar */}
  <input
    type="text"
    placeholder="🔍 Search products..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full md:w-2/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
  />
</div>


          

        <h1 className="text-2xl font-bold text-center mb-6">


          Available Products


        </h1>

<div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mb-20">
 {filteredData.length>0?<>
  {
  filteredData.map((item) => (
    <div onClick={(e)=>AllDetails(item,e)}
      key={item._id}
      className="bg-white border-1 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* Product Image */}
      <img
        src={item.base64}
        alt={item.productname}
        className="h-32 sm:h-40 md:h-48 w-full object-cover border-1 rounded"
      />

      {/* Product Info */}
      <div className="p-2 sm:p-3 md:p-4">
        <h2 className="text-sm sm:text-base md:text-lg font-semibold">
          {item.productname}
        </h2>
        <p className="text-[10px] sm:text-xs md:text-sm text-black">
          {item.productCategory}
        </p>

        <p className="text-xs sm:text-sm text-gray-700 mt-1">
          Expiry:{" "}
          <span className="font-bold text-blue-800">{item.ProductExpiry}</span>
        </p>

        <div className="mt-2 flex justify-between items-center text-[10px] sm:text-sm">
          <span className="text-green-600 font-bold">
            SellingPrice: {item.productSellingPrice}
          </span>
          <span className="text-red-500 font-bold">
            ActualPrice: {item.productActualPrice}
          </span>
        </div>

    
       <SalesPage data={item}></SalesPage>
       {/* {item.inpValue*item.productSellingPrice-item.productQuantity*item.productSellingPrice<=0?<>
       
       </>:<p  className="font-bold  text-black-300 text-xl sm:text-sm mt-1">

  CurrentSales:{item.inpValue*item.productSellingPrice-item.productQuantity*item.productSellingPrice}
</p>} */}


        {/* Action Buttons */}
        <div className="flex flex-wrap gap-1 sm:gap-2 mt-3">
          <button
            onClick={(e) => decrease(item,e)}
            className="bg-blue-600 hover:bg-yellow-700 text-white text-xs sm:text-sm py-1 px-2 sm:py-2 sm:px-4 rounded"
          >
            -
          </button>
          <span className="font-bold text-xs sm:text-sm flex items-center">
            {item.productQuantity}
          </span>
          <button
            onClick={(e) => increase(item,e)}
            className="bg-green-600 hover:bg-red-700 text-white text-xs sm:text-sm py-1 px-2 sm:py-2 sm:px-4 rounded"
          >
            +
          </button>
          <button
            onClick={(e) => Delete(item,e)}
            className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm py-1 px-2 sm:py-2 sm:px-4 rounded ml-auto"
          >
            Delete


          </button>
        </div>
      </div>
      <MoreDetails productData={Details}></MoreDetails>

     
    </div>
  ))}</>:<>no products found</>}
 
 
</div>


      </div>
     
    </div>
  );
};

export default About ;
