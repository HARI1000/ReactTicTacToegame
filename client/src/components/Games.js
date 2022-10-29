import React,{useState} from 'react'
import Board from '../components/Board'
import './Chat.css'
import {Window,MessageList,MessageInput} from 'stream-chat-react'
function Games({channel,setChannel}) {
  const [result,setResult]=useState({winner:"none",state:"none"});
    const [playersJoined,setPlayersJoined]=useState(channel.state.watcher_count===2)
    channel.on("user.watching.start",(event)=> {
      setPlayersJoined(event.watcher_count === 2)
  if(!playersJoined)
  {
    return <div> Waiting for other player to join</div>
  };
  
  })
  return (

    <div className='gameContainer'>
    {result.state === 'won' && <h1>{result.winner}Won the Game </h1>}
    {result.state === 'tie' && <h1>Draw</h1>}
    <Board result={result} setResult={setResult}/>
   <Window>
    <MessageList disableDateSeparator closeReactionSelectorOnClick messageActions={['react']}/>
    <MessageInput  noFiles />
   </Window>
   <button onClick={async()=>{await channel.stopWatching();
    setChannel(null)
   }}></button>
    </div>
   
  )
}


export default Games;