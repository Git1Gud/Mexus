// src/components/Chat.js
import React, { useState, useEffect, useRef } from "react";
import { useSocket } from "../../hooks/useSocket";
import "./NewChat.css";
// import { useSocket } from '../hooks/useSocket';
// import { useSocket } from '../hooks/useSocket.js';

const NewChat = () => {
  const [messages, setMessages] = useState([]);
  //   const [newMessage, setNewMessage] = useState('');
  const [message, setMessage] = useState("");
  const userId = JSON.parse(localStorage.getItem("user"))?._id;
  const socket = useSocket(userId); // Using ref to keep track of the WebSocket connection
  // console.log(user.id);

  const sendMessage = () => {
    if (!socket || !message) return;

    const msgData = {
      senderId: userId,
      receiverId: "6706d2c95c2b271c25c58513",
      content: message,
    };

    socket.send(JSON.stringify(msgData)); // Send the message over the WebSocket

    setMessage(""); // Clear the input field after sending
  };

  // Listen for incoming messages
  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      console.log("Received message:", receivedMessage);
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      // Handle incoming message (e.g., display in chat UI)
    };

    return () => {
      socket.onmessage = null; // Clean up event listener when socket changes or component unmounts
    };
  }, [socket?.onmessage]);

  return (
    <section className="msger">
      <header className="msger-header">
        <div className="msger-header-title">
          <i className="fas fa-comment-alt"></i> SimpleChat
        </div>
        {/* <div className="msger-header-options">
      <span><i className="fas fa-cog"></i></span>
    </div> */}
      </header>

      <main className="msger-chat">
        <div className="msg left-msg">
          <div className="msg-patient-img"></div>

          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.senderId === userId
                  ? " msg-bubble my-message"
                  : "msg-bubble_display"
              }>
              <div className="msg-info">
                <div className="msg-info-name">Doc</div>
                <div className="msg-info-time">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
              <div className="msg-text their-message">{msg.content}</div>
            </div>
          ))}

        </div>
        <div className="msg right-msg">
          <div className="msg-doctor-img"></div>

          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.senderId !== userId
                  ? " msg-bubble their-message"
                  : "msg-bubble_display"
              }
            >
              <div className="msg-info">
                <div className="msg-info-name">user</div>
                <div className="msg-info-time">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>

              <div className="msg-text my-message ">{msg.content}</div>
            </div>
          ))}
        </div>
      </main>

      <div className="msger-inputarea " >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="msger-input"
          placeholder="Type your message"
        />
        <button type="submit" className="msger-send-btn"  onClick={sendMessage}>Send</button>
      </div>
    </section>
  );
};

export default NewChat;
