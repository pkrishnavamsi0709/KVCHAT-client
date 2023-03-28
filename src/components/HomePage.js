import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router";
import Signup from "./Signup";

const HomePage = () => {
  const host="http://localhost:5000";
  const navigate=useNavigate();
  const [show, setShow] = useState(false);
  const [login, setlogin] = useState(true);
  const [loading,setLoading]=useState(false);
  const [info,setInfo]=useState({
    email:"",
    password:""
  })
  const [alert,setAlert]=useState({
    msg:"",
    color:"",
  })

  useEffect(()=>{
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if(userInfo){
        navigate("/chat");
    }
},[navigate])

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  //for showing password
  const onshow = () => {
    if (show === true) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  const onclick1 = () => {
    if (login === true) {
      setlogin(false);
    } else {
      setlogin(true);
    }
  };

  const showAlert=(message,color,timer)=>{
    setAlert({
      msg:message,
      color:color
    })
    setTimeout(() => {
      setAlert({
        msg:"",
        color:"",
      })
    },timer);
   }

   const handleSubmit =async(e)=>{
    e.preventDefault();
    setLoading(true);
    if(info.password===""|| info.email===""){
     setLoading(false);
     showAlert("Once check Details","red",3000);
     return;
    }
    try {
      const response = await fetch(`${host}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email:info.email,
          password:info.password,
        }),
      });
      
      const json = await response.json();
      if(json.status){
        localStorage.setItem("userInfo", JSON.stringify(json));
      console.log(json);
      setInfo({
      email:"",
      password:"",
      });
      showAlert("Login Sucessfull","green",1000);
      setLoading(false);
      setTimeout(() => {
        navigate("/chat");
      }, 1000);
    }
    else{
      showAlert("user Doesnt exist","red",1000);
      setLoading(false);
    }
    } catch (error) {
      showAlert("Error Occured!","red",1000);
      setLoading(false);
    }
    
 
   }
 

  return (
    <div className="">
      <section className=" md:bg-gray-100 min-h-screen flex justify-center items-center">
        
        
        {login ? (
          <div className="bg-gray-200 flex rounded-xl shadow-lg p-5 items-center max-w-3xl">


            <div className="md:w-1/2 px-16">
            {<p className={`alert text-${alert.color}-400 font-sans font-bold`}>{alert.msg}</p>}
              <h2 className="font-bold text-2xl text-cyan-600">Login</h2>
              <p className="text-sm mt-4 text-cyan-600">
                If you already have account easily login
              </p>

              <form action="" className="flex flex-col gap-5 ">
                <input
                  className="p-2 mt-8 rounded-xl border "
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                />
                <div className="relative">
                  <input
                    className="p-2 rounded-xl border w-full"
                    type={show ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <i className="bi bi-eye-slash-fill"></i>
                  {show ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-eye-fill absolute top-1/2 right-3 -translate-y-1/2"
                      viewBox="0 0 16 16"
                      onClick={onshow}
                    >
                      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-eye-slash-fill absolute top-1/2 right-3 -translate-y-1/2"
                      viewBox="0 0 16 16"
                      onClick={onshow}
                    >
                      <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                      <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                    </svg>
                  )}
                </div>

                <button className="bg-cyan-500 p-2 rounded-xl text-white md:hover:scale-105 duration-300" onClick={handleSubmit}>
                {loading?<div><i className="fa fa-circle-o-notch fa-spin"></i>Logging in</div>:<p>Login</p>}
                </button>
              </form>

              <div className="text-right mt-7">
                <a className="text-right text-cyan-600 text-sm" href="/forgot">
                  Forgot your password?
                </a>
              </div>

              <div className="text-xs flex justify-between mt-10 items-center">
                <p className="text-cyan-600">Don't have an account?</p>
                <button
                  className="bg-cyan-500 p-2 rounded-xl text-white hover:scale-110 duration-300"
                  onClick={onclick1}
                >
                  Register
                </button>
              </div>
            </div>
            <div className="w-1/2 md:block hidden">
              <img
                className=" rounded-xl"
                src="https://cdn.wallpapersafari.com/32/44/4i6IlG.jpg"
                alt=""
              />
            </div>
          </div>
        ) : (
          <Signup host={host} />
        )}
        
      </section>
    </div>
  );
};

export default HomePage;
