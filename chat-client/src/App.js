import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
import Messages from './Messages';
import MessageInput from './MessageInput';
import './App.css';
import logo from './MeowChat.png';

function App() {

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:8080`);
    console.log(`http://${window.location.hostname}:8080`)
    setSocket(newSocket);

    return () => newSocket.close();
  }, [setSocket]);

  return (
    <div className="App">
      <header className="App-header">Welcome to Friends Meow Chat</header>
      <img src={logo} alt="logo" />
          {socket ? (
            <div className ="chat-box"> 
              <Messages socket={socket}/>
              <MessageInput socket={socket}/>
            </div>
          ) : (
            <div>Not Connected</div>
          )}
    </div>
  );
}

export default App;
