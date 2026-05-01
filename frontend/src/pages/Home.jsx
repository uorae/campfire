import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'

function Home() {
	const navigate = useNavigate()

	return (
		<>
			<div className="flex flex-col items-center h-screen">
				<NavBar />

				<div className="flex flex-col w-3/4 h-3/4 items-center pt-6">
					{/* title */}
					<div className="flex-1 justify-center items-center flex flex-col gap-12">
						<h1 className="text-5xl lg:text-9xl md:text-8xl font-bold bonbon-regular">campfire</h1>
						<p className="lg:text-3xl">look for a cozy meal</p>
					</div>


					{/* buttons */}
					<div className="flex-1 flex flex-row justify-center items-center gap-8 md:gap-16 lg:gap-24">
						<div className="cursor-pointer flex flex-col items-center" onClick={() => navigate('/inventory')}>
							<img src="/assets/icons/inventory.png" alt="inventory icon" className="w-64 h-64 object-contain mb-2" />
							<p className="text-center text-base-content/60">what's in your kitchen?</p>
						</div>
						<div className="cursor-pointer flex flex-col items-center" onClick={() => navigate('/cookbook')}>
							<img src="/assets/icons/cookbook.png" alt="cookbook icon" className="w-64 h-64 object-contain mb-2" />
							<p className="text-center text-base-content/60">find recipes!</p>
						</div>
					</div>
				</div>

			</div>

		</>
	)
}

export default Home