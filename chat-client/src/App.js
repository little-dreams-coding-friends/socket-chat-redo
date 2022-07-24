import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
import Messages from './Messages';
import MessageInput from './MessageInput';
import './App.css';

function App() {

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}: 3000`);
    setSocket(newSocket);

    return () => newSocket.close();
  }, [setSocket]);

  return (
    <div className="App">
      <header className="App-header">Welcome to our Chat</header>
          {socket ? (
            <div> 
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
