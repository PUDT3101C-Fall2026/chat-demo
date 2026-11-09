// Import the necessary function from the React library
import { createRoot } from "react-dom/client";

let root = createRoot(document.getElementById("app"));

root.render(<App />);

function App() {
  return (
    <div class="chat-window">
      <ul id="chat"></ul>
      <div class="chat-ui">
        <input id="chat_input" />
        <button id="chat_send">Send</button>
      </div>
    </div>
  );
}
