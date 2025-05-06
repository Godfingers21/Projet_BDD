const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const boardgameRoutes = require('./routes/boardgameRoutes');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true,
  exposedHeaders: ['set-cookie'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/boardgames', boardgameRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
});
