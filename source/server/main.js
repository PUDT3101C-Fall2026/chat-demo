// import the base node js server
import { createServer } from "http";

// Import web socket server constructor
import WebSocket, { WebSocketServer } from "ws";

// Create our HTTP server
let server = createServer();

let port = process.env.PORT ?? 3000;

// Set up websocket server
let wsServer = new WebSocketServer({ server });

let userCount = 0;

let users = [];

let history = [];

wsServer.addListener("connection", (socket, req) => {
  // Received connection
  let userId = userCount;
  let name = "anonymous";

  // Update our global id counter
  userCount = userCount + 1;

  socket.send(JSON.stringify({ type: "hello", userId, name }));

  // Create new user object
  let user = { userId, name, connected: true };
  // Add user object to list
  users.push(user);

  sendUsers();

  for (let message of history) {
    socket.send(JSON.stringify(message));
  }

  socket.addListener("message", (rawData) => {
    try {
      let data = JSON.parse(rawData);

      if (data.type == "username") {
        user.name = data.name;
        sendUsers();
      } else if (data.type == "message") {
        let message = {
          type: "message",
          message: data.message,
          userId,
          time: Date.now(),
        };

        history.push(message);

        broadcast(message);
      }
    } catch (error) {
      console.log(error);
      return;
    }
  });
});

// Send list of users
function sendUsers() {
  broadcast({
    type: "users",
    users,
  });
}

// Broadcast message to all of the clients
function broadcast(message) {
  for (let client of wsServer.clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  }
}

// Start the server listening for requests
server.listen(port);
