// on add item button click: open form for item, takes in name, quantity, category
import { useState } from "react"

import NewItemForm from "../components/NewItemForm"

function Inventory() {
  const [isAdding, setIsAdding] = useState(false)

  const onAdd = () => {
    console.log(isAdding)
    setIsAdding(true)
  }

  return (
    <>
    <div>
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