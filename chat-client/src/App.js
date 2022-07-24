import React, {useEffect, useState} from 'react';
import io from 'socket.io-cleint';
import Messages from './Messages';
import MessageInput from './MessageInput';
import './App.css';

function App() {

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`httlp://${window.location.hostname}: 3000`);
    setSocket(newSocket);

    return () => newSocket.close();
  }, [setSocket]);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
