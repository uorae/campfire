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
    axios.get(`${import.meta.env.VITE_API_URL}/pantry`).then(response => {
      setItems(response.data)
    }).catch((err) => {
      console.error(err)
      setItems([])
    })
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const addItems = () => {
    if (!input.trim()) return // check input is non-empty

    setLoading(true)

    axios.post(`${import.meta.env.VITE_API_URL}/pantry`, {
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
    axios.delete(`${import.meta.env.VITE_API_URL}/pantry/${item_id}`, {
    }).then(() => {
      fetchItems();
    }).catch((err) => {
      console.error(err)
    })
  }

  const clearItems = () => {
    axios.delete(`${import.meta.env.VITE_API_URL}/clear/pantry`, {
    }).then(() => {      
      fetchItems();
    }).catch((err) => {
      console.error(err)
    })
  }

  return (
    <>
      <div className="flex flex-col w-3/4 h-3/4 items-center pt-6">
				{/* title */}
				<div className="flex-1 justify-center items-center flex flex-col gap-12">
					<h1 className="text-5xl lg:text-5xl md:text-5xl font-bold bonbon-regular">inventory</h1>
          {/* add item input */}
          <label className="join">
            <input 
              type="text" 
              className="input join-item grow" 
              placeholder="ingredient name"
              value={input} 
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addItems()} 
            />
            <button
              className={`btn join-item !rounded-l-none btn-soft btn-accent ${loading ? 'loading' : ''}`}
              onClick={addItems}
              disabled={loading}> + add 
            </button>
          </label>
				</div>
      
        {/* ingredient list */}
        <div className="flex-2">
          {items.length === 0 ? (
            <p className="text-base-content/50 text-center mt-12">
              your inventory is looking a little empty... add some ingredients to get started!
            </p>
          ) : (
            <>
            <ul className="list flex flex-col gap-2">
              {items.map(item => (
                <li key={item.id} className="list-row flex items-center justify-between">
                    <span>{item.name}</span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="btn btn-ghost btn-sm bg-none border-none text-base-content/30 hover:text-error hover:bg-error/10"
                    >
                      <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 7h16" />
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                        <path d="M10 12l4 4m0 -4l-4 4" />
                      </svg>
                    </button>
                </li>
              ))}
            </ul>
            <button className="btn btn-soft btn-error" onClick={clearItems}>
              clear
            </button>
            </>
          )}
        </div>
			</div>
    </>
  )
}

export default Inventory