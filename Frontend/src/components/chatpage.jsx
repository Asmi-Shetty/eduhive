import React, { useState } from "react";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello everyone!", sender: "other" },
    { id: 2, text: "Hey! How's it going?", sender: "me" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { id: messages.length + 1, text: newMessage, sender: "me" }]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex justify-start items-center h-screen overflow-hidden">
      <div className="w-full max-w-md h-screen flex flex-col bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gray-700 p-4 text-lg font-semibold text-center text-white">
          Study Group Chat
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-3 rounded-lg max-w-[75%] ${
                msg.sender === "me"
                  ? "bg-blue-600 ml-auto text-white"
                  : "bg-gray-700 text-white"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="p-4 bg-gray-700 flex items-center">
          <input
            type="text"
            className="flex-1 p-2 rounded-lg bg-gray-600 text-white outline-none"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-lg"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
