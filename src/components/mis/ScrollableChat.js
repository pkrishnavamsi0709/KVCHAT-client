import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage ,isSameSender, isSameSenderMargin} from '../config/ChatLogics';

const ScrollableChat = ({messages}) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return (
    <ScrollableFeed>
      {messages && messages.map((m,i)=>(
       <div className={`flex flex-col ${m.sender._id === userInfo._id ? "items-end":"items-start"}`} key={m._id}>
        <div className='mt-1 flex'>
        {
         (isSameSender(messages,m,i,userInfo._id)||isLastMessage(messages,i,userInfo._id))&&(<a
         href="#"
         class="transititext-primary text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
         data-te-toggle="tooltip"
         title={`${m.sender.name}`}
         ><img src={m.sender.img} className="mt-2 mr-1 h-7 w-7 rounded-2xl cursor-pointer" ></img></a>)
        }

        <span className={`${m.sender._id === userInfo._id ? "bg-[#BEE3F8]":"bg-[#B9F5D0]"}  rounded-2xl px-2 py-2 mt-2 ${isSameSender(messages,m,i,userInfo._id)||isLastMessage(messages,i,userInfo._id)?"ml-[5px]":"ml-9"} max-width-[75%]`}>{m.content}</span>
        </div>
        
        
       </div>
      ))}
    </ScrollableFeed>
  )
}

export default ScrollableChat
