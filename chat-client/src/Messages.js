import React, {useEffect, useState} from 'react';

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
    <div className="message-list">
    {[...Object.values(messages)]
        .sort((a, b) => a.time - b.time)
        .map((message) => (
        <div
            key={message.id}
            className="message-container"
            title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
        >
            <span >{message.value}</span>
            <span >{new Date(message.time).toLocaleTimeString()}</span>
        </div>
        ))
    }
    </div>
);
}

export default Messages;