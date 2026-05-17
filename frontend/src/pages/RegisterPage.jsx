// store and update values like form inputs with useState
import { useState } from 'react'

//redirect the user to another page with useNavigate
import { useNavigate } from 'react-router-dom'

import { apiFetch } from '../lib/api'

export default function RegisterPage() {
  // useNavigate gives function to redirect the user
  const navigate = useNavigate()

  // these store what the user types into each input field
  // the first value is the current value, the second updates it
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // error stores any error message to show the user
  const [error, setError] = useState('')

  // loading is true while we are waiting for the register request to finish
  const [loading, setLoading] = useState(false)

  // this function runs when the user cclicks the create account button
  const handleSubmit = async (e) => {
    // prevents the browser from refreshing the page on form submit
    e.preventDefault()

    // clears any previous error message
    setError('')

    // check that all fields are filled in before sending anything
    if (!username || !password) {
      setError('Please fill in all fields')
      return
    }

    // set loading to true so that the button shows "creating account..."
    setLoading(true)

    try {
      // send the new username and password to the backend
      await apiFetch('users', {
        method: 'POST',
        body: JSON.stringify({ name: username, password }),
      })

      // after successful register, send the user to the login page
      navigate('/login')
    } catch (err) {
      // show a specific message if the username is already taken
      if (err.status === 409) {
        setError('That username is already taken. Please choose another.')
      } else {
        // show error message if something goes wrong
        setError('Something went wrong. Please try again.')
      }
    } finally {
      // always set loading back to false when done
      setLoading(false)
    }
  }

  return (
  // styling the page
    <div className='min-h-screen bg-white flex items-center justify-center px-6'>
      <div className='flex flex-col gap-6 w-full max-w-sm'>
        {/* branding for the app, logo and name */}
        <div className='flex items-center gap-0.5'>
          <img
            src='/logo.png'
            alt='GuavaGroceries logo'
            className='w-30 h-30 md:w-34 md:h-34 object-contain'
          />

          <span className='text-2xl md:text-2xl font-bold text-gray-900'>
						GuavaGroceries
          </span>
        </div>

        {/* page title and subtitle */}
        <div>
          {/* main heading for page */}
          <h2 className='text-xl md:text-2xl font-bold text-gray-900'>
						Create account
          </h2>

          {/* subtitle below heading */}
          <p className='text-sm text-gray-500 mt-1'>
						Fill in your details to get started
          </p>
        </div>

        {/* the form element. onSubmit calls handleSubmit when the button is clicked */}
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          {/* name input field */}
          <div className='flex flex-col gap-1'>
            {/* label above the input */}
            <label className='text-sm text-gray-600'>Username</label>

            {/* text input value is controlled by the name state */}
            {/* onChange updates the name state everytime the user types */}
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Anna'
              className='border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gray-500'
            />
          </div>

          {/* input field for password */}
          <div className='flex flex-col gap-1'>
            <label className='text-sm text-gray-600'>Password</label>

            {/* password is hidden with dots */}
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='••••••••'
              className='border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gray-500'
            />
          </div>

          {/* red error message shows when something goes wrong */}
          {error && <p className='text-sm text-red-500'>{error} </p>}

          {/* submit button */}
          {/* disabled when loading is true so user cant click it twice */}
          <button
            type='submit'
            disabled={loading}
            className='w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-700 disabled:opacity-50'>
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        {/* link to login page */}
        <p className='text-sm text-gray-500 text-center'>
					Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className='text-gray-900 underline'>
						Login
          </button>
        </p>
      </div>
    </div>
  )
}
