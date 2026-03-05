require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const leadRoutes = require('./routes/leads');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/leads', leadRoutes);

app.get('/', (req, res) => {
    res.send('NovaNex Backend is running');
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB if MONGODB_URI is provided, otherwise mock to prevent crash
if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log('Connected to MongoDB');
            app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB:', err);
            app.listen(PORT, () => console.log(`Server running (without DB) on port ${PORT}`));
        });
} else {
    console.log('No MONGODB_URI provided in .env. Server running without DB connection. Using local mock data.');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
