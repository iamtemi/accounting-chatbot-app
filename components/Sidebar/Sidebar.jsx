import React from "react";
import "./Sidebar.scss";

export default function Sidebar({ chats, onSelectChat }) {
  return (
    <div className="sidebar">
      <h2 className="sidebar__title">Chat History</h2>
      <ul className="sidebar__list">
        {chats.map((chat, i) => (
          <li
            key={i}
            className="sidebar__list-item"
            onClick={() => onSelectChat(chat.sessionId)}
          >
            {chat.title || chat.sessionId}
          </li>
        ))}
      </ul>
    </div>
  );
}
