//import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import './App.css'
import Home from './pages/Home'
import Inventory from './pages/Inventory'
import Recipes from './pages/Cookbook'
import RecipeDetail from './pages/RecipeDetail'


function App() {

  return (
    <>
      <BrowserRouter>
      
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/inventory' element={<Inventory />} />
          <Route path='/cookbook' element={<Recipes />} />
          <Route path='/recipes/:id' element={<RecipeDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
