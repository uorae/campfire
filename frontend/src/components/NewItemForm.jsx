import axios from 'axios'

function NewItemForm () {

  const addItem = async (itemName, quantity ) => {
    try {
      await axios.post('http://localhost:3000/pantry', {
        item_name: itemName,
        quantity: quantity
      });
      return;
    } catch (error) {
      throw error.response.data.error;
    }
  }

  return <>
    <form onSubmit={addItem}>
        <label htmlFor="iname">Item Name</label>
        <input type="text" id="iname" name="iname" />
        <label htmlFor="quantity">Quantity</label>
        <input type="text" id="quantity" name="quantity" />
    </form>
  </>
}

export default NewItemForm