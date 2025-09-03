const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');



// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();


// Middleware
app.use(cors()); // Allow frontend to connect
app.use(express.json()); // Parse incoming JSON


// Test route
app.get('/health', (req, res) => {
  res.json({ ok: true });
});

// Bring in Routes
const userRoutes = require('./routes/userRoutes'); // <-- new
app.use('/api/users', userRoutes); // <-- all user routes start with /api/users

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on : http://localhost/${PORT}`));

const projectRoutes = require('./routes/projectRoutes');
app.use('/api/projects', projectRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);


const profileRoutes = require("./routes/profileRoutes");
app.use("/api/profile", profileRoutes);

