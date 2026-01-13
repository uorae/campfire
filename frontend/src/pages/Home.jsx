import { useNavigate } from "react-router-dom"

function Home() {
    const navigate = useNavigate()

  return (
    <>
        <div>
            <button onClick={() => navigate('/cookbook')}>
                cookbook
            </button>
            <button onClick={() => navigate('/inventory')}>
                pantry
            </button>
            <button onClick={() => navigate('/shopping')}>
                shopping list
            </button>
        </div>
        <div>
            <button>
                generate recipes
            </button>
        </div>
    </>
  )
}

export default Home