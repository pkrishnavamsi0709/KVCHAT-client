import React,{useState} from 'react'
import HomePage from './HomePage';
import { useNavigate } from "react-router";

const Signup = (props) => {
    const navigate=useNavigate();
    const host="";
    const [show,setShow]=useState(false);
    const [login,setlogin]=useState(true);
    const [loading,setLoading]=useState(false);
    const [info,setInfo]=useState({
        name:"",
        email:"",
        password:"",
        cpassword:"",
    });
    const [img,setImg]=useState("");
    //This is for the Alert to show
    const [alert,setAlert]=useState({
      msg:"",
      color:"",
    })
    //for showing password
    const onshow=()=>{
       if(show===true){
        setShow(false);
       }
       else{
        setShow(true);
       }
    }

   const onclick1 = () => {
    if(login===true){
      setlogin(false);
    }
    else{
      setlogin(true);
    }
   }
 
   // This to show the Alert message 
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

   const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  //this is used when we submit the signup form

  const handleSubmit =async(e)=>{
   e.preventDefault();
   setLoading(true);
   if(info.password===""|| info.name==="" || info.email===""|| info.cpassword===""){
    setLoading(false);
    showAlert("Once check Details","red",3000);
    return;
   }
   else if(info.password!==info.cpassword){
    setLoading(false);
    showAlert("Check you password once","red",3000);
    return;
   }
   const response = await fetch(`${props.host}/api/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name:info.name,
      email:info.email,
      password:info.password,
      img:img
    }),
  });
  const json = await response.json();
  console.log(json);
  setInfo({name:"",
  email:"",
  password:"",
  cpassword:"",});
  setImg("");
  setLoading(false);
  showAlert("Sucessfully Registered","green",3000);

  setTimeout(() => {
    navigate("/");
  }, 3000);


  }
  

  const convImg=(pic)=>{
   setLoading(true);
    const data =new FormData();
    data.append("file",pic);
    data.append("upload_preset","KVCHAT");
    data.append("cloud_name","dsjkkcomr");
    fetch("https://api.cloudinary.com/v1_1/dsjkkcomr/image/upload",{
      method:'POST',
      body:data,
    }).then((res)=>res.json())
    .then(data=>{ setImg(data.url.toString());
      setLoading(false);
    })
    .catch((err)=>{
      console.log(err);
      setLoading(false);
    })
   };



return (
    <div>
      {login?<div className="bg-gray-200 flex rounded-xl md:shadow-lg  p-5 items-center max-w-2xl">
            
            <div className="md:w-4/6 max-h-vh px-16">
                {<p className={`alert text-${alert.color}-400 font-sans font-bold`}>{alert.msg}</p>}
                <h2 className="font-bold text-2xl text-cyan-600" >SignUp</h2>
                <p className="text-sm mt-4 text-cyan-600">create your own account to enjoy</p>
                
                <form action="" className="flex flex-col gap-5 ">
                    <input className="p-2 mt-8 rounded-xl border "type="text" name="name" value={info.name} onChange={handleChange} placeholder="Name"/>
                    <input className="p-2 rounded-xl border "type="text" name="email" value={info.email} onChange={handleChange} placeholder="Email"/>
                    <div className="relative">
                        <input className="p-2 rounded-xl border w-full" type={show?"text":"password"} name="password" onChange={handleChange} placeholder="Password" value={info.password}/>
                        {show?<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16" onClick={onshow}>
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                          </svg>
                          :<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash-fill absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16" onClick={onshow}>
                            <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
                            <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
                          </svg>}
                    </div>
                    <input className="p-2 rounded-xl border "type="password" name="cpassword" onChange={handleChange} placeholder="Confirm Password" value={info.cpassword}/>
                    <p className="-my-2 px-1 text-cyan-600">Upload Image</p>
                    <input className="p-1 file:rounded-lg  rounded-xl border bg-slate-100 text-cyan-600 file:bg-violet-50"type="file"  accept="image/*" onChange={(e)=>{convImg(e.target.files[0])}} name="profile"/>
                    
                    <button  className="bg-cyan-500 p-2 rounded-xl text-white md:hover:scale-105 duration-300" onClick={handleSubmit}>{loading?<div><i className="fa fa-circle-o-notch fa-spin"></i>Loading</div>:<p>SignUp</p>}</button>
                </form>
                

                <div className="text-xs flex justify-between mt-10 items-center">
                         <p className="text-cyan-600" >Have an Account?</p>
                         <button className="bg-cyan-500 px-3 py-2 rounded-xl text-white md:hover:scale-110 duration-300" onClick={onclick1} >Login</button>
                </div>
                

            </div>
             <div className="w-2/6 bg-red-200 md:block hidden">
                <img className=" rounded-xl"src="https://wallpaperaccess.com/full/4518749.jpg" alt=""/>
             </div>
        </div>:<HomePage/>}
    </div>
  )
}

export default Signup
