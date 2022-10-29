import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import {StreamChat} from 'stream-chat';
import Cookies from "universal-cookie";
import {useState } from "react";
import {Chat} from 'stream-chat-react' ;
import JoinGame from "./components/JoinGame";
function App() {
const api_key='w6av3yf8qce9';
const cookies=new Cookies();
const token =cookies.get('token');
const client =StreamChat.getInstance(api_key);
const [isAuth,setIsAuth]=useState(false);
if (token){
  client.connectUser({id:cookies.get('userId'),name:cookies.get('username'),
firstName:cookies.get('firstName'),lastName:cookies.get('lastName'),
hashedPassword:cookies.get('hashedPassword')},token).then((user)=>{setIsAuth(true);
  console.log(user)})
}
function logout(){
  cookies.remove("token");
  cookies.remove("userId");
      cookies.remove("firstName");
      cookies.remove("lastName");
      cookies.remove("username");
      cookies.remove("hashedPassword");
      client.disconnectUser();
      setIsAuth(false);
}
return (<div className="App">
  {isAuth ? (<Chat client={client}>
  <JoinGame/>
  <button className='button' onClick={logout}>Log out</button>
  </Chat>):(
    <div><Login setIsAuth={setIsAuth}/>
  <Signup setIsAuth={setIsAuth}/>
  </div>
  )}
  </div>
  )
}

export default App;
