import Ract, {useEffect, useState} from 'react';

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
    });

}

module.exports = Messages;