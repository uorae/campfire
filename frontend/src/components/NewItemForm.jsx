import axios from 'axios'
import { useState } from 'react';

function NewItemForm (props) {
  const [name, setName] = useState("")
  const [quantity, setQuantity] = useState("")
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  return <>
  <button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}> + add item </button>
  <dialog onClose={addItem} id="my_modal_5" className="modal modal-bottom sm:modal-middle">
    <div className="modal-box">
      <h3 className="font-bold text-lg">Hello!</h3>
      <form>
          <label htmlFor="iname">Item Name</label>
          <input type="text" id="iname" name="iname" onChange={(e) => setName(e.target.value)} />
          <label htmlFor="quantity">Quantity</label>
          <input type="text" id="quantity" name="quantity" onChange={(e) => setQuantity(e.target.value)} />
      </form>
      <div className="modal-action">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn">submit</button>
        </form>
      </div>
    </div>
  </dialog>
  </>

}

export default NewItemForm