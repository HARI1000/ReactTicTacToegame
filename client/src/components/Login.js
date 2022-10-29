import React,{useState} from 'react'
import Axios from 'axios'
import Cookies from 'universal-cookie';

function Login({setIsAuth}) {
  const [username,setusername]= useState(null);
  const [password,setpassword]= useState(null);
  const cookies = new Cookies();
  const login = ()=>{
    Axios.post("http://localhost:3001/login",{username,password}).then((res) => {
      const {token,firstName,lastName,username,userId}=res.data;
      cookies.set("token",token);
      cookies.set("userId",userId);
      cookies.set("username",username);
      cookies.set("firstName",firstName);
      cookies.set("lastName",lastName);
      setIsAuth(true)
    })
  }
  return (
    <div className='login'>
    <label>Login</label>
    <input placeholder='Loginup' onChange={(e)=>setusername(e.target.value)} ></input>
    <input placeholder='Password' onChange={(e)=>setpassword(e.target.value)}></input>
    <button onClick={login}>Login</button>
    </div>
  )
}

export default Login