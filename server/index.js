import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import bookRoutes from "./routes/books.js"
import mongoose from "mongoose";
import path from 'path';
import { fileURLToPath } from 'url'; 
const socketIo = require('socket.io'); // Import the socket module (Hazem Ayman)
const http = require('http'); // Import the http module (Hazem Ayman)

dotenv.config();

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);    
const __dirname = path.dirname(__filename); 

const app = express();

// Middleware
app.use(express.json()); 
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Initialize Socket.IO (Hazem Ayman)
const server = http.createServer(app); // Create an HTTP server
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000", // Replace with your client's origin
        methods: ["GET", "POST"]
    }
}); 
 
// Routes 
app.use("/auth", authRoutes); // http://localhost:8080/auth/ 
app.use("/book", bookRoutes); // http://localhost:8080/book/ 
app.use(cors()); // Enable CORS for all routes (Hazem Ayman)

// // Connect to MongoDB (Hazem Ayman)
// const PORT = process.env.PORT;
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() =>
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
//   )
//   .catch((err) => console.log(err));        

//   // MongoDB connection (example) (Hazem Ayman)
// mongoose.connect('your_mongodb_connection_string', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log('Connected to MongoDB'))
// .catch(err => console.error('MongoDB connection error:', err));

// Socket.IO logic (Hazem Ayman)
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('newBookRequest', (data) => {
      console.log('New book request received:', data);
      // In a real application, you would:
      // 1. Save the book request to the database.
      // 2. Emit a notification to the admin(s).
      io.emit('bookRequestNotification', { message: `New book request: ${data.bookTitle} by ${data.user}` }); // Send to all connected clients (for simplicity)
  });

  socket.on('disconnect', () => {
      console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => { // Use server.listen instead of app.listen
  console.log(`Server running on port ${PORT}`);
});