require('dotenv').config();
const express = require('express');
const connectDb = require('./config/db');
const authRoutes = require('./routes/authRoutes');

connectDb();

const app = express();
app.use(express.json());

// 💡 This line is REQUIRED to parse JSON

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello World! 🥰');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
