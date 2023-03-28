import React from 'react'

const UserBadgeItem = ({user,handleFunction}) => {
  return (
    <div className='mx-1'>
        <div onClick={handleFunction} className="cursor-pointer bg-[#e36edf]  text-white w-full flex space-x-1 items-center pl-2 py-1 m-2 flex-wrap rounded-lg">
            <p className='text-base'>{user.name} </p>
            <i className="fa-solid fa-xmark text-sm "></i>
        </div>
      
    </div>
  )
}

export default UserBadgeItem
