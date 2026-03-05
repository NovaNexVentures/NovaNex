const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Admin Login Route
router.post('/login', (req, res) => {
    const { password } = req.body;

    // For simplicity and ease of use, we are using a hardcoded password from env.
    // In a real large-scale app, you would hash it or store an admin user in DB.
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin';

    if (password === adminPassword) {
        const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
        res.json({ success: true, token });
    } else {
        res.status(401).json({ success: false, message: 'Invalid password' });
    }
});

module.exports = router;
