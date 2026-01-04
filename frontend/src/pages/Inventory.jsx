// on add item button click: open form for item, takes in name, quantity, category
import { useState, useEffect } from "react"
import axios from "axios"

import NewItemForm from "../components/NewItemForm"

function Inventory() {
  const [isAdding, setIsAdding] = useState(false)
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/pantry')
        setItems(response.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchItems()
  }, [])

  const onAdd = () => {
    console.log(isAdding)
    setIsAdding(true)
  }

  return (
    <>
    <div>
      <div>
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
      </div>
      {/* left: pantry item list */}
      <button onClick={onAdd}>
        + add item
      </button>

    </div>

    <NewItemForm state={isAdding} />

    <div>
      {/* right: item info */}
    </div>
    </>
  )
}

export default Inventory