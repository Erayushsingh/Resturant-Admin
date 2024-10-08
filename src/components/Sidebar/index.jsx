import React from 'react'
import './index.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <>
        <hr/>
        <div className='w-[18%] min-h-screen  border-[#a9a9a9] border-[1.5px] border-t-0'>
            <div className='pt-[50px] pl-[20px] flex flex-col gap-[20px]'>
                <NavLink to='/add' className='sidebar-option'>
                    <img  src={assets.add_icon} alt="" />
                    <p >Add Items</p>
                </NavLink >
                <NavLink to='/list' className='sidebar-option'>
                    <img  src={assets.order_icon} alt="" />
                    <p>List Items</p>
                </NavLink>
                <NavLink to='/orders' className='sidebar-option'>
                    <img  src={assets.order_icon} alt="" />
                    <p>Orders</p>
                </NavLink>
            </div>
        </div>
        </>
        
    )
}

export default Sidebar