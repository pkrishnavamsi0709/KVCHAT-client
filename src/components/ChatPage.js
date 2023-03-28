import React, { useContext, useEffect, useState } from 'react'
import SideDrawer from './mis/SideDrawer'
import MyChats from './mis/MyChats'
import ChatBox from './mis/ChatBox'
import ProfileModel from './mis/ProfileModel'


const ChatPage = () => {

  const[chats,setChats]=useState([]);
  const [selectedChat,setSelectedChat]=useState(false);
  const [fetchagain,setFetchAgain]=useState(false);
  const [notification,setNotification]=useState([]);
  const host= "https://kvchat.onrender.com";
  
  return (
    <div className='md:bg-gray-100 h-screen flex-col'>
      <SideDrawer setSelectedChat={setSelectedChat} selectedChat={selectedChat} chats={chats} setChats={setChats} notification={notification} setNotification={setNotification} host={host}/>
      <div className='justify-between w-full max-h-[calc(100%-50px)] flex flex-row p-3'>
       <MyChats setSelectedChat={setSelectedChat} selectedChat={selectedChat} chats={chats} setChats={setChats} fetchagain={fetchagain} setFetchAgain={setFetchAgain}  host={host} />
       <ChatBox  setSelectedChat={setSelectedChat} selectedChat={selectedChat} fetchagain={fetchagain} setFetchAgain={setFetchAgain} notification={notification} setNotification={setNotification} host={host}/>
       
      </div>

      
    </div>
  )
}

export default ChatPage
