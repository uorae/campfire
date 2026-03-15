import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

export default function RecipeDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`http://localhost:3000/recipes/${id}`)
      .then(res => setRecipe(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="flex justify-center items-center">
      <span className="loading loading-spinner loading-lg" />
    </div>
  )

  if (!recipe) return (
    <div className="flex justify-center items-center">
      <p>oh no! there's no recipe here...</p>
    </div>
  )

  return (
    <div className="flex flex-col items-center py-12 px-4">
      <button className="!shadow-none btn-sm no-animation fixed top-4 left-4 hover:underline"
        onClick={() => navigate('/cookbook')}
      >
        ← back
      </button>

      {/* title section */}
      <div className="flex flex-col md:flex-row gap-8 bg-base-100 rounded-2xl p-6 mb-6">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full md:w-72 h-56 object-cover rounded-xl"
        />
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold">{recipe.title}</h1>
          <p className="mt-2 text-base-content/60">Ready in {recipe.readyInMinutes} mins · {recipe.servings} servings</p>
        </div>
      </div>

      {/* ingredients */}
      <div className="bg-base-100 rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Ingredients</h2>
        <ul className="flex flex-col gap-2">
          {recipe.extendedIngredients.map(ing => (
            <li key={ing.id} className="flex items-center gap-2">
              <span className="text-base-content/40">•</span>
              <span>{ing.original}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* steps */}
      <div className="bg-base-100 rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">Steps</h2>
        <ol className="flex flex-col gap-4">
          {recipe.analyzedInstructions[0]?.steps.map(step => (
            <li key={step.number} className="flex gap-4">
              <span className="font-bold text-primary">{step.number}</span>
              <p>{step.step}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}