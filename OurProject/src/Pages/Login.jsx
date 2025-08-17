// import React, { useState } from 'react'
// import axios from "axios"
// import { useNavigate } from 'react-router-dom'

// const Login = () => {
//     const Navigate=useNavigate()
//     const[loginDetails,setLoginDetails]=useState({name:"",password:""})

// const handleLogin=async(e)=>{

//     console.log("hello")



    
//     e.preventDefault()
//     try {
        
//         const response=await axios.post("http://localhost:5000/api/login",loginDetails)
      
//         console.log(response);
        
//         if(response.status===200){
           
//             const {token}=response.data.accessToken
//             const {name,mobileNum}=response.data.userDetails
           
//             localStorage.setItem("userToken",JSON.stringify({token,name,mobileNum}))
//             console.log("token stored in localstorage");
//             Navigate("/about")
            
            
            
//         }
        
//     } catch (error) {
        
//         console.log(error)
        
//     }




// }
    
//   return (
//     <div>
//      <form action="" className='mt-30' onSubmit={handleLogin}>


//         <input type="text"  onChange={(e)=>setLoginDetails({...loginDetails,name:e.target.value})}               className="w-50 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//  /> <br />
//           <input type="password" onChange={(e)=>setLoginDetails({...loginDetails,password:e.target.value})} className="w-50 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" /> <br />
          
//     <button className='bg-red' type='submit'>Submit</button>
//      </form>
//     </div>
//   )
// }

// export default Login
import React, { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({ name: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        loginDetails
      );

      if (response.status === 200) {
        const { token } = response.data.accessToken;
        const { name, mobileNum } = response.data.userDetails;

        localStorage.setItem(
          "userToken",
          JSON.stringify({ token, name, mobileNum })
        );

        navigate("/about");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={loginDetails.name}
            onChange={(e) =>
              setLoginDetails({ ...loginDetails, name: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={loginDetails.password}
            onChange={(e) =>
              setLoginDetails({ ...loginDetails, password: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >

            Submit
          </button>
          <p className="text-center text-sm text-gray-600">
                           I dont have any account?{" "}
                           <Link to="/Login" className="text-blue-500 hover:underline">
                               Login
                           </Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
