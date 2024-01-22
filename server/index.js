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
    socket.on("log_in", (data) => {
        console.log('Received login data:', data);
        const { name, password, role } = data;

        // Check if user with this username exists
        const user = users.find((user) => user.name === name);

        if (user) {
            // Check if the provided password matches the stored hashed password
            if (bcrypt.compareSync(password, user.password)) {
                socket.emit('logged_in', `Welcome back ${name}!`);
            } else {
                socket.emit('logged_in', 'Invalid password.');
            }
        } else {
            // Hash the password and store the user object
            const hashedPassword = bcrypt.hashSync(password, 10);
            users.push({ name, password: hashedPassword, role });

            socket.emit('logged_in', `Welcome ${name}!`);
        }

        // Whenever users array changes, emit 'users_update'
        io.emit('users_update', users.map((user) => user.name));
    });

    socket.on("log_out", (data) => {
        // Log out logic
    });

    socket.on("disconnect", () => {
        // Disconnect logic
    });
});

server.listen(3001, () => {
    console.log('Server running on port 3001');
});
