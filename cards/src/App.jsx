import React from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Products from './Shop/Products'
import Login from './Auth/Login'
import Signup from './Auth/Signup'
import Profile from './Auth/Profile'

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path='/products' element={<Products/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/profile' element={<Profile/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App