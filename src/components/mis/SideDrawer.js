import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import UserListItem from "./UserListItem";
import UserNotification from "./UserNotification";

const SideDrawer = (props) => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const handleSearch = async (search1) => {
    //e.preventDefault();
    if (!search1) {
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
        `${props.host}/api/user/allUsers?search=${search1}`,
        {
          method: "GET",
          headers: {
            "auth-token": userInfo.token,
          },
        }
      );
      const json = await response.json();
      setSearchResult(json);
      setLoading(false);
    } catch (error) {
      console.log("error ocuured");
    }
  };


  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const response = await fetch(`${props.host}/api/chat`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": userInfo.token,
        },
        body: JSON.stringify({ userId }),
      });
      const json = await response.json();
      if (!props.chats.find((c) => c._id === json._id)) {
        props.setChats([json, ...props.chats]);
      }
      props.setSelectedChat(json);
      setLoadingChat(false);
      ref.current.click();
    } catch (error) {
      console.log("error not found");
    }
  };




  return (
    <div>
      <div className="flex justify-between content-center  w-auto px-3 py-2 bg-gray-500 border-spacing-1">
        
        

        <button
      className="flex content-center px-4 hover:scale-105 duration-300  hover:text-cyan-300"
      type="button"
      data-te-offcanvas-toggle
      data-te-target="#offcanvasExample"
      aria-controls="offcanvasExample"
      data-te-ripple-init
      data-te-ripple-color="light">
      <div>
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <p className="pl-2 font-semibold md:block hidden">Search User </p>
    </button>

    <div
      className="invisible fixed bottom-0 top-0 left-0 z-[1045] flex w-80 max-w-full -translate-x-full flex-col border-none bg-white bg-clip-padding text-neutral-700 shadow-sm outline-none transition duration-300 ease-in-out dark:bg-neutral-800 dark:text-neutral-200 [&[data-te-offcanvas-show]]:transform-none"
      tabIndex="-1"
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
      data-te-offcanvas-init>
      <div className="flex items-center justify-between p-4">
        <h5
          className="mb-0 font-semibold leading-normal"
          id="offcanvasExampleLabel">
           Search User
        </h5>
        <button
          ref={ref}
          type="button"
          className="box-content rounded-none border-none opacity-50 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
          data-te-offcanvas-dismiss>
          <span
            className="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
        </button>
      </div>
      <div className="flex-grow overflow-y-auto p-4">
      <div className="flex pb-2">
            <input
              className="p-2 mr-3 rounded-xl border-violet-500 border-solid focus:border-violet-400"
              type="text"
              placeholder="Search by name or Email"
              value={search}
              onChange={(e) => {
                handleSearch(e.target.value);
                setSearch(e.target.value);
              }}
            ></input>
            <button
              className="bg-blue-500 px-4 py-2 rounded-xl text-white md:hover:scale-105 duration-300"
              onClick={handleSearch}
            >
              {loading ? (
                <div className="flex">
                  <i className="fa fa-circle-o-notch fa-spin"></i>
                </div>
              ) : (
                <p>Go</p>
              )}
            </button>
          </div>
          {loading ? (
            <ChatLoading />
          ) : (
            (searchResult.length)?searchResult?.map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => accessChat(user._id)}
              />
            )):<p className="py-3 px-2 text-xl font-semibold">No users Found</p>
          )}
      </div>
    </div>

        <p className="font-serif hover:text-cyan-500 hover:scale-105 duration-300">
          KV CHAT
        </p>
        <div className="flex justify-between space-x-4">
         
          <img
            src={userInfo.img}
            className="flex w-8 h-8 rounded-2xl"
            alt="Profile"
          ></img>
          <div className="flex  space-x-3 ">
            <button
              className="font-sans hover:scale-105 duration-300  hover:text-cyan-300 "
              data-te-toggle="modal"
              data-te-target="#exampleModalCenter"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              Profile
            </button>


            <div
              data-te-modal-init
              className="fixed top-0 left-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
              id="exampleModalCenter"
              tabIndex="-1"
              aria-labelledby="exampleModalCenterTitle"
              aria-modal="true"
              role="dialog"
            >
              <div
                data-te-modal-dialog-ref
                className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px] mr-7"
              >
                <div className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                  <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-neutral-100 border-opacity-100 p-0.5 dark:border-opacity-50 space-x-5">
                    <h1 className="font-semibold text-xl">
                      Profile Information:
                    </h1>
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
                    <div className="w-1/3 ">
                      <img
                        src={userInfo.img}
                        className="flex w-36 h-36 rounded-full"
                        alt="userProfile"
                      ></img>
                    </div>
                    <div className="w-2/3  pl-4 ">
                      <h3 className="font-sans text-xl mb-1 font-semibold">
                        {" "}
                        Name
                      </h3>
                      <h4 className="font-mono text-lg mb-1">
                        {userInfo.name}
                      </h4>
                      <h3 className="font-sans text-xl mb-1 font-semibold">
                        {" "}
                        Email
                      </h3>
                      <h4 className="font-mono text-lg mb-1">
                        {userInfo.email}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            className="font-sans hover:scale-105 duration-300 hover:text-cyan-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideDrawer;
