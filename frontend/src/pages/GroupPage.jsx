

import { useNavigate } from 'react-router-dom'

// import useState to keep track of checkbox changes
import { useState } from 'react'   
  
export default function GroupPage(){

  // useNavigate gives us a function to redirect the user
  const navigate = useNavigate() 

  // mock group members . to be replaced
  const members = [{ id: 1, name: 'Anna' , phone_number: '0701234567'},
    { id: 2, name: 'Erik', phone_number: '0709876543'},]


  // mock receipts with which members are included in each
  // each receipt has an id, shop name, date, and a list of included member ids 
  const [receipts, setReceipts] = useState([{ id: 1, shop: 'ICA Maxi', date: '2025-05-01', includedMembers: [1] },
    { id: 2, shop: 'Lidl', date: '2025-05-03', includedMembers: [1, 2] },])


  // this function toggles a member on or off for a specific receipt
  // receiptId is which receipt we are changing
  // memberId is which member we are toggling
  const toggleMember =(receiptId , memberId) =>  {

    // go through all receipts and update the right one
    setReceipts(receipts.map( (receipt) => {

      // if this is not the receipt we want to change then leave it alone
      if (receipt.id !== receiptId) return receipt 

      // check if  member is already included
      const isIncluded= receipt.includedMembers.includes(memberId)   

      // if they are included then remove them, if not then add them
      const updatedMembers= isIncluded ? receipt.includedMembers.filter((id) => id !== memberId) : [...receipt.includedMembers, memberId]  

       
      // return the updated receipt with the new member list  
      return { ...receipt, includedMembers: updatedMembers }
    
    }))

  }

  return(
    
    <div className = "min-h-screen bg-gray-50">

      {/* top navigation bar */} 
      <div className = "bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between" >

        {/* left side with logo and app name */}
        <div className="flex items-center gap-3">
          <img
            src = "/logo.png" 
            alt="GuavaGroceries logo" 
            className="w-8 h-8 object-contain "


          />

          <span className="text-lg font-bold text-gray-900">GuavaGroceries</span>

        </div>

        {/* back button to navigates back to the dashboard */}
        <button
          onClick = {() => navigate('/dashboard')}
          className = "border border-gray-300 text-gray-700 text-sm px-4 py-2 rounded-lg hover:bg-gray-100 "
        >
          Back </button>
      </div>

      {/* main content area */}
      <div className = "max-w-md mx-auto px-6 py-8 flex flex-col gap-6">

        {/* group members section */}
        <div className = "flex flex-col gap-3">

          {/* section heading */}
          <h2 className ="text-lg font-bold text-gray-900">
            Group members
          </h2>

          {/* loop through each member and show their name and phone number */}
          {members.map((member) => (
            <div
              key = {member.id}
              className = "bg-white border border-gray-200 rounded-lg px-4 py-3 flex justify-between items-center"
            >

              {/* member name on the left */}
              <span className="text-sm font-medium text-gray-900" >            
                {member.name}
              </span>

              {/* member phone number on the right  */}
              <span className="text-sm text-gray-400">
                {member.phone_number} 
              </span>  
            </div>

          ))}

        </div>


        {/* receipts section */}
        <div className ="flex flex-col gap-3">

          {/* section heading */}
          <h2 className = "text-lg font-bold text-gray-900">
            Receipts
          </h2>

          {/* loop through each receipt */}
          {receipts.map((receipt) => (
            <div
              key= {receipt.id}
              className = "bg-white border border-gray-200 rounded-lg px-4 py-3 flex flex-col gap-3"
            >
              {/* receipt header. shop name on left, date on right */}
              <div className="flex justify-between items-center">

                <span className="text-sm font-medium text-gray-900">
                  {receipt.shop}
                </span>

                <span className="text-xs text-gray-400">
                  {receipt.date}
                </span>

              </div>

              {/* member checkboxes. one per group member */}
              {/* shows which members are included in splitting a receipt */}
              <div className="flex flex-col gap-2">
                {members.map((member) => (

                  <label
                    key={member.id}   
                    className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
                  >

                    {/* checkbox. checked if the member is in the includedMembers list */}
                    {/* onChange calls toggleMember when the user checks or unchecks */}
                    <input
                      type ="checkbox"
                      checked = {receipt.includedMembers.includes(member.id)}
                      onChange = {() => toggleMember(receipt.id, member.id)}
                      className = "w-4 h-4"
                    />

                    {member.name}
                  </label>

                ))}

              </div>
            </div>

          ))}
        </div>
      </div>

    </div>
  )

}







