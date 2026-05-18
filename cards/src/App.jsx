import React from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<h1>Home</h1>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App