import { WebSocketServer } from "ws";
import mongoose from "mongoose";
import Message from "../models/messages.model.js";
import User from "../models/user.model.js";
// import 
// Map to store WebSocket connections per user
const activeConnections = new Map();

// Create WebSocket Server
export const createWebSocketServer = (port) => {
    const wss = new WebSocketServer({ port });

    // Function to authenticate WebSocket users (e.g., using tokens or session)
    const authenticateUser = (req) => {
        console.log(req);
        
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        return verifyTokenAndGetUserId(token);  // Function to verify and return user ID
    };

    // Handle WebSocket connections
    wss.on("connection", async (ws, req) => {
        console.log("New WebSocket connection");

        const userId = authenticateUser(req);
    //    console.log(userId);
       
        if (!userId) {
            ws.close();
            return;
        }

        // Add the user WebSocket to the active connections
        activeConnections.set(userId, ws);
        
        // Event listener for receiving messages
        ws.on("message", async (data) => {
            const message = JSON.parse(data);
            const { receiverId, content } = message;

            if (!receiverId || !content) {
                ws.send(JSON.stringify({ error: "Invalid message format" }));
                return;
            }

            // Find the sender and receiver in the database
            const sender = await User.findById(userId);
            const receiver = await User.findById(receiverId);

            if (!receiver) {
                ws.send(JSON.stringify({ error: "Receiver not found" }));
                return;
            }

            // Save the message to MongoDB
            const newMessage = new Message({
                sender: sender._id,
                receiver: receiver._id,
                content,
            });
            await newMessage.save();

            // Send the message to the receiver if they are online
            const receiverSocket = activeConnections.get(receiverId);
            if (receiverSocket) {
                receiverSocket.send(JSON.stringify({
                    senderId: sender._id,
                    content,
                    timestamp: new Date(),
                }));
            } else {
                // Optionally, handle cases where the receiver is offline
                ws.send(JSON.stringify({ info: "Message sent but receiver is offline" }));
            }
        });

        // Handle user disconnection
        ws.on("close", () => {
            activeConnections.delete(userId);  // Remove user from active connections
        });
    });

    // Function to verify and return user ID from token
    function verifyTokenAndGetUserId(token) {
        try {
            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            return decodedToken.userId;
        } catch (error) {
            return null;
        }
    }

    console.log(`WebSocket server is running on ws://localhost:${port}`);
};

// Export the createWebSocketServer function
export default createWebSocketServer;
