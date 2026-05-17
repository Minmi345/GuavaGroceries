import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  // important for directing users to other pages
  const navigate = useNavigate()

  return (
    <div className='min-h-screen bg-white flex items-center justify-center px-6'>
      <div className='flex flex-col items-center gap-6 w-full max-w-sm'>
        {/* contains the app branding (logo and name) */}
        <div className='flex items-center gap-0.5'>
          <img
            src='/logo.png'
            alt='GuavaGroceries logo'
            className='w-30 h-30 md:w-34 md:h-34 object-contain'
          />

          <h1 className='text-2xl md:text-2xl font-bold text-gray-900'>
						GuavaGroceries
          </h1>
        </div>

        {/* tagline in small font */}
        <p className='text-sm md:text-base text-gray-500 text-center'>
					Track your groceries, split your costs
        </p>

        {/* buttons for navigation */}
        <div className='flex flex-col gap-3 w-full mt-2'>
          {/* login button */}
          <button
            onClick={() => navigate('/login')}
            className='w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-700'>
						Login
          </button>

          {/* register button */}
          <button
            onClick={() => navigate('/register')}
            className='w-full py-3 border border-gray-300 text-gray-900 rounded-lg font-medium hover:bg-gray-100'>
						Register
          </button>

          {/*About page, to be moved to better location*/}
          <button
            onClick={() => navigate('/about')}
            className='w-full py-3 border border-gray-300 text-gray-900 rounded-lg font-medium hover:bg-gray-100'>
						About
          </button>
        </div>
      </div>
    </div>
  )
}
