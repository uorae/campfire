import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Recipes() {
  const navigate = useNavigate()
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${import.meta.env.API_URL}/recipes`)
      .then(res => setRecipes(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

// const placeholderRecipes = [
//     { id: 1, title: 'Scrambled Eggs on Toast', image: 'https://placehold.co/400x300', usedIngredientCount: 3, missedIngredientCount: 1 },
//     { id: 2, title: 'Banana Pancakes', image: 'https://placehold.co/400x300', usedIngredientCount: 4, missedIngredientCount: 0 },
//     { id: 3, title: 'Garlic Butter Pasta', image: 'https://placehold.co/400x300', usedIngredientCount: 2, missedIngredientCount: 2 },
//     { id: 4, title: 'French Toast', image: 'https://placehold.co/400x300', usedIngredientCount: 5, missedIngredientCount: 1 },
//     { id: 5, title: 'Avocado Toast with Poached Egg', image: 'https://placehold.co/400x300', usedIngredientCount: 3, missedIngredientCount: 2 },
//     { id: 6, title: 'Omelette', image: 'https://placehold.co/400x300', usedIngredientCount: 4, missedIngredientCount: 0 },
// ]

  return (
    <div>
      <button className="!shadow-none btn-sm no-animation fixed top-4 left-4 hover:underline"
        onClick={() => navigate('/')}
      >
        ← back
      </button>

      <h1 className="text-3xl font-bold mb-8">recipes</h1>

      {loading ? (
        <div className="flex justify-center mt-24">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : recipes.length === 0 ? (
        <p className="text-base-content/50 text-center mt-24">
          no recipes found. try adding some ingredients to your inventory!
        </p>
      ) : (
        // responsive grid — 1 col on mobile, 2 on tablet, 3 on desktop
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map(recipe => (
            <div 
              key={recipe.id}
            >
              <div onClick={() => navigate(`/recipes/${recipe.id}`)}>
                <figure className="relative">
                  <img className="w-full h-full object-cover" src={recipe.image} alt={recipe.title} />
                </figure>
                
                <h2 className="text-xl font-bold text-left underline mt-4 m-2 cursor-pointer hover:text-primary transition-colors duration-200">
                  {recipe.title}
                </h2>             
              </div>

              {recipe.missedIngredientCount > 0 && (
                <div className="text-xs flex flex-row items-center gap-2 bg-base-100 rounded-xl mx-2 mt-2">
                  <svg className="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor"><rect x="1.972" y="11" width="20.056" height="2" transform="translate(-4.971 12) rotate(-45)" fill="currentColor" strokeWidth={0}></rect><path d="m12,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Zm0-20C7.038,3,3,7.037,3,12s4.038,9,9,9,9-4.037,9-9S16.962,3,12,3Z" strokeWidth={0} fill="currentColor"></path></g></svg>
                  you are missing {recipe.missedIngredientCount} {recipe.missedIngredientCount === 1 ? 'ingredient' : 'ingredients'}.
                </div>  
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}