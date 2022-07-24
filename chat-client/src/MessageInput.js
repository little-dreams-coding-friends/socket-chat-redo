import React, {useState} from 'react';

const NewMessage = ({socket}) => {
    const [value, setValue] = useState('');

    const submitFormHandler = (e) => {
        e.preventDefault();
        socket.emit('message', value);
        setValue('');
    }

    return (
        <form onSubmit={submitFormHandler}>
            <input value={value} onChange={(e) => {
                setValue(e.currentTarget.value);
            }}/>
        </form>
    )
}

export default NewMessage;