import React, { useEffect, useState } from 'react'
import {toast} from "react-toastify"
import axios from "axios"
import { assets } from '../../assets/assets';

const Orders = ({url}) => {

  const [orders,setOrders]=useState([]);
  const fetchAllOrders=async()=>{
     const response=await axios.get(url+"/api/order/list");
     if(response.data.success ){
      setOrders(response.data.data);
      console.log(response.data.data);
     }
     else{
     toast.error("Error")
     }
  }


  const statusHandler= async (e,orderId)=>{
  const res=await axios.post(url+"/api/order/status",{orderId,status:e.target.value})
  if(res.data.success){
    await fetchAllOrders();
  }
  }

  useEffect(()=>{
  fetchAllOrders() 
  },[])

  return (
    <div className='m-10'>
          <h3 className='font-[600] text-[25px] mb-4'>Order Page</h3>
          <div>
            {orders.map((order,index)=>(
              <div key={index} className='grid grid-cols-[0.5fr,2fr,1fr,1fr,1fr] items-start gap-[30px] border-[1px] text-[14px] border-[gray] text-[#505050] p-4 mb-6'>
                <img src={assets.parcel_icon} alt="" />
                <div>
                  <p className='font-[600]'>
                    {order.items.map((item,index)=>{
                     if(index===order.items.length-1){
                      return item.name + "X" +item.quantity;
                     }
                     else{
                      return item.name + "X" +item.quantity+", "
                     }
                    })}
                  </p>
                  <p className='font-[600] mt-[30px] mb-[5px]'>{order.address.firstName+" "+order.address.lastName}</p>
                  <div className='mb-[10px]'>
                    <p>{order.address.street+", "}</p>
                    <p>{order.address.city+", "+order.address.state+", "+
                      order.address.country+","+order.address.pincode}</p>
                  </div>
                  <p>{order.address.phone}</p>
                </div>
                <p>Items:{order.items.length}</p>
                <p>${order.amount}</p>
                <select 
                onChange={(e)=>statusHandler(e,order._id)} value={order.status}
                className='bg-[#ffe8e4] border-[1px] border-[tomato] w-[150px] p-[10px] outline-none'>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            ))}
          </div>
    </div>
  )
}

export default Orders