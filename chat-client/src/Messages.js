import React, {useEffect, useState} from 'react';
import './Messages.css';

function Messages({ socket }) {
    const [messages, setMessages] = useState({});

useEffect(() => {
    const messageListener = (message) => {
    setMessages((prevMessages) => {
        const newMessages = {...prevMessages};
        newMessages[message.id] = message;
        console.log(newMessages);
        return newMessages;
    });
    };

    const deleteMessageListener = (messageID) => {
    setMessages((prevMessages) => {
        const newMessages = {...prevMessages};
        delete newMessages[messageID];
        return newMessages;
    });
    };

    socket.on('message', messageListener);
    socket.on('deleteMessage', deleteMessageListener);
    socket.emit('getMessages');

    return () => {
    socket.off('message', messageListener);
    socket.off('deleteMessage', deleteMessageListener);
    };
}, [socket]);

return (
    <div className="msgList">
    {[...Object.values(messages)]
        .sort((a, b) => a.time - b.time)
        .map((message) => (
        <div
            key={message.id}
            className="msg-box">   
            <p className="msg">{message.value}</p>
            <p  className="timestamp">{new Date(message.time).toLocaleTimeString()}</p>
        </div>
        ))
    }
    </div>
);
}

export default Messages;