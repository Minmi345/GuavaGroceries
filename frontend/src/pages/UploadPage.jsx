// importing useState to keep track of the uploaded image and parsed results 
import { useState } from 'react'

// import useNavigate to redirect the user to other pages
import { useNavigate } from 'react-router-dom' 

export default function UploadPage()  {               

  // useNavigate gives us a function to redirect the user
  const navigate = useNavigate()  

  // store the image the user selects. null means no image selected yet
  const [image,setImage] = useState(null)  

  // stores the url of the selected image so we can preview it
  const [imagePreview, setImagePreview] = useState(null)
  

  // store the parsed receipt result from OCR
  // null means we havent parsed anything yet
  const [parsedResult, setParsedResult] = useState(null)

  // loading is true while we are pretending to parse the receipt
  const [loading,setLoading] = useState(false)    

  // this  runs when the user selects an image file
  const handleImageChange= (e) => {

    // get the first file the user selected
    const file = e.target.files[0]   

    // if no file was selected do nothing
    if (!file) return                    

    // saving the file to state so it can be sent it to the API later
    setImage(file)         

    // create a temporary url from the file so we can preview it
    // URL.createObjectURL creates a local url pointing to the file
    setImagePreview( URL.createObjectURL(file) )

    // clears any previous parsed result when a new image is selected
    setParsedResult(null)


  }

  // this function runs when the user clicks the parse receipt button
  const handleParse= async () =>  {        

    // if no image has been selected then do nothing
    if (!image) return            
     
 
    // set loading to true while we wait for the OCR response
    setLoading(true)

    try {

      // mock OCR result
      // to be replaced with a real apiFetch call to the backend later
      await new Promise((resolve) => setTimeout(resolve, 1500)) 

      // mock parsed result. replace with real data from the API later
      setParsedResult({
        shop: 'ICA Maxi',
        date: '2025-05-08',
        products: [
          { name: 'Milk', price: 29.90 },
          { name: 'Bread', price: 24.50 },
          { name: 'Pasta', price: 15.00 },],
      })

    } catch (err) {
      console.error('Parsing failed:', err)
    } finally {
      // always stop loading when done
      setLoading(false)    
    }
     
  }

  // this function runs when the user clicks save receipt
  const handleSave= () => {
    // mock save. to be replace with real apiFetch call later
    console.log('Saving receipt:',parsedResult)

    // after saving go back to the dashboard
    navigate('/dashboard')

  }




  return (
    
    <div className="min-h-screen  bg-gray-50" >

      {/* top navigation bar */}
      <div className = "bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between" >

        {/* left side. the logo and app name */}
        <div className = "flex items-center gap-3" >

          <img
            src = "/logo.png"
            alt ="GuavaGroceries logo"
            className ="w-8 h-8 object-contain "
          />


          <span className = "text-lg font-bold text-gray-900" >
            GuavaGroceries
          </span>


        </div>

        {/* back button. to navigates back to the dashboard */}
        <button
          onClick ={ () => navigate('/dashboard')}
          className="border border-gray-300 text-gray-700 text-sm px-4 py-2 rounded-lg hover:bg-gray-100"
        >
          Back </button>

      </div>

      {/* main content area */}
      <div className = "max-w-md mx-auto px-6 py-8 flex flex-col gap-6">

        {/* page heading */}
        <h2 className="text-lg font-bold text-gray-900">
          Upload receipt
        </h2>

        {/* image upload area */}
        {/* this is a label that wraps a hidden file input */}
        {/* Clicking the label triggers the hidden input below */}
        <label className = "flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:bg-gray-100" >

          {/* if an image has been selected then it shows the preview otherwise show the upload instructions */}
          {imagePreview ? (
            <img
              src = {imagePreview}
              alt= "Receipt preview"
              className = "w-full max-h-64 object-contain rounded-lg "/>
          ) : (
            <>
              {/* camera icon using a simple svg */}
              <svg xmlns = "http://www.w3.org/2000/svg" className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap = "round" strokeLinejoin="round" d = "M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                <path strokeLinecap = "round" strokeLinejoin="round" d = "M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
              </svg>

              {/* upload instructions text */}
              <p className="text-sm text-gray-500 text-center"> Tap to take or upload an image </p>

            </>

          )}


          {/* hidden file input. */}
          {/* accept="image/*" allows any image type */}
          {/* capture="environment" opens the back camera on mobile */}
          <input 
            type = "file"
            accept = "image/*"
            capture =  "environment"  
            onChange = {handleImageChange}
            className = "hidden" />  
        </label>
           

        {/* parse button. only shows after an image has been selected */}
        {image && !parsedResult &&  (

          <button
            onClick = {handleParse}
            disabled= {loading} 
            className= " w-full  py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-700 disabled:opacity-50 "     
          >
            {/* shows different text when loading */}
            {loading ? 'Parsing receipt...' :'Parse receipt' }      

          </button>

            
        )}



        {/* parsed result section. only shows after the parsing is done */}
        {parsedResult &&  (
          <div className = "flex flex-col  gap-4" >

            
            <h3 className = "text-base font-bold text-gray-900 "> Parsed result </h3>

            {/* shop name card */}
            <div className = "bg-white border border-gray-200 rounded-lg px-4 py-3">
              <p className = "text-xs text-gray-400 mb-1 " >Shop</p>    

              <p className = "text-sm font-medium text-gray-900">
                {parsedResult.shop} </p>
            </div>

            {/* date card */}
            <div className ="bg-white  border border-gray-200 rounded-lg px-4 py-3">
              <p className="text-xs text-gray-400 mb-1">Date</p>
              <p className="text-sm font-medium text-gray-900" >
                {parsedResult.date} 
              </p>
            
            </div>

            {/* product card */}
            <div className = "bg-white  border border-gray-200 rounded-lg px-4 py-3 flex flex-col gap-2" >
              <p className = "text-xs  text-gray-400">Products</p>


              {/* loop through each product and show name and price */}
              {parsedResult.products.map((product,index) => (

                <div
                  key = {index}
                  className ="flex  justify-between items-center" >

                  {/* product name on  left */}
                  <span  className = "text-sm text-gray-900" >
                    {product.name} </span>

                  {/* product price on right in grey */}
                  <span className = " text-sm  text-gray-500">
                    {product.price.toFixed(2)} kr </span>
                </div>

              ))}

            </div>

            {/* save receipt button */}
            {/* clicking this saves the receipt and goes back to the dashboard */}
            <button

              onClick ={handleSave}
              className ="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-700">  Save receipt </button>  

          </div>
        )}  
  
      </div>  
    </div>
  )
} 




