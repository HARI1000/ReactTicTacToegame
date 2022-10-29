import React,{useState} from 'react';
import {useChatContext,Channel} from 'stream-chat-react';
import Games from '../components/Games'
import CustomInput from './CustomInput';
function JoinGame() {
  const [rivalUsername,setRivalUsername] = useState("");
  const {client} = useChatContext();
  const [channel,setChanel]=useState(null);

  const createChannel = async () =>
  {
    const response = await client.queryUsers({name :{$eq: rivalUsername}});
    if (response.users.length ===0)
    {
      alert("user not found");
      return;
    }
    const newChannel =await client.channel("messaging",{members:[client.userID,response.users[0].id]});
    await newChannel.watch();
    setChanel(newChannel);
}
  return (
    <>
    {channel ? (<Channel channel={channel} Input={CustomInput}>
    <Games channel={channel} setChanel={setChanel}/>
    <h1> Game Started</h1>
    </Channel>):(
    <div className='joinGame'>
      <h4>Create Game</h4>
      <input placeholder='Username of rival' onChange={(e)=>{setRivalUsername(e.target.value)}}></input>
      <button onClick={createChannel}>Join/Start</button>
    </div>)
    }
    </>
  )
}

export default JoinGame