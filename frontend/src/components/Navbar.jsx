import { useNavigate } from 'react-router-dom'

export default function Navbar({ rightButton }) {
	return (
		<div className='bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between'>
			<div className='flex items-center gap-3'>
				<img
					src='/logo.png'
					alt='GuavaGroceries logo'
					className='w-8 h-8 object-contain'
				/>
				<span className='text-lg font-bold text-gray-900'>GuavaGroceries</span>
			</div>
			{rightButton}
		</div>
	)
}
