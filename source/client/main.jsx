// Import the necessary function from the React library
import { createRoot } from "react-dom/client";

import { useState, useEffect } from "react";

let root = createRoot(document.getElementById("app"));

root.render(<App />);

function App() {
  let [state, setState] = useState();
  let [socket, setSocket] = useState(null);

  let [messages, setMessages] = useState([]);

  useEffect(() => {
    let newSocket = new WebSocket("ws://149.31.228.157:3000/");

    setSocket(newSocket);
    setState("connecting");

    newSocket.addEventListener("open", () => {
      setState("connected");
    });

    newSocket.addEventListener("message", (event) => {
      let data = JSON.parse(event.data);

      console.log(data);
      // TODO: Implement messages...

      if (data.type == "message") {
        setMessages((oldMessages) => [...oldMessages, data]);
      }
    });
  }, []);

  let [message, setMessage] = useState("");

  function submit() {
    setMessage("");
    if (state == "connected") {
      socket.send(JSON.stringify({ type: "message", message }));
    }
  }

  if (state == "connecting") {
    return <p>Waiting for connection...</p>;
  }

  return (
    <div className="chat-window">
      <ul id="chat">
        {messages.map((m) => (
          <li>{m.message}</li>
        ))}
      </ul>
      <div className="chat-ui">
        <input
          value={message}
          onInput={(event) => setMessage(event.target.value)}
        />
        <button onClick={submit}>Send</button>
      </div>
    </div>
  );
}
