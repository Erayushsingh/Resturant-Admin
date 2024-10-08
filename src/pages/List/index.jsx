import React, { useEffect, useState } from 'react'
import './index.css'
import axios from 'axios'
import { toast } from 'react-toastify';


const List = () => {

  const [list, setList] = useState([]);

  const url = "http://localhost:8001"

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`)
  
    
    if (response.data.success) {
      setList(response.data.data)
    }
    else {
      toast.error("Error")
    }
  }


const removefood= async (foodId)=>{
    
    const response=await axios.delete(`${url}/api/food/remove/${foodId}`)
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message)
    }
    else{
      toast.error("Error")
    }
}



  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className='m-6 '>
      <p className='text-2xl text-red-700 font-bold'>All Foods List</p>
      <div className='mt-3'>
        <div className='table-template text-center bg-[#f9f9f9]' >
            <b>Images</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return(
           <div key={index} className='table-template text-center'>
              <img className='w-[150px]' src={`${url}/images/`+item.image}/>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={()=>removefood(item._id)} className='cursor-pointer'>X</p>
           </div> 
          )
        })}
      </div>
    </div>
  )
}

export default List