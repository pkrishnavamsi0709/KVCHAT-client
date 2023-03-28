import React from 'react'

const UserNotification = ({chat,handleFunction}) => {
  return (
    <div>
        <div onClick={handleFunction} className="cursor-pointer bg-[#e8e8e8] hover:bg-[#38B2AC] text-white w-full flex items-center  px-3 py-2 mb-2 rounded-lg">
        
        {chat.isGroupChat?<div>
            <p>New Messages from the </p>

        </div>:<div><p>New Messages in the</p></div>}
        </div>
      
    </div>
  )
}

export default UserNotification
