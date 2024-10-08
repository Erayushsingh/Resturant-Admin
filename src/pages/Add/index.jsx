import React, { useState } from 'react'
import './index.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'

const Add = () => {
  
  const url="http://localhost:8001"
  const [image,setImage]=useState(false);
  const [data,setData]=useState({
    name:"",
    description:"",
    price:"",
    category:""
  })

  const onChangeHandler=(e)=>{
    const name=e.target.name;
    const value=e.target.value;

    setData({
      ...data,
      [name]:value
    })

  }

  const onSubmitHandler=async (e)=>{
     e.preventDefault();
     const formData=new FormData();
     formData.append("name",data.name);
     formData.append("description",data.description);
     formData.append("price",Number(data.price));
     formData.append("category",data.category);
     formData.append("image",image);

     const responsed=await axios.post(`${url}/api/food/add`,formData)
     if(responsed.data.success){
      setData(
        {
          name:"",
          description:"",
          price:"",
          category:"Salad"
        }
      )
      setImage(false);
      toast.success(responsed.data.message)
     }
    else{
      toast.error(responsed.data.message)
    }
    }


  return (
    <div className='w-[70%] ml-[25px] mt-[50px] text-[#d6d6d font-[16px]'>
       <form onSubmit={onSubmitHandler} className='gap-[20px]'>
          <div className="flow-col">
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img className='w-[120px]' src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />
          </div>
          <div className="flow-col w-[60%] mt-3">
            <p>Product Name</p>
            <input onChange={onChangeHandler} value={data.name} className="p-[10px] border-2 rounded-md border-[#c2dabf]" type="text" name='name' placeholder='Type Here' />
          </div>

          <div className="flow-col w-[60%] mt-3">
            <p>Product Description</p>
            <textarea onChange={onChangeHandler} value={data.description}  className="p-[10px] border-2 rounded-md border-[#c2dabf]" name="description" rows="6" placeholder='Write content here'></textarea>
          </div>

          <div className='mt-4 flex gap-[30px]  '>
               <div >
                   <p>Product Category</p>
                   <select value={data.category} onChange={onChangeHandler} className='w-[160px] p-2 mt-2 border-2 rounded-md border-[#c2dabf]' name="category">
                    <option value="Salad">Salad</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Deserts">Deserts</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Cake">Cake</option>
                    <option value="Pure Veg">Pure Veg</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Noodles">Noodels</option>
                   </select>
               </div>
               <div>
               <p>Product Price</p>
                <input onChange={onChangeHandler} value={data.price}  className="border-2 rounded-md border-[#c2dabf] mt-2 p-2" type='number' name='price' placeholder='$20'/>
               </div>
          </div>
          <button className="p-2 text-white bg-black cursor-pointer w-[120px] mt-2 border-2 rounded-md border-[#c2dabf]" type="submit">ADD</button>
       </form>
    </div>
  )
}

export default Add