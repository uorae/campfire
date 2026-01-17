// on add item button click: open form for item, takes in name, quantity, category
import { useState, useEffect } from "react"
import axios from "axios"

import NewItemForm from "../components/NewItemForm"
import { useNavigate } from "react-router-dom"

function Inventory() {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [selectedItem, setSelectedItem] = useState({})

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/pantry')
        setItems(response.data)
        setSelectedItem(response.data[0])
        console.log(response.data[0])
      } catch (err) {
        console.error(err)
      }
    }

    fetchItems()
  }, [])

  return (
    <>
    <div className="flex w-full">
      <div className="card bg-base-300 rounded-box grid h-20 grow place-items-center">
        <h2>Pantry Items</h2>

        {items.length === 0 ? (
          <p>No items yet</p>
        ) : (
          <ul>
            {items.map(item => (
              <li key={item.item_id}>
                {item.item_name} — {item.quantity}
              </li>
            ))}
          </ul>
        )}

        {/* left: pantry item list */}
        <NewItemForm />
      </div>
      <div className="divider divider-horizontal"></div>
      <div>
        <div className="card bg-base-100 w-96 shadow-sm">
          {/* right: item info */}
          <div className="card-body">
            <h2 className="card-title">{selectedItem.item_name}</h2>
            <p>quantity: {selectedItem.quantity}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <button onClick={() => navigate('/')}>
      back
    </button>
    </>
  )
}

export default Inventory