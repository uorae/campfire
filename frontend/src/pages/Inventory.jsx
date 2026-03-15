// on add item button click: open form for item, takes in name, quantity, category
import { useState, useEffect } from "react"
import axios from "axios"

import { useNavigate } from "react-router-dom"

function Inventory() {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [input, setInput] = useState("")
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
    if (!input.trim()) return // check input is non-empty

    setLoading(true)

    axios.post(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/pantry`, {
      ingredient_name: input
    }).then(() => {
      fetchItems();
      setInput("");
    }).catch((err) => {
      console.error(err)
    }).finally(() => {
      setLoading(false)
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
    axios.delete(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/clear/pantry`, {
    }).then(() => {      
      fetchItems();
    }).catch((err) => {
      console.error(err)
    })
  }

  return (
    <>
      <div className="w-full max-w-md">
        <a className="link link-hover"
          onClick={() => navigate('/')}
        >
          ← back
        </a>

        <h1>inventory</h1>
    
        {/* add item input */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="ingredient name"
            className="input input-bordered w-full"
            value={input}
            onChange={e => setInput(e.target.value)}
            // lets user press enter instead of clicking add
            onKeyDown={e => e.key === 'Enter' && addItems()}
          />
          <button 
            onClick={addItems}
            disabled={loading}> + add </button>
        </div>

        {/* ingredient list */}
        {items.length === 0 ? (
          <p className="text-base-content/50 text-center mt-12">
            your inventory is looking a little empty... add some ingredients to get started!
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {items.map(item => (
              <li
                key={item.id}
                className="flex items-center justify-between bg-base-100 px-4 py-3 rounded-xl"
              >
                <span>{item.name}</span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="btn btn-sm btn-error"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}

        <button onClick={clearItems}> clear </button>
      </div>

    </>
  )
}

export default Inventory