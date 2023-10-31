const path = require("path");
const port = 5000;
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve(__dirname, "./public")));

app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});

io.on("connection", (socket) => {
  //   console.log("A New user has connected", socket.id);
  socket.on("user-message", (message) => {
    // console.log("A New user message from the client ", message);
    io.emit("message", message);
  });
});

server.listen(port, () => {
  console.log("Listening on port " + port);
});
