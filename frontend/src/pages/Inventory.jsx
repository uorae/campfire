// on add item button click: open form for item, takes in name, quantity, category
import { useState, useEffect } from "react"
import axios from "axios"

import { useNavigate } from "react-router-dom"

function Inventory() {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [selectedItem, setSelectedItem] = useState({})
  const [loading, setLoading] = useState(false)

  const fetchItems = () => {
    axios.get(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/pantry`).then(response => {
      setItems(response.data)
    }).catch((err) => {
      console.error(err)
    })
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const addItems = () => {
    axios.post(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/pantry`, {
    }).then(() => {
      fetchItems();
    }).catch((err) => {
      console.error(err)
    })
  }

  const removeItem = (item_id) => {
    axios.delete(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/pantry/${item_id}`, {
    }).then(() => {
      fetchItems();
    }).catch((err) => {
      console.error(err)
    })
  }

  const clearItems = () => {
    axios.delete(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/pantry`, {
    }).then(() => {      
      fetchItems();
    }).catch((err) => {
      console.error(err)
    })
  }

  return (
    <>
      <button onClick={() => navigate('/')}>
        ← back
      </button>

      <h1>inventory</h1>
  
      <button onClick={addItems}> + add </button>
      <button onClick={clearItems}> clear </button>
    </>
  )
}

export default Inventory