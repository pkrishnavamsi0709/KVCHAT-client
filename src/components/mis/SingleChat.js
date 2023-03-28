import React,{useEffect, useState} from 'react'
import { getSender } from '../config/ChatLogics';
import { getProfile } from '../config/ProfileLoader';
import ScrollableChat from './ScrollableChat';
import UpdateGroupChat from './UpdateGroupChat';

import io from 'socket.io-client';

const ENDPOINT ="http://localhost:5000";
var socket,selectedChatCompare;

const SingleChat = (props) => {

  const [messages,setMessages]=useState([]);
  const [loading,setLoading]=useState(false);
  const [newMessage,setNewMessage]=useState("");
    
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [socketconnected,setSocketConnected]=useState(false);

  const [typing,setTyping] =useState(false);
  const [isTyping,setisTyping] =useState(false);

  useEffect(()=>{
    socket=io(ENDPOINT);
    socket.emit("setup",userInfo);
    socket.on('connected',()=>{
    setSocketConnected(true);
    socket.on("typing",()=>setisTyping(true));
    socket.on("stop typing",()=> setisTyping(false));
    })
  },[])

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = props.selectedChat;
  }, [props.selectedChat])

  //console.log(props.notification);

  useEffect(()=>{
    socket.on("message received",(newMessageReceived)=>{
      if(!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id){
        if(!props.notification.includes(newMessageReceived)){
          props.setNotification([newMessageReceived,...props.notification]);
          props.setFetchAgain(!props.fetchagain);
        }
      }
      else{
        setMessages([...messages,newMessageReceived]);
      }
    })
  })

  
  
  const handleback=()=>{
    props.setSelectedChat(false);
  }
  const [user2,setUser2]= useState({});
  const getInfo=()=>{
    setUser2(getProfile(userInfo,props.selectedChat.users))
  }

  const sendMessage = async (event)=>{
     if(event.key === "Enter" && newMessage){
      socket.emit('stop typing',props.selectedChat._id);
        try {
        setNewMessage("");
        const response = await fetch(`${props.host}/api/message`,{
        method:"POST",
        headers:{
            "Content-type":"application/json",
            "auth-token":userInfo.token
        },
        body:JSON.stringify({"content":newMessage,"chatId":props.selectedChat._id})
    });
    const json =await response.json();
    //console.log(json);
    socket.emit("new message",json);
    
    setMessages([...messages,json]);

        } catch (error) {
          console.log("internal error");
        }
     }
  }

  const typingHandler =(e)=>{
    setNewMessage(e.target.value);
    if(!socketconnected) return;

    if(!typing){
      setTyping(true)
      socket.emit("typing",props.selectedChat._id);
    }

    let lastTypingTime =new Date().getTime();
    var timerLength =3000;
    setTimeout(()=>{
          var timeNow = new Date().getTime();
          var timeDiff = timeNow -lastTypingTime;

          if(timeDiff >= timerLength){
            socket.emit('stop typing',props.selectedChat._id);
            setTyping(false);
          }
    },timerLength)

    }

  const fetchMessages =async()=>{
    if(!props.selectedChat){
      return;
    }
    try {
      const response = await fetch(`${props.host}/api/message/${props.selectedChat._id}`,{
        method:"GET",
        headers:{
            "Content-type":"application/json",
            "auth-token":userInfo.token
        },
    });
    const json =await response.json();
    setMessages(json);
    socket.emit("join chat",props.selectedChat._id)
    } catch (error) {
      console.log("invalid error");
    }
  }


  return (
    <div className=' h-screen w-full overflow-hidden'>
      {
        props.selectedChat ? (<div className='h-full'><div className='text-lg md:text-xl pb-1 px-2 w-full font-sans flex justify-between md:flex items-center '>
        <p className='md:hidden'>
        <i className="fa-solid fa-arrow-left cursor-pointer " onClick={()=>handleback()}></i>
        
        </p>
        {
          !props.selectedChat.isGroupChat?(
            <>
            {getSender(userInfo,props.selectedChat.users)}
            <div>
            <button
                  className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-lg font-medium uppercase leading-normal transition duration-150 ease-in-out hover:bg-primary-600"
                  data-te-toggle="modal"
                  data-te-target="#exampleModalCenter2"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  onClick={()=>getInfo()}
                >
                  <i className="fa-solid fa-user" ></i>
                </button>
                <div
                  data-te-modal-init
                  className="fixed top-0 left-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
                  id="exampleModalCenter2"
                  tabIndex="-1"
                  aria-labelledby="exampleModalCenterTitle"
                  aria-modal="true"
                  role="dialog"
                >
                  <div
                    data-te-modal-dialog-ref
                    className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]"
                  >
                    <div className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                      <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-neutral-100 border-opacity-100 p-0.5 dark:border-opacity-50 space-x-5">
                      <h1 className="font-semibold text-xl">Profile Information:</h1>
                        <button
                          type="button"
                          className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                          data-te-modal-dismiss
                          aria-label="Close"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className=" flex p-3">
                        <div className="w-1/3 "><img src={user2.img} className="flex w-36 h-36 rounded-full"  alt="userProfile"></img></div>
                        <div className="w-2/3  pl-4 ">
                            <h3 className="font-sans text-xl mb-1 font-semibold"> Name</h3>
                            <h4 className="font-mono text-lg mb-1">{user2.name}</h4>
                            <h3 className="font-sans text-xl mb-1 font-semibold"> Email</h3>
                            <h4 className="font-mono text-base mb-1">{user2.email}</h4>
                        </div>
                      
                      </div>
            
                    </div>
                  </div>
                </div>
            </div>
            </>
            
          
          ):(<>
          {props.selectedChat.chatName.toUpperCase()}
          <UpdateGroupChat setSelectedChat={props.setSelectedChat} selectedChat={props.selectedChat}fetchagain={props.fetchagain} setFetchAgain={props.setFetchAgain} fetchMessages={fetchMessages} host={props.host}/>
          
          </>)
        }</div>
        
        <div className='flex flex-col justify-end p-3 bg-[#E8E8E8] w-full h-[92%] rounded-lg overflow-y-hidden'>
          {
            loading?
            <div className='h-full w-full flex items-center justify-center'><div
            className="inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-green-300  text-xl motion-reduce:animate-[spin_1.5s_linear_infinite] h-16 w-16 align-"
            role="status">
            <span
              className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
              >Loading...</span
            >
          </div>
          </div>:
          <div className='flex flex-col overflow-y-scroll '>
            <ScrollableChat messages={messages} host={props.host}/>
          </div>
          }
          {isTyping?<img src={require('../animations/typing.gif')} alt="typing" className='h-10 w-14'></img>:<></>}
          <input className="mt-3 bg-[#E0E0E0] p-2  text-black border-none rounded-lg"onKeyDown={sendMessage} required  placeholder='Enter a Message...' onChange={typingHandler} value={newMessage}></input>
        </div>

        
        </div>
        ): (
            <div className='flex items-center justify-center h-full'> 
            <p className='text-3xl pb-3 font-sans'>Click on a User to Start chatting</p>
            </div>
        )
      }

    </div>
  )
}

export default SingleChat
