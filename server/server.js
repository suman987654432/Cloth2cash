require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const scheduleRoutes = require('./routes/schedule');


const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/schedule', scheduleRoutes);


app.get('/', (req, res) => {
  res.json({ message: 'Cloth2Cash API is running!' });
});

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// No changes needed here if your scheduleRoutes handles status update and returns updated pickup.
// Make sure your PUT/PATCH endpoint for updating status in routes/schedule.js looks like this:

// Example in routes/schedule.js:
// router.patch('/:id/status', async (req, res) => {
//   const { status } = req.body;
//   const updated = await Schedule.findByIdAndUpdate(req.params.id, { status }, { new: true });
//   res.json(updated);
// });
