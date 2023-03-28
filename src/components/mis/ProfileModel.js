import React from 'react'

const ProfileModel = (props) => {
  return (
    <div>
     
        


     <button
              className="font-sans hover:scale-105 duration-300  hover:text-cyan-300 "
              data-te-toggle="modal"
              data-te-target={`#exampleModalCenter${props.modal}`}
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              {props.name}
            </button>

            <div
              data-te-modal-init
              className="fixed top-0 left-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
              id={`#exampleModalCenter${props.modal}`}
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
                    <div className="w-1/3 "><img src={props.userInfo.img} className="flex w-36 h-36 rounded-full"  alt="userProfile"></img></div>
                    <div className="w-2/3  pl-4 ">
                        <h3 className="font-sans text-xl mb-1 font-semibold"> Name</h3>
                        <h4 className="font-mono text-lg mb-1">{props.userInfo.name}</h4>
                        <h3 className="font-sans text-xl mb-1 font-semibold"> Email</h3>
                        <h4 className="font-mono text-lg mb-1">{props.userInfo.email}</h4>
                    </div>
                  
                  </div>
        
                </div>
              </div>
            </div>
          </div>


  )
}

export default ProfileModel
