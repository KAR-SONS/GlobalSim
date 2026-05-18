import React from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Products from './Shop/Products'

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path='/products' element={<Products/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App