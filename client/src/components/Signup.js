import React,{useState} from 'react'
import Axios from 'axios';
import Cookies from 'universal-cookie';
function Signup({setIsAuth}) {
  const cookies= new Cookies();
  const [user,setuser]= useState(null);
  const signup =() =>
  {
    Axios.post("http://localhost:3001/signup",user).then(res => {
      const{token,userId,firstName,lastName,username,hashedPassword}=res.data; 
      cookies.set("token",token);
      cookies.set("userId",userId);
      cookies.set("firstName",firstName);
      cookies.set("lastName",lastName);
      cookies.set("username",username);
      cookies.set("hashedPassword",hashedPassword);
      setIsAuth(true);
    })
  }
  return (
    <div className='signUp'>
    <label>Signup</label>
    <input placeholder='Firstname' onChange={(e)=>setuser({...user,firstName:e.target.value})}></input>
    <input placeholder='Lastname' onChange={(e)=>setuser({...user,lastName:e.target.value})}></input>
    <input placeholder='username' onChange={(e)=>setuser({...user,username:e.target.value})} ></input>
    <input placeholder='Password' onChange={(e)=>setuser({...user,password:e.target.value})}></input>
    <button onClick={signup}>Signup</button>
    
    </div>
  )
}

export default Signup