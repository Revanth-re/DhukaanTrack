import React, { useEffect, useState } from "react";
import axios from "axios";

const OurStore = () => {
  const [AllData, setAllData] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalExpected, setTotalExpected] = useState(0);
  const data=JSON.parse(localStorage.getItem("userToken")) 
console.log(data,"datauser");

const userToken=data.token

  const FetchingData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/getAll",{
    headers: { Authorization: `Bearer ${userToken}` }
   });
      setAllData(response.data);

      // Calculate totals
      let spent = 0;
      let expected = 0;
      console.log(response.data,"data");
      

      response.data.forEach((item) => {
        const actualPrice = parseFloat(item.productActualPrice) || 0;
        const sellingPrice = parseFloat(item.productSellingPrice) || 0;
        const qty = parseFloat(item.productQuantity) || 0;

        spent += actualPrice * qty;
        expected += sellingPrice * qty;
      });

      setTotalSpent(spent);
      setTotalExpected(expected);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    FetchingData();
  }, []);

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">📦 Our Store Summary</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-100 p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold">💰 Total Money Spent</h2>
          <p className="text-2xl font-bold text-blue-800">
            ₹{totalSpent.toFixed(2)}
          </p>
        </div>
        <div className="bg-green-100 p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold">📈 Expected Revenue</h2>
          <p className="text-2xl font-bold text-green-800">
            ₹{totalExpected.toFixed(2)}
          </p>
        </div>
      </div>

    
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {AllData.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow rounded-xl p-4 flex flex-col items-center text-center"
          >
            <img
              src={item.base64}
              alt={item.productname}
              className="w-32 h-32 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-bold">{item.productname}</h3>
            <p className="text-gray-500">Qty: {item.productQuantity}</p>
            <p className="text-sm text-blue-700 font-bold">
              spentAmount: ₹{item.productActualPrice*item.productQuantity} 
            </p>
             <p className="text-sm text-green-500 font-bold">
              Generating-Revenue: ₹{item.productSellingPrice*item.productQuantity} 
            </p>

          </div>
        ))}
      </div>
    </div>
  );
};

export default OurStore;
