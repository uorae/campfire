//import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import './App.css'
import Home from './pages/Home'
import Pantry from './pages/Inventory'
import Recipes from './pages/Cookbook'


function App() {

  return (
    <>
      <BrowserRouter>
      
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/pantry' element={<Pantry />} />
          <Route path='/recipes' element={<Recipes />} />
          {/* <Route path='/recipes/:id' element={<RecipeDetail />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
