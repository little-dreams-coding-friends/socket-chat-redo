const uuidv4 = require('uuid').v4;

const messages = new Set();
const messageExpireTimeMS = 5 * 60 * 1000;

class Connection {
    constructor (io, socket) {
        this.socket = socket;
        this.io = io;

        socket.on('getMessages', () => this.getMessages());
        socket.on('message', (value) =>  this.handleMessage(value));
        socket.on('disconnect', () => this.disconnet());
        socket.on('connect_error', (err) => {
            console.log('connect_error due to ' + err.message);
        });
    }

    sendMessage(message) {
        this.io.sockets.emit('message', message);
    }

    handleMessage(value) {
        const message = {
            id: uuidv4(),
            value,
            time: Date.now()
        };

        messages.add(message);
        this.sendMessage(message);

        setTimeout(
            () => {
                messages.delete(message);
                this.io.sockets.emit('deleteMessage', message.id);
            },
            messageExpireTimeMS,
        );
    }
}

function chat(io) {
    io.on('connection', (socket) => {
        new Connection(io, socket);
    });
};

module.exports = chat;