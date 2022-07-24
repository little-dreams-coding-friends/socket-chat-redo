import React, {useState} from 'react';
import './MessageInput.css';

const NewMessage = ({socket}) => {
    const [value, setValue] = useState('');
    const submitForm = (e) => {
        e.preventDefault();
        socket.emit('message', value);
        console.log(value);
        setValue('');
};

return (
    <form onSubmit={submitForm}>
        <input
            value={value}
            placeholder="Type your message"
            onChange={(e) => {
            setValue(e.currentTarget.value);
            }}
        />
        </form>
    );
};

export default NewMessage;