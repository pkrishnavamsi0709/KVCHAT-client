import React from 'react'
import SingleChat from './SingleChat'

const ChatBox = (props) => {
  return (
    <div className={`md:flex ${props.selectedChat ? 'flex' : 'hidden'} md:w-4/6 w-full  bg-white p-3 flex flex-col items-center rounded-lg border-2 `}>
      <SingleChat setSelectedChat={props.setSelectedChat} selectedChat={props.selectedChat}  fetchagain={props.fetchagain} setFetchAgain={props.setFetchAgain} notification={props.notification} setNotification={props.setNotification} host={props.host}/>
    </div>
  )
}

export default ChatBox
