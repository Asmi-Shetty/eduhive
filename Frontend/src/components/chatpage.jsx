import React, { useState, useEffect } from "react";
import { useSocket } from "../context/SocketProvider";
import moment from "moment";

const ChatPage = ({ roomId }) => {
    const socket = useSocket();
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        if (!socket) return;

        socket.on("receiveMessage", (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            socket.off("receiveMessage");
        };
    }, [socket]);

    const handleRegister = () => {
        if (!username.trim()) return;
        const generatedUserId = Math.random().toString(36).substring(7);
        setUserId(generatedUserId);

        // Join the room when registering
        socket.emit("joinRoom", { roomId, username });
    };

    const sendMessage = () => {
        if (!message.trim() || !userId) return;

        const chatMessage = {
            roomId, 
            message: message.trim(),
            username, 
        };

        socket.emit("sendMessage", chatMessage);
        setMessage("");
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-xl text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Chat Room: {roomId}</h2>

            {!userId ? (
                <>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 mb-2 border rounded text-black"
                    />
                    <button
                        onClick={handleRegister}
                        className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Join Chat
                    </button>
                </>
            ) : (
                <>
                    <h4 className="text-lg font-semibold mb-2">Welcome, {username}!</h4>
                    <div className="border p-4 h-64 overflow-y-auto bg-white text-black rounded mb-4 shadow-inner">
                        {messages.map((msg, index) => (
                            <div key={index} className="mb-3 text-left">
                                <div className="flex justify-between text-sm font-semibold">
                                    <span className="text-blue-600">{msg.username}</span>
                                    <span className="text-gray-500">{moment().format("h:mm A")}</span>
                                </div>
                                <div className="p-2 rounded mt-1 shadow-md bg-gray-300">{msg.message}</div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={message}
                            placeholder="Type a message..."
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") sendMessage();
                            }}
                            className="flex-grow p-2 border rounded text-black"
                        />
                        <button
                            onClick={sendMessage}
                            className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                            Send
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ChatPage;