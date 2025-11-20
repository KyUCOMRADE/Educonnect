// src/components/Messages.jsx
import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

export default function Messages({ user }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socketRef = useRef();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // Connect to Socket.io server
    socketRef.current = io("http://localhost:5000", {
      auth: { token },
    });

    // Listen for incoming messages
    socketRef.current.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Fetch previous messages
    fetch("http://localhost:5000/api/messages", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch(console.error);

    return () => socketRef.current.disconnect();
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const msgObj = {
      user: { id: user._id, name: user.name, role: user.role },
      text: input,
      timestamp: new Date(),
    };

    socketRef.current.emit("sendMessage", msgObj);
    setMessages((prev) => [...prev, msgObj]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full border rounded shadow p-4 bg-white">
      <div className="flex-grow overflow-y-auto mb-4 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-md ${
              msg.user.id === user._id
                ? "bg-purple-200 self-end"
                : "bg-gray-200 self-start"
            }`}
          >
            <div className="text-sm font-semibold">{msg.user.name}</div>
            <div className="text-sm">{msg.text}</div>
            <div className="text-xs text-gray-500">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Send
        </button>
      </form>
    </div>
  );
}
