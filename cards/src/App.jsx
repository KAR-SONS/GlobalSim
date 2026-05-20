import React from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Products from './Shop/Products'
import Login from './Auth/Login'
import Signup from './Auth/Signup'
import Profile from './Auth/Profile'
import Cart from './Shop/Cart'
import Verify from './Management/Verify'

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path='/products' element={<Products/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/verify' element={<Verify/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App