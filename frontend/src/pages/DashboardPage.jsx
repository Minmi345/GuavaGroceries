
import { useNavigate } from 'react-router-dom'    


export default function DashboardPage()  {   

  // useNavigate redirects the user to other pages 
  const navigate= useNavigate()

  // read the users name from localStorage  
  // this was saved when the user logged in  and if nothing is found, show 'User' as a fallback  
  const userName = localStorage.getItem( 'userName') || 'User'  


  return (  
    
    <div className ="min-h-screen bg-gray-50" >

      {/* top navigation bar */}
      <div className =" bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between ">

        {/* left side of navbar with logo and app name */}
        < div className ="flex items-center gap-3" >

          {/* logo image  */}
           
          <img
            src ="/logo.png"
            alt ="GuavaGroceries logo"
            className="w-8 h-8  object-contain"
             
          />

          {/*app name next to the logo  */}
          < span className = "text-lg font-bold text-gray-900"
          >
            GuavaGroceries </span>
        </div>


        {/* right side of navbar has the account button */}
        {/* clicking this navigates to the account page */} 
        <button

          onClick={()=> navigate('/account') }
          className ="border border-gray-300 text-gray-700 text-sm px-4 py-2 rounded-lg hover:bg-gray-100">
          Account</button>
      </div>

      {/* main content area below the navbar */}
      <div className ="flex flex-col items-center px-6 py-12 gap-8 ">

        {/* greeting section */}
        <div className="text-center">

          {/* greeting with the users name pulled from localStorage  */}
          <h2 className ="text-2xl md:text-3xl font-bold text-gray-900 ">
            Hello, {userName} </h2>

          {/* small subtitle below the greeting */}
          <p className="text-sm text-gray-500 mt-2 " >
            What would you like to do? </p>
        </div>

        {/* buttons container */}
        <div className="flex flex-col gap-4 w-full max-w-xs">   

          {/* upload receipt button  */}
          {/* clicking this navigate to the upload page */}
          <button
            onClick ={() => navigate('/upload') }
            className = "w-full py-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-700">Upload receipt</button>

          {/* statistics button  */}
          {/* clicking this navigate to the statistics page */} 
          <button
            onClick ={() => navigate('/statistics')}
            className ="w-full py-4 border border-gray-300 text-gray-900 rounded-lg font-medium hover:bg-gray-100" >Statistics</button>

          {/* group button */}
          {/* clicking this navigate to the group page */}
          <button  
            onClick={() => navigate('/group')}  
            className =  "w-full py-4 border border-gray-300 text-gray-900 rounded-lg font-medium hover:bg-gray-100 ">
            Group
          </button>

        </div>
      
      </div>
    </div>
  )
} 

  
   
    
     
       















