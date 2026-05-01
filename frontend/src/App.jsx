//import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Home from './pages/Home'
import Inventory from './pages/Inventory'
import Recipes from './pages/Cookbook'
import RecipeDetail from './pages/RecipeDetail'
import Layout from './components/Layout'

function App() {

  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/inventory' element={<Inventory />} />
            <Route path='/cookbook' element={<Recipes />} />
            <Route path='/recipes/:id' element={<RecipeDetail />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  )
}

export default App
