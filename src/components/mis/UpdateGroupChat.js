import React, { useState } from "react";
import UserBadgeItem from "./UserBadgeItem";
import UserListItem from "./UserListItem";

const UpdateGroupChat = (props) => {

    const [groupChatName,setGroupChatName]=useState(props.selectedChat.chatName);
    const [search,setSearch]=useState("");
    const[searchResult,setSearchResult]=useState([]);
    const[loading,setLoading]=useState(false);
    const[renameLoading,setRenameLoading]=useState(false);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    
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
    const handleRemove =async (userToRem)=>{
      if(props.selectedChat.groupAdmin._id!==userInfo._id){
        return;
      }
      if(props.selectedChat.users.find((u)=> u._id === userToRem._id)){
        try {
        const response = await fetch(`${props.host}/api/chat/groupremove`,{
        method:"PUT",
        headers:{
          "Content-type":"application/json",
            "auth-token":userInfo.token
        },
        body:JSON.stringify({"chatId":props.selectedChat._id,"userId":userToRem._id})
    });
    const json =await response.json();
    if(userToRem._id === userInfo._id){
      props.setSelectedChat();
      props.setFetchAgain(!props.fetchagain);
    }
    else{
    props.setSelectedChat(json);
    props.setFetchAgain(!props.fetchagain);
    props.fetchMessages();
    setRenameLoading(false);
    }
       } catch (error) {
        console.log(error);
       }
    }
    else{
      console.log("No User found");
    }
  }
    

    const handleRename=async ()=>{
     
      if(!groupChatName){
        return;
      }

      try {
        setRenameLoading(true);
        const response = await fetch(`${props.host}/api/chat/rename`,{
        method:"PUT",
        headers:{
          "Content-type":"application/json",
            "auth-token":userInfo.token
        },
        body:JSON.stringify({"chatId":props.selectedChat._id,"chatName":groupChatName})
    });
    const json =await response.json();
    //console.log(json);
    props.setSelectedChat(json);
    props.setFetchAgain(!props.fetchagain);
    setRenameLoading(false);
    
      } catch (error) {
        console.log(error);
      }
    }

    const handleAddUser =async(userToAdd)=>{

      if(props.selectedChat.users.find((u)=> u._id === userToAdd._id)){
        //toast
        console.log("user Already exists");
        return;
       }

       try {
        const response = await fetch(`${props.host}/api/chat/groupadd`,{
        method:"PUT",
        headers:{
          "Content-type":"application/json",
            "auth-token":userInfo.token
        },
        body:JSON.stringify({"chatId":props.selectedChat._id,"userId":userToAdd._id})
    });
    const json =await response.json();
    props.setSelectedChat(json);
    props.setFetchAgain(!props.fetchagain);
    setRenameLoading(false);
       } catch (error) {
        console.log(error);
       }


    }
    const handleExistGroup= async()=>{
      try {
        const response = await fetch(`${props.host}/api/chat/groupremove`,{
        method:"PUT",
        headers:{
          "Content-type":"application/json",
            "auth-token":userInfo.token
        },
        body:JSON.stringify({"chatId":props.selectedChat._id,"userId":userInfo._id})
    });
    const json =await response.json();
    props.setSelectedChat();
    props.setFetchAgain(!props.fetchagain);
    window.location.reload();

      } catch (error) {
        console.log(error);
      }
    }
     
  return (
    <div className="">
      <button
        className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-lg font-medium uppercase leading-normal transition duration-150 ease-in-out hover:bg-primary-600"
        data-te-toggle="modal"
        data-te-target="#exampleModal"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        <i className="fa-solid fa-user-group"></i>
      </button>

      <div
        data-te-modal-init
        className="fixed top-0 left-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          data-te-modal-dialog-ref
          className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px] ml-0.5 mr-0.5"
        >
          <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
            <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
              <h5
                className="text-xl font-semibold font-sans leading-normal text-neutral-800 dark:text-neutral-200"
                id="exampleModalLabel"
              >
                <>{props.selectedChat.chatName}<p className="text-lg font-mono font-bold">Admin:{props.selectedChat.groupAdmin.name}</p></>
                
              </h5>
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
            <div className="flex flex-col m-2 p-2">
             <p>Group Members:</p>
            <div className='flex w-full flex-wrap'>
                      {props.selectedChat.users.map((u)=>(<UserBadgeItem key={u._id} user={u} handleFunction={()=>handleRemove(u)}/>))}
                    </div>
              <div>
             {(props.selectedChat.groupAdmin._id === userInfo._id) && <>
              <p className='font-semibold text-xl mt-3'>Rename group:</p>
              <div className="flex">
              <input className="p-2 mt-2 mx-3 rounded-xl border-violet-500 border-solid focus:border-violet-400" type="text" name="grpname" placeholder='Enter group name' value={groupChatName} onChange={(e)=>setGroupChatName(e.target.value)}></input>
              <button className="ml-1 bg-teal-200 px-1 rounded-xl  text-base " onClick={handleRename} >Rename</button>
              </div>

              <p className='font-semibold text-xl mt-3'>Add members:</p>
              <input className="p-2 mt-2 mx-3 rounded-xl border-violet-500 border-solid focus:border-violet-400" type="text" name="members" placeholder='Add members to Group'  onChange={(e)=>handleSearch(e.target.value)}></input>
              <div className='mt-3 mx-3'>
                    {loading?<div>loading</div>:(
                      searchResult?.slice(0,3).map((user)=>(<UserListItem key={user._id} user={user} handleFunction={()=>handleAddUser(user)}/>)

                      )
                    )}
                    </div>

              
              </>}
              
              <div className="flex mt-2 justify-end">
              <button className="ml-1 bg-orange-200 px-2 rounded-xl py-1 text-base " onClick={handleExistGroup}>Exist  Group</button>
              </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default UpdateGroupChat;
