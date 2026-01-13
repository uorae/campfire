//import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import './App.css'
import Home from './pages/Home'
import Inventory from './pages/Inventory'
import Cookbook from './pages/Cookbook'
import ShoppingList from './pages/ShoppingList'

function App() {

  return (
    <>
      <BrowserRouter>
      
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/inventory' element={<Inventory />} />
          <Route path='/cookbook' element={<Cookbook />} />
          <Route path='/shopping' element={<ShoppingList />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
