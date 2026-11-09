// import the base node js server
import { createServer } from "http";

// Import web socket server constructor
import { WebSocketServer } from "ws";

// Create our HTTP server
let server = createServer();

// Set up websocket server
let wsServer = new WebSocketServer({ server });

wsServer.addListener("connection", (socket, req) => {
  // Received connection

  socket.addListener("message", (data) => {
    history.push(data.toString());
  });
});

// Start the server listening for requests
server.listen(3000);
