import React, {useEffect, useState} from 'react';

function Messages({socket}) {
    const [messages, setMessages] = useState({});

    useEffect(() => {
        const messageListener = (msg) => {
            setMessages((prevMsg) => {
                const newMsg = {...prevMsg};
                newMsg[msg.id] = msg;
                return newMsg;
            });
        };

        const deleteMessageListener = (msgId) => {
            setMessages((prevMsg) => {
                const newMsg = {...prevMsg};
                delete newMsg[msgId];
                return newMsg;
            })
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
        <div>
            {[...Object.values(messages)].sort((a, b) => a.time - b.time).map((message) => (
                <div key={message.id} title={`Sent at ${new Date(message.time).toLocaleDateString()}`}>
                    <p>{message.value}</p>
                    <p>{new Date(message.time).toLocaleTimeString()}</p>
                </div>
            ))}
        </div>
    )
}

export default Messages