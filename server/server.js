const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
const meetingRoutes = require("./routes/meetingRoutes");
const rewardRoutes = require("./routes/rewardRoutes");
const aiRoutes = require("./routes/aiRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const taskRoutes = require("./routes/taskRoutes");
// const groupRoutes = require("./routes/groupRoutes");
// const studySessionRoutes = require("./routes/study-sessionRoutes"); 

dotenv.config();
connectDB();
 
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // Allow cookies if using authentication
}));

app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/meeting", meetingRoutes);
app.use("/api/rewards", rewardRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/task", taskRoutes);
// app.use("/api/group", groupRoutes);
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // Allow cookies if using authentication
  })
);


const rooms = {}; // Store users in each video chat room

// WebRTC Signaling with Socket.io
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("joinRoom", ({ roomId, username }) => {
    socket.join(roomId);
    console.log(`${username} joined room: ${roomId}`);

    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }
    rooms[roomId].push({ id: socket.id, username });

    io.to(roomId).emit("userJoined", { id: socket.id, username });
    io.to(roomId).emit("updateUserList", rooms[roomId]);
  });

  // WebRTC signaling: offer, answer, ICE candidates
  socket.on("signal", (data) => {
    io.to(data.to).emit("signal", { from: socket.id, ...data });
  });

  // 🔥 New: Real-time Chat Functionality 🔥
  socket.on("sendMessage", ({ roomId, message, username }) => {
    console.log(`Message from ${username}: ${message}`);

    // Send the message to everyone in the room except the sender
    socket.to(roomId).emit("receiveMessage", { username, message });
  });

  // User disconnects
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);

    for (const roomId in rooms) {
      rooms[roomId] = rooms[roomId].filter((user) => user.id !== socket.id);
      io.to(roomId).emit("updateUserList", rooms[roomId]);
    }
  });
});

const PORT = process.env.PORT || 6471;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
