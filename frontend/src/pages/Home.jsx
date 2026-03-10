import { useNavigate } from 'react-router-dom'

function Home() {
	const navigate = useNavigate()

	return (
		<div>
			<h1 className="text-5xl dm-mono-medium font-bold">campfire .</h1>
			<p className="text-lg text-base-content/60">look for a cozy meal</p>

			<div className="flex flex-row gap-4 mt-8">
				<button
					className="btn btn-primary btn-lg"
					onClick={() => navigate('/pantry')}
				>
					inventory
				</button>
				<button
					className="btn btn-secondary btn-lg"
					onClick={() => navigate('/recipes')}
				>
					cookbook
				</button>
			</div>
		</div>
	)
}

export default Home