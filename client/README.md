Client:
    Build using React (typescript)
    Login Register page
        The server handles login and register requests. Registered users are saved in the users array 
        When logging it check if user data exists in users array in backend
    Users Page: 
        Json data is retrieved from authService that gets a .json file from the public folder
        Role-based access - admin can see all the data 
        super-user can see some of the data 

Libraries: 
    socket.io: client to establishes the connection between the backend and frontend in react
    bootstrap & bootstrap-react

How to start:
    npm start