// import the base node js server
import { createServer } from "http";

// Import web socket server constructor
import { WebSocketServer } from "ws";

// Create our HTTP server
let server = createServer();

let port = process.env.PORT ?? 3000;

// Set up websocket server
let wsServer = new WebSocketServer({ server });

wsServer.addListener("connection", (socket, req) => {
  // Received connection
  console.log("Received connection from " + req.socket.remoteAddress);

  socket.addListener("message", (data) => {
    console.log("Received message...");
    console.log(data.toString());
  });
});

// Start the server listening for requests
server.listen(port);
