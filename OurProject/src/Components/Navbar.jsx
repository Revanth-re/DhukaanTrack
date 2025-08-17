
import { useEffect, useState } from "react";
import { FaUserCircle, FaSearch, FaBell, FaHome, FaListUl, FaHeart, FaCog } from "react-icons/fa";
import axios from "axios"
import {Link, useNavigate} from "react-router-dom"
import { TbFileReport } from "react-icons/tb";
import {Badge} from "react-bootstrap"
export default function NavbarLayout() {
 const tokenFromLs=JSON.parse(localStorage.getItem("userToken"))





  const [AllData,setAllData]=useState([])
  const Navigate=useNavigate()
//      const NotifyDatafromLs=JSON.parse(localStorage.getItem("NotificationsDetails"))
// console.log(NotifyDatafromLs);
// const data=NotifyDatafromLs.length()
// console.log(data);



  // useEffect(()=>{
 

    
  //  axios.get("http://localhost:5000/api/getAll").then((response) => {
  //     console.log();

  //     setAllData(response.data.slice(4,8));
    
  //   });
  // },[])
  // console.log(AllData);
  
  return (
    <div className="relative mb-10 bg-gray-100">
      
      {/* Top Navbar (Mobile) */}
      
      <div className="fixed top-0 left-0 w-full bg-gray-200 border-b border-black flex items-center justify-between gap-10 px-4 py-2 z-50 sm:hidden ">
        {/* Profile Icon */}
        <div>
          <h1>D-Tracker</h1>

        </div>
        
        <div >
        <button  onClick={()=>Navigate("/profile")}>
<FaUserCircle  className="text-blue-500 text-2xl mr-8" />

        </button>
        <button>
                  <FaBell onClick={()=>Navigate("/notifications")} className="text-blue-500 text-2xl" />
                   
        </button>

        {/* Search Button */}
        {/* <button onClick={()=>Navigate("/search")} className="bg-blue-500 text-white px-4 py-1 rounded-full flex items-center gap-2">
          <FaSearch />
          <span className="text-sm">Search</span>
        </button> */}

        {/* Notification Icon */}

      </div>
      </div>


      {/* Main Navbar (Desktop) */}
      <div className="hidden sm:flex justify-between items-center bg-white border-b border-gray-300 px-6 py-3 fixed top-0 left-0 w-full z-40">
        <h1 className="text-lg font-bold text-black-500">D-Tracker</h1>
        <ul className="flex gap-6 text-gray-600">
          <Link to="/hero"  className="hover:text-blue-500 cursor-pointer">PostTracking</Link>
          <Link to="/about" className="hover:text-blue-500 cursor-pointer">Your-Items</Link>
          <Link to="/Check-Expires" className="hover:text-blue-500 cursor-pointer">Check-Expires</Link>
          <Link to="/ourstore" className="hover:text-blue-500 cursor-pointer">Our-Store</Link>
                                      <Link to="/notifications" className="hover:text-blue-500 cursor-pointer">notifications</Link>
                   <Link to="/profile" className="hover:text-blue-500 cursor-pointer">{tokenFromLs?"profile":"login"}</Link>
                   <Link to="/UdhaarForm">Add Udhaar</Link>

        </ul>
      </div>

     
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 flex justify-around py-2 sm:hidden z-50">
        <button onClick={()=>Navigate("/hero")} className="flex flex-col items-center text-blue-500">
          <FaHome className="text-xl" />
          <Link to="/hero" className="text-xs">Post-Tracking</Link>
        </button>
        <button onClick={()=>Navigate("/about")} className="flex flex-col items-center text-gray-500">
          <FaListUl className="text-xl" />
          <Link to="/about" className="text-xs">Your-Items</Link>
        </button>
        <button onClick={()=>Navigate("/check-Expires")} className="flex flex-col items-center text-gray-500">
          <FaHeart className="text-xl" />
          <Link to="/check-Expires" className="text-xs">Check-Expires</Link>
        </button>
        <button onClick={()=>Navigate("/ourstore")} className="flex flex-col items-center text-gray-500">
          <FaCog className="text-xl" />
          <Link to="/ourstore" className="text-xs">Our-Store</Link>
        </button>
        <button onClick={()=>Navigate("/ourstore")} className="flex flex-col items-center text-gray-500">
          <TbFileReport className="text-xl" />
          <Link to="/udhaarform" className="text-xs">udhaarForm</Link>
        </button>
      
      </div>
    </div>
  );
}
