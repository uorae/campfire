//import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import './App.css'
import Home from './pages/Home'
import Inventory from './pages/Inventory'

function App() {

  return (
    <>
      <BrowserRouter>
      
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/inventory' element={<Inventory />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
