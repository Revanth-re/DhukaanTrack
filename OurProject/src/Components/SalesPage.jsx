import React from 'react'
import CurrentSales from './CurrentSales'
import { useState } from 'react'
import MoreDetails from './MoreDetails'



const SalesPage = ({data}) => {
  const[showData,setShowData]=useState(false)
 
    // console.log(data,"dataData");
let currentSales=data.inpValue*data.productSellingPrice-data.productQuantity*data.productSellingPrice
 const totalAmountSpent=data.productSellingPrice * data.productQuantity

  //  const currentSales =
  //     item.inpValue * item.productSellingPrice -
  //     newQuantity * item.productSellingPrice;-

    console.log(currentSales,"sales");
    
  return (
    <div>
       
      {/* {data.productQuantity} */}
        {data.inpValue*data.productSellingPrice-data.productQuantity*data.productSellingPrice<=0?   <p className="font-bold text-xs text-gray-500 sm:text-sm mt-1">
          Total-AmountSpent: {data.productSellingPrice * data.productQuantity}
        </p>: <p className="font-bold text-xs text-gray-500 sm:text-sm mt-1">
          Total-AmountSpent: {data.productSellingPrice * data.inpValue}
        </p>}
        <p className="font-bold  text-black-300 text-lg sm:text-sm mt-1">
          
                    {/* CurrentSales:{data.inpValue*data.productSellingPrice-data.productQuantity*data.productSellingPrice} */}

        </p>
        CurrentSales:{currentSales}

          {/* {data.inpValue*data.productSellingPrice-data.productQuantity*data.productSellingPrice<=0?<>
       
       </>:<p  className="font-bold  text-black-300 text-lg sm:text-sm mt-1">

  CurrentSales:{data.inpValue*data.productSellingPrice-data.productQuantity*data.productSellingPrice || 0}


  
</p>} */}
<div >
{/* <CurrentSales  datas={currentSales}></CurrentSales> */}

{/* <MoreDetails  salesData={data.inpValue*data.productSellingPrice-data.productQuantity*data.productSellingPrice}></MoreDetails> */}
</div>
{/* {showData?<CurrentSales datas={data.inpValue*data.productSellingPrice-data.productQuantity*data.productSellingPrice} ></CurrentSales>:""} */}
    </div>
  )
}

export default SalesPage
