const net = require('net');

const HOST = '0.0.0.0';
const PORT = 8254;

const server = net.createServer((socket) => {
  // handle incoming client connections
  console.log('client connected');

  // add new socket to array of connected sockets
  sockets.push(socket);
  
    socket.on('data',(data) => {
        console.log(data);
        sockets.forEach((sock) => {
            if (sock!=socket && !sock.destroyed) {
                sock.write(data);
            }
        });
    });

  // remove socket from array of connected sockets when it disconnects
  socket.on('end', () => {
    console.log('client disconnected');
    sockets.splice(sockets.indexOf(socket), 1);
  });
});

const sockets = [];

server.listen(PORT,HOST, () => {
  console.log('server listening on port 8254');
});

server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
      console.log('Address in use, retrying...');
      setTimeout(() => {
        server.close();
        server.listen(PORT, HOST);
      }, 2000);
    }
});