// Import the necessary function from the React library
import { createRoot } from "react-dom/client";

import { useState, useEffect } from "react";

let root = createRoot(document.getElementById("app"));

root.render(<App />);

function App() {
  let [socket, setSocket] = useState(null);

  useEffect(() => {
    let newSocket = new WebSocket("ws://149.31.228.231:3000/");

    setSocket(newSocket);
  }, []);

  let [message, setMessage] = useState("");

  function submit() {
    setMessage("");
    if (socket !== null) {
      socket.send(message);
    }
  }

  return (
    <div className="chat-window">
      <ul id="chat"></ul>
      <div className="chat-ui">
        <input
          value={message}
          onInput={(event) => setMessage(event.target.value)}
        />
        <button onClick={submit}>Send</button>
      </div>
      <footer>{socket == null ? "Not connected" : "Connected"}</footer>
    </div>
  );
}
