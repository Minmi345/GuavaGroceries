
import { useState } from 'react' 
import { useNavigate } from 'react-router-dom' 


export default function LoginPage() { 
  // useNavigate gives us a function to redirect the user to another page             
  const navigate = useNavigate() 


  // stores what the user types in the phone number field
  const [phoneNumber, setPhoneNumber] = useState('')  

  // stores what the user types in the password field 
  const [password, setPassword] = useState('')  

  // stores any error message to show the user
  const [error,setError] = useState('')   

  // loading is true while user is waiting for the login request 
  const [loading,setLoading] = useState(false)  

  // this function runs when the user clicks the login button
  const handleSubmit = async (e) => {                     
  

    // stops the browser from refreshing the page in form submit
    e.preventDefault()
 
    // clear aany previous error message 
    setError('') 
      
    // checks that both fields are filled in before  doing anything   
    if (!phoneNumber ||  !password) { 
      setError('Please fill in all fields') 
      return 

    }

      
    // set loading to true so that the button shows "logging in..."  
    setLoading(true)

    try {
    
      // mock login for now
      await new Promise((resolve) => setTimeout(resolve, 800))

      // mock user data. to be replaced  with real data from the API later
      const mockUser = { id: 1, name: 'Anna' }

      // save the mock token and user name in localStorage 
      // so other pages can read who is logged in      
      localStorage.setItem('token','mock-jwt-token')
      localStorage.setItem('userName', mockUser.name)



      // redirect the user to the dashboard after successful login
      navigate('/dashboard')
    
    } catch (err){
      // if something goes wrong shows an error message
      setError('Invalid phone numberr or password')

    } finally {
    
      // set loading back to false when done
      setLoading(false)
    
    }

  }

  return (
    
    <div className="min-h-screen bg-white flex items-center justify-center px-6  " >

      
      <div className="flex flex-col gap-6 w-full  max-w-sm" >   
   
        {/* branding. logo and app name side by side */} 
        <div className="flex items-center gap-0.5">

          
          <img
            src="/logo.png"    
            alt="GuavaGroceries logo"  
            className="w-30 h-30 md:w-34 md:h-34 object-contain "
             
          />

          {/* app name next to the logo */}
          <span className="text-2xl md:text-2xl font-bold text-gray-900">
            GuavaGroceries
          </span>

        </div>

        {/* page title and subtitle */}
        <div>

          {/* main heading for this page */}
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 ">
            Welcome back  
          </h2>


          {/* small subtitle below the heading */}

          <p className="text-sm text-gray-500 mt-1" >
            Login to your account
          </p>

        </div>

        {/* the form. onSubmit calls handleSubmit when the button is clicked */ }

        < form onSubmit={handleSubmit} className="flex flex-col gap-4 " >

          {/* phone number input field */}
           
          <div className="flex flex-col gap-1" >

            <label className="text-sm text-gray-600">Phone number</label>

            {/* type="tel" tells mobile browsers to show a number keyboard */}
            {/* value and onChange keep the input in sync with phoneNumber state */}                    
            <input  

              type = "tel" 
              value = {phoneNumber }   
              onChange={ (e) => setPhoneNumber(e.target.value)  }
              placeholder="0701234567"
              className="border border-gray-300 rounded-lg  px-4 py-3 text-sm focus:outline-none focus:border-gray-500 "

            />

          </div>

          {/* password input field */}
          <div className="flex flex-col gap-1" >    

            <label className="text-sm text-gray-600" >Password</label>

            {/* type="password" hides what the user types with dots */}
            <input
              type = "password"
              value ={password}
              onChange={ (e) => setPassword(e.target.value)}
              placeholder ="••••••••"
              className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gray-500"
            />
              
          </div>

          {/* only shows the error message if there is one */}
          {error && (
            <p className="text-sm text-red-500" >{error}</p>
          )}

          {/* submit button */}
          {/* disabled when loading so the user can click it twice */}
          <button
            type ="submit"
            disabled ={loading}
            className ="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-700 disabled:opacity-50"
          
          >

            {/* shows different text depending on whether it is loading */}
            {loading ? 'Logging in...' :'Login'}
          </button>

        </form>

        {/* link to register page for users who dont have an account yet */}
        <p className="text-sm text-gray-500 text-center" >

          No account?{' '}

          {/* clicking this navigates to the register page */}
          <button
            onClick ={() => navigate('/register')}
            className ="text-gray-900 underline"
          >Register</button>
        </p>

      </div>

    </div>
  )  
    
}












