import { useState } from "react";
import "./ChatUi.scss";

export default function ChatUi({ onSendMessage }) {
  const [message, setMessage] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form className="chat-ui" onSubmit={handleSend}>
      <div className="input-group">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="input-group__input"
          placeholder="Type a message"
        />
        <button type="submit" className="input-group__button">
          Send
        </button>
      </div>
    </form>
  );
}
