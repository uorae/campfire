import { useNavigate } from "react-router-dom"

function Cookbook() {
    const navigate = useNavigate()
    return <>
        <button onClick={() => navigate('/')}>
            back
        </button>
    </>
}

export default Cookbook