import React, { useEffect, useRef, useState } from 'react'
import ChatLoading from './ChatLoading';
import {getSender,getSenderPic} from '../config/ChatLogics';
import UserListItem from './UserListItem';
import UserBadgeItem from './UserBadgeItem';

const MyChats = (props) => {
  const ref=useRef(null);
  const [loggedUser,setLoggedUser] =useState();
  //This is for the group modal 
  const [groupChatName,setGroupChatName]=useState();
  const [selectedUsers,setSelectedUsers]=useState([]);
  const [search,setSearch]=useState("");
  const [searchResult,setSearchResult]=useState([]);
  const [loading,setLoading]=useState(false);


  //
  const userInfo =JSON.parse(localStorage.getItem("userInfo"));
  const fetchChats = async(userId)=>{
    try {
      const response = await fetch(`${props.host}/api/chat`,{
        method:"GET",
        headers:{
            "auth-token":userInfo.token,
        },
    });
    const json =await response.json();
    console.log(json);
    props.setChats(json);
    } catch (error) {
      console.log("error not found");
    }
  }

  useEffect(()=>{
   setLoggedUser(userInfo);
   fetchChats();
  },[props.fetchagain])

  const handleSearch= async(query)=>{
      setSearch(query);
      if(!query){
        return;
      }
      try {
        setLoading(true);
      const response = await fetch(`${props.host}/api/user/allUsers?search=${search}`,{
        method:"GET",
        headers:{
            "auth-token":userInfo.token
        },
    });
    const json =await response.json();
    setSearchResult(json);
    //console.log(json);
    setLoading(false);

      } catch (error) {
        
      }
  }

  //this is for to create group 
  const handleSubmit=async ()=>{

    //toast 
    if(!groupChatName || !selectedUsers){
      console.log("please fill the details");
      return;
    }

    try {
      const response = await fetch(`${props.host}/api/chat/group`,{
        method:"POST",
        headers:{
          "Content-type":"application/json",
            "auth-token":userInfo.token
        },
        body:JSON.stringify({"name":groupChatName,"users":selectedUsers.map((u)=>u._id)})
    });
    const json =await response.json();
    
    props.setChats([json,...props.chats])
    setSelectedUsers([]);
    setGroupChatName("");
    setSearch("");
    setSearchResult([]);
    ref.current.click();
    //toast 
    //console.log("Group chat created");

    } catch (error) {
      console.log("errors occured");
    }

  }

  //to add users

  const handleGroup=(userToAdd)=>{
    if(selectedUsers.includes(userToAdd)){
      //toast
      console.log("user Already exists");
      return;
     }
   setSelectedUsers([...selectedUsers,userToAdd]);

  }

  const handleDelete=(u) =>{
    const user = selectedUsers.filter((user)=>{return user._id!==u._id})
    setSelectedUsers(user);
    
  }
  return (

    <div className={` md:flex ${props.selectedChat ? 'hidden' : 'flex'} flex-col items-center p-3 bg-white md:w-1/3 w-full h-[90vh] rounded-lg border-2`}>
      <div className='pb-3 px-3 md:text-xl text-lg font-sans flex w-full justify-between items-center'>
        <p className='font-sans text-xl font-medium'>My Chats</p>
        <button className='flex md-2 md:text-lg text-sm font-sans font-medium bg-cyan-300 rounded-md px-1 '  data-te-toggle="modal"
              data-te-target="#exampleModalCenter1"
              data-te-ripple-init
              data-te-ripple-color="light"> Create Group</button>
          <div
              data-te-modal-init
              className="fixed top-0 left-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
              id="exampleModalCenter1"
              tabIndex="-1"
              aria-labelledby="exampleModalCenter1Title"
              aria-modal="true"
              role="dialog"
            >
              <div
                data-te-modal-dialog-ref
                className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px] mx-2"
              >
                <div className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                  <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-neutral-100 border-opacity-100 p-0 dark:border-opacity-50 space-x-5">
                  <h1 className="font-semibold text-xl"></h1>
                    <button
                      type="button"
                      ref={ref}
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
                  <div className=" flex flex-col p-3">
                    <p className='font-semibold text-xl '>Group Name:</p>
                    <input className="p-2 mt-2 mx-3 rounded-xl border-violet-500 border-solid focus:border-violet-400" type="text" name="grpname" placeholder='Enter group name'  onChange={(e)=>setGroupChatName(e.target.value)}></input>
                    <p className='font-semibold text-xl mt-3'>Group members:</p>
                    <input className="p-2 mt-2 mx-3 rounded-xl border-violet-500 border-solid focus:border-violet-400" type="text" name="members" placeholder='Add users to Group' value={search}onChange={(e)=>handleSearch(e.target.value)}></input>
                    <div className='flex w-full flex-wrap'>
                      {selectedUsers.map((u)=>(<UserBadgeItem key={u._id} user={u} handleFunction={()=>handleDelete(u)}/>))}
                    </div>
                    <div className='mt-3 mx-3'>
                    {loading?<div>loading</div>:(
                      searchResult?.slice(0,4).map((user)=>(<UserListItem key={user._id} user={user} handleFunction={()=>handleGroup(user)}/>)

                      )
                    )}
                    </div>
                    
                    <div className='flex justify-end mt-4 mr-4 '>
                      <button className='px-1 bg-green-200 rounded-lg text-semibold hover:scale-105 duration-300 ' onClick={handleSubmit}>Create</button>
                    </div>
                  </div>
        
                </div>
              </div>
            </div>    
      </div>
      <div className='flex flex-col p-3 bg-[#f6f7f2] w-full h-full rounded-lg overflow-hidden'>
          {props.chats ? (
            <div className='overflow-scroll'> { props.chats.map((chat)=>(<div 
              className={`cursor-pointer border-b-[0.5px]  border-gray-300 ${props.selectedChat === chat ? "bg-[#a8e9ba]":'bg-[#FFFFF]'} ${props.selectedChat === chat ? 'text-white':'text-black'} px-3 py-4 hover:bg-[#c5f6d3]`} onClick={()=>props.setSelectedChat(chat)} key={chat._id}>
                {/* <>
                {!chat.isGroupChat?(

           <img src={getSenderPic(loggedUser,chat.users)}></img>
):(<img src="https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=600" ></img>)}
                </> */}
                
                <p>{!chat.isGroupChat?(

                  getSender(loggedUser,chat.users)
                ):(chat.chatName)}</p>
              </div>))}</div>
          ):<ChatLoading/>}
      </div>
    </div>
  )
}

export default MyChats
