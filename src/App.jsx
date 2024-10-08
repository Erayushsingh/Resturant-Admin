import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

   
  const url="http://localhost:8001"
  return (
    <>
      <ToastContainer/>
      <Navbar />
      <hr/>
      <div className='flex'>
      <Sidebar/>
      <Routes>
        <Route path='/add' element={<Add/>}/>
        <Route path='/list' element={<List/>}/>
        <Route path='/orders' element={<Orders url={url} />}/>
      </Routes>
      </div>
    </>
  )
}

export default App