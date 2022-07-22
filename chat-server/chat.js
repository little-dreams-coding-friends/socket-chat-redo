const uuidv4 = require('uuid').v4;

const message = new Set();

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
}
