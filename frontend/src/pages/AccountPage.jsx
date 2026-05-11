
import { useNavigate } from 'react-router-dom'


export default function AccountPage() {
  // useNavigate is used to redirect the user
  const navigate = useNavigate()  

  // read the users name from localStorage
  // saved when the user logged in
  const userName = localStorage.getItem('userName') || 'Unknown'    

  // read the users phone number from localStorage
  const userPhone = localStorage.getItem('userPhone') || '—' 

  // this function logs the user out
  const handleLogout = () => {
    // remove the token and user data from localStorage 
    localStorage.removeItem('token')   
    localStorage.removeItem('userName')   
    localStorage.removeItem('userPhone')  


    // redirect the user back to the home page
    navigate('/')

  }
  return (
    
    <div className = "min-h-screen bg-gray-50">

      {/* top navigation bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">  

        {/* left side with logo and app name */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="GuavaGroceries logo"
            className="w-8 h-8 object-contain"
          />

          <span className ="text-lg font-bold text-gray-900">
            GuavaGroceries
          </span>

        </div>

        {/* back button. goes back to the previous page */}
        {/* navigate(-1) means to go back one step in the browser history */}
        <button

          onClick={() => navigate(-1)}
          className="border border-gray-300 text-gray-700 text-sm px-4 py-2 rounded-lg hover:bg-gray-100"
        >
          Back
        </button>

      </div>


      {/* main content area */}
      <div className="max-w-md mx-auto px-6 py-8 flex flex-col gap-6">

        {/* page heading */}
        <h2 className ="text-lg font-bold text-gray-900">
          Account details
        </h2>    
         

        {/* user details section */}
        <div className = "flex flex-col gap-3" >  

          {/* name card */}
          <div className = "bg-white border border-gray-200 rounded-lg px-4 py-3" >

            {/* label above the value */}
            <p className="text-xs text-gray-400 mb-1">Name</p>
            {/* the actual value from localStorage */}
            <p className="text-sm font-medium text-gray-900">{userName}</p>

          </div>

          {/* phone number card */}
          <div className = "bg-white border border-gray-200 rounded-lg px-4 py-3">
            {/* label above the value */}
            <p className = "text-xs text-gray-400 mb-1">Phone number</p>
            {/* the actual value from localStorage */}
            <p className = "text-sm font-medium text-gray-900">{userPhone}</p>
          </div>

        </div>

        {/* logout button */}
        <button
          onClick={handleLogout}
          className="w-full py-3 border border-red-400 text-red-500 rounded-lg font-medium hover:bg-red-50"
        >
          Log out
        </button>

      </div>
    </div>
  )

}

