import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import PageLayout from '../components/PageLayout'

export default function DashboardPage() {
	const navigate = useNavigate()
	const userName = localStorage.getItem('userName') || 'User'

	return (
		<PageLayout
			navbar={
				<Navbar
					rightButton={
						<button
							className='border border-gray-300 text-gray-700 text-sm px-4 py-2 rounded-lg hover:bg-gray-100'
							onClick={() => document.documentElement.classList.toggle('dark')}>
							Switch theme
						</button>
					}
				/>
			}>
			{/* greeting section */}
			<div className='text-center'>
				<h2 className='text-2xl md:text-3xl font-bold text-gray-900 dark:text-white'>
					Hello, {userName}
				</h2>
				<p className='text-sm text-gray-500 dark:text-gray-400 mt-2'>
					What would you like to do?
				</p>
			</div>

			{/* buttons */}
			<div className='flex flex-col gap-4 w-full max-w-xs mx-auto'>
				<button
					onClick={() => navigate('/upload')}
					className='w-full py-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-700'>
					Upload receipt
				</button>
				<button
					onClick={() => navigate('/statistics')}
					className='w-full py-4 border border-gray-300 text-gray-900 rounded-lg font-medium hover:bg-gray-100'>
					Statistics
				</button>
				<button
					onClick={() => navigate('/group')}
					className='w-full py-4 border border-gray-300 text-gray-900 rounded-lg font-medium hover:bg-gray-100'>
					Group
				</button>
			</div>
		</PageLayout>
	)
}
