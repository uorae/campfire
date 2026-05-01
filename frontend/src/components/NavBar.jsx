import { useNavigate } from 'react-router-dom'

export default function NavBar() {
  const navigate = useNavigate()
  return <>
    <div className="navbar bg-base-300 rounded-lg lg:h-32">
      <button className="btn btn-ghost lg:text-4xl" onClick={() => navigate('/')}>
        <img src="/assets/icons/campfire.png" alt="campfire logo" className="lg:w-24 lg:h-24 object-contain" />
        campfire
      </button>
    </div>
  </>
      
}