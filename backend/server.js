const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const boardgameRoutes = require('./routes/boardgameRoutes');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: false,
}));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Backend is currently running! The routes are available at /api/boardgames and /api/rate');
});

app.use('/api/boardgames', boardgameRoutes);
app.use('/api/rate', require('./routes/rateRoute'));

const PORT = process.env.PORT || 3001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
});
