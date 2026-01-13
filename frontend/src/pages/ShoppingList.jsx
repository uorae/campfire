import { useNavigate } from "react-router-dom"

function ShoppingList() {
    const navigate = useNavigate()
    return <>
        <button onClick={() => navigate('/')}>
            back
        </button>
    </>
}

export default ShoppingList