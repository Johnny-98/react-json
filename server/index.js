import bcrypt from 'bcrypt';
import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

// Store users as an array of objects with username and hashed password
const users = [];

app.use(cors());
app.use(express.json()); // Parse JSON requests

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    socket.on("register", (data) => {  
        console.log('Received user data:', data); 
        // Check if user with this name exists
        const userIndex = users.findIndex((user) => user.first_name === data.first_name);

        if (userIndex !== -1) {
            // User exists, check password
            if (bcrypt.compareSync(data.password, users[userIndex].password)) {
                socket.emit('logged_in', `Welcome back ${data.first_name}!`);
            } else {
                socket.emit('logged_in', 'Invalid password.');
            }
        } else {
            // New user, hash the password
            const hashedPassword = bcrypt.hashSync(data.password, 10);

            // Create a new user object with hashed password and other data
            const newUser = { ...data, password: hashedPassword };

            // Add the new user to the array
            users.push(newUser);

            socket.emit('logged_in', `Welcome ${data.first_name}!`);
        }

        // Whenever users array changes, emit 'users_update'
        io.emit('users_update', users.map((user) => user.first_name));
    });

    socket.on("log_in", (data) => {
        const userIndex = users.findIndex((user) => user.email === data.email);
    
        if (userIndex !== -1) {
            if (bcrypt.compareSync(data.password, users[userIndex].password)) {
                socket.emit('login_response', 'Success', users[userIndex]);
            } else {
                socket.emit('login_response', 'Invalid password.');
            }
        } else {
            socket.emit('login_response', 'User not found.');
        }
    });
});

server.listen(3001, () => {
    console.log('Server running on port 3001');
});
