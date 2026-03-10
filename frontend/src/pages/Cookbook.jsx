import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Recipes() {
    const navigate = useNavigate()
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      axios.get(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/recipes`)
        .then(res => setRecipes(res.data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false))
    }, [])

    return (
      <>
        <button onClick={() => navigate('/')}>
          ← back
        </button>
      </>
    )
}