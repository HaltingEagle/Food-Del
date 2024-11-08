import React from 'react'
import Navbar from './components/nabvar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import {Routes, Route} from 'react-router-dom'
import List from './pages/list/List'
import Order from './pages/order/Order'
import Add from './pages/add/Add'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path='/list' element={<List/>}/>
          <Route path='/orders' element={<Order/>}/>
          <Route path='/add' element={<Add/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App