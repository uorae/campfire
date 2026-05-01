import { useNavigate } from 'react-router-dom'

export default function NavBar() {
  const navigate = useNavigate()
  return <>
    <div className="navbar bg-base-300 rounded-lg h-24 m:h-32 lg:h-32">
      <button className="btn btn-ghost text-xl m:text-4xl lg:text-4xl" onClick={() => navigate('/')}>
        <img src="/assets/icons/campfire.png" alt="campfire logo" className="object-contain w-12 h-12 m:w-24 m:h-24 lg:w-24 lg:h-24 " />
        <p>campfire</p>
      </button>
    </div>
  </>
      
}