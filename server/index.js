import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

//server holds user and chat info
const users = [];

app.use(cors());
app.use(express.json()); // Parse JSON requests

const io = new Server(server, {
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {

  socket.on("log_in", (data)=> {
    if (users.includes(data)) {
      socket.emit('logged_in', `back ${data}!`);
    } else {
      socket.emit('logged_in', `${data}`);
      users.push(data); // Store the new username
    }
    // Whenever users array changes, emit 'users_update'
    io.emit('users_update', users);
  })

  socket.on("log_out", (data)=>{
    //console.log(`USER ${data} with ID ${socket.id} logged out`);
  })

  socket.on("disconnect", ()=> {
    // console.log("User Disconnected", socket.id)
  });
});

server.listen(3001, () => {
  console.log('Server running on port 3001');
});
