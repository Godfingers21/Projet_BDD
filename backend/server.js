const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const boardgameRoutes = require('./routes/boardgameRoutes');
const rateRoutes = require('./routes/rateRoute');
const authRoutes = require('./routes/authRoute');
const userRoutes = require('./routes/userRoute');
const buyRoutes = require('./routes/buyRoutes');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: ['http://localhost:5173', 'https://kaya-3l9u.onrender.com', 'https://kaya-sandy.vercel.app'],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Backend is currently running! The routes are available at /api/boardgames and /api/rate');
});

app.use('/api/boardgames', boardgameRoutes);
app.use('/api/rate', rateRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/buy', buyRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
});
