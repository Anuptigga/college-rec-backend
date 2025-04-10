const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const collegeRoutes = require('./routes/collegeRoutes');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();
const app = express();
const allowedOrigins = [
  'http://localhost:5173',
  'https://your-vercel-app.vercel.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());

app.use('/api/colleges', collegeRoutes);
app.use('/api/admin', adminRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
}).catch((err) => console.error(err));
