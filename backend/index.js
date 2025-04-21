require('dotenv').config();
const cors =require('cors')
const http = require('http');
const express = require('express');
const connectDb = require('./config/db');
const { setupSocket } = require('./sockets/socket');
const cookieParser=require('cookie-parser');
const authRoutes = require('./routes/authRoutes');

connectDb();

const app = express();
const server = http.createServer(app);
setupSocket(server); 
app.use(express.json());
app.use(cookieParser()); 
// 💡 This line is REQUIRED to parse JSON
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true, // Allow cookies to be sent from the frontend
}));
app.use('/api/auth', authRoutes);


app.get('/', (req, res) => {
  res.send('Hello World! 🥰');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
