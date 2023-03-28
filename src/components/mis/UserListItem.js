import React from 'react'

const UserListItem = ({user,handleFunction}) => {
  return (
    <div>
        <div onClick={handleFunction} className="cursor-pointer bg-[#e8e8e8] hover:bg-[#38B2AC] text-white w-full flex items-center  px-3 py-2 mb-2 rounded-lg">
        
        <img className='mr-2 cursor-pointer w-12 h-12 rounded-full' src={user.img} alt="User Profile"></img>
        <div>
            <p className='text-lg text-gray-600'>{user.name}</p>
            <p className='text-xs text-gray-600'><b className='font-bold text-gray-400'>Email: </b>{user.email}</p>

        </div>
        </div>
      
    </div>
  )
}

export default UserListItem
