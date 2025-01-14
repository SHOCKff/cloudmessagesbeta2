// importing lib and files
const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const router = require("./router/path_router");
const mongoConnect = require("./model/db_connection.js");
const cookieParser = require("cookie-parser");




// constants or env 
const port = 9000;

// listening
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware to parse incoming JSON and URL-encoded data
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(cookieParser()); //parse cookie


// Serve static files from the src and public directories
app.use(express.static(path.resolve("./src")));
app.use(express.static(path.resolve("./public")));

 

//routing
app.use("/", router);



app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});



//connect mongo 
mongoConnect;


// Start the server
server.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
