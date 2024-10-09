// src/components/Chat.js
import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../hooks/useSocket';

const Chat = () => {
  const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
  const [message, setMessage] = useState(""); 
  const userId=JSON.parse(localStorage.getItem('user'))?._id
  const socket = useSocket(userId)  // Using ref to keep track of the WebSocket connection
    // console.log(user.id);


    
  

   
    const sendMessage = () => {
        if (!socket || !message) return;
    
        const msgData = {
          senderId: userId,
          receiverId:"6706d2c95c2b271c25c58513",
          content: message,
        };
    
        socket.send(JSON.stringify(msgData));  // Send the message over the WebSocket
    
        setMessage("");  // Clear the input field after sending
      };
    
      // Listen for incoming messages
      useEffect(() => {
        if (!socket) return;
    
        socket.onmessage = (event) => {
          const receivedMessage = JSON.parse(event.data);
          console.log("Received message:", receivedMessage);
          // Handle incoming message (e.g., display in chat UI)
        };
    
        return () => {
          socket.onmessage = null;  // Clean up event listener when socket changes or component unmounts
        };
      }, [socket?.onmessage]);
    

  return (
    <div className="chat-container">
      <h3>Chat with Doctor/Patient</h3>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={msg.senderId === userId ? 'my-message' : 'their-message'}>
            <p>{msg.content}</p>
            <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
