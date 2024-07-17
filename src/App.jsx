import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import ChatHistory from "../components/ChatHistory/ChatHistory";
import ChatUi from "../components/ChatUi/ChatUi";
import axios from "axios";
import "./App.scss";

const App = () => {
  const [chats, setChats] = useState({});
  const [sessionTitle, setSessionTitle] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchChatHistories = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/chat-history`);
        setChats(data);
        const titles = Object.keys(data).map((sessionId) => {
          const firstEntry = data[sessionId][0];
          return firstEntry ? firstEntry.question : "No question";
        });
        setSessionTitle(titles);
      } catch (error) {
        console.error("Error fetching chat histories:", error);
      }
    };
    fetchChatHistories();
  }, [API_URL, currentChat]);

  const handleSelectChat = (sessionId) => {
    setCurrentChat(sessionId);
    setMessages(chats[sessionId]);
  };

  const handleStartNewChat = async () => {
    try {
      const { data } = await axios.post(`${API_URL}/api/start`);
      const newSessionId = data.sessionId;
      setChats((prevChats) => ({
        ...prevChats,
        [newSessionId]: [],
      }));
      setCurrentChat(newSessionId);
      setMessages([]);
    } catch (error) {
      console.error("Error starting new chat session:", error);
    }
  };

  const handleSendMessage = async (message) => {
    if (!currentChat) {
      try {
        const { data } = await axios.post(`${API_URL}/api/start`);
        const newSessionId = data.sessionId;
        setChats((prevChats) => ({
          ...prevChats,
          [newSessionId]: [],
        }));
        setCurrentChat(newSessionId);

        const newMessage = { sender: "user", question: message, answer: "" };
        setMessages([newMessage]);
        setChats((prevChats) => ({
          ...prevChats,
          [newSessionId]: [newMessage],
        }));

        const response = await axios.post(`${API_URL}/api/ask`, {
          sessionId: newSessionId,
          question: message,
        });
        setMessages(response.data.history);
        setChats((prevChats) => ({
          ...prevChats,
          [newSessionId]: response.data.history,
        }));
      } catch (error) {
        console.error("Error starting new chat session:", error);
      }
    } else {
      const newMessage = { sender: "user", question: message, answer: "" };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setChats((prevChats) => ({
        ...prevChats,
        [currentChat]: [...prevChats[currentChat], newMessage],
      }));

      try {
        const response = await axios.post(`${API_URL}/api/ask`, {
          sessionId: currentChat,
          question: message,
        });
        setMessages(response.data.history);
        setChats((prevChats) => ({
          ...prevChats,
          [currentChat]: response.data.history,
        }));
      } catch (error) {
        console.error(
          `Error sending message to session ${currentChat}:`,
          error
        );
      }
    }
  };

  const chatSessions = Object.keys(chats).map((sessionId, index) => ({
    sessionId,
    title: sessionTitle[index] || "New chat",
  }));

  return (
    <div className="app">
      <Sidebar chats={chatSessions} onSelectChat={handleSelectChat} />
      <div className="main">
        <button onClick={handleStartNewChat} className="start-chat-button">
          Start New Chat
        </button>
        <ChatHistory messages={messages} />
        <ChatUi onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default App;
