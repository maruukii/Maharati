import React, { useState, useEffect, useRef } from "react";
import "./ChatWindow.css";
import axios from "axios";
const ChatWindow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [Chat, setChat] = useState([]);
  const chatBodyRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  const handleChat = async (e) => {
    e.preventDefault();
    const message = e.target.elements.message.value;
    setChat((prevChat) => [...prevChat, message]);
    e.target.elements.message.value = "";
    const req = {
      input: message,
    };
    const response = await axios.post(
      import.meta.env.VITE_HOST + "/ask-ai",
      req
    );
    setChat((prevChat) => [...prevChat, response.data]);
  };
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [Chat]);
  return (
    <div>
      <div className="smiley-face" onClick={toggleChat}>
        <div className="smile"></div>
      </div>
      <div className={`chat-window-expanded ${isOpen ? "open" : "closed"}`}>
        <div className="chat-header">
          <span className="chat-title">PROFEEL</span>
        </div>
        <div className="chat-body" ref={chatBodyRef}>
          <div className="message bot-message">
            👋 Hi! I am LiveChatAI. Ask me anything about it.
          </div>
          <div className="message bot-message">
            Human support is also available.
          </div>
          {Chat.map((chat, index) => (
            <div key={index} className="message bot-message">
              {chat}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <form onSubmit={handleChat}>
            <input type="text" name="message" placeholder="Send message" />
            <button type="submit">→</button>
          </form>
        </div>
        <button className="close-button" onClick={toggleChat}>
          ×
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
