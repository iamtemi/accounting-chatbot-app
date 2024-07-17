import "./ChatHistory.scss";

export default function ChatHistory({ messages }) {
  return (
    <div className="chat-history">
      {messages.map((message, index) => (
        <div key={index} className="message-container">
          <div className="message message--question">
            <p className="message__text">
              <strong>Q:</strong> {message.question}
            </p>
          </div>
          <div className="message message--answer">
            <p className="message__text">
              <strong>A:</strong> {message.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
