import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const PORT = 8080;

app.use(express.static('src/public'));

io.on('connection', (socket) => {
    console.log('Un cliente se conecto')
    socket.on("chat message", (msg) => {
        console.log('mensaje recibido:',msg) // '${msg.nombre}: ${msg.mensaje}')
        io.emit('chat message',msg)
    })

    socket.on('disconnect',()=>{
        console.log('Un cliente se desconecto')
    })
});

httpServer.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})