import axios from 'axios'
import { useState } from 'react';

function NewItemForm (props) {
  const [name, setName] = useState("")
  const [quantity, setQuantity] = useState("")

  const addItem = async (e) => {
    e.preventDefault();
    try {
      console.log(name)
      await axios.post('http://localhost:3000/pantry', {
        item_name: name,
        quantity: quantity
      });
      return;
    } catch (error) {
      throw error.response.data.error;
    }
  }

  if (props.state) {
    return <>
    <form>
        <label htmlFor="iname">Item Name</label>
        <input type="text" id="iname" name="iname" onChange={(e) => setName(e.target.value)} />
        <label htmlFor="quantity">Quantity</label>
        <input type="text" id="quantity" name="quantity" onChange={(e) => setQuantity(e.target.value)} />
        <button type='submit' onClick={addItem}>submit</button>
    </form>
    </>
  } else {
    return <>
    </>
  }

}

export default NewItemForm