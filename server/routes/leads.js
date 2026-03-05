const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const seedLeadsPath = path.join(__dirname, '../seed_leads.json');

const getMockLeads = () => {
    if (fs.existsSync(seedLeadsPath)) {
        return JSON.parse(fs.readFileSync(seedLeadsPath, 'utf-8'));
    }
    return [];
};

const saveMockLeads = (data) => {
    fs.writeFileSync(seedLeadsPath, JSON.stringify(data, null, 2));
};

const requireAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        if (decoded.role === 'admin') {
            next();
        } else {
            res.status(403).json({ message: 'Forbidden' });
        }
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

router.post('/', async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        const data = getMockLeads();
        const newLead = { _id: Math.random().toString(36).substr(2, 9), ...req.body, createdAt: new Date().toISOString() };
        data.push(newLead);
        saveMockLeads(data);
        return res.status(201).json(newLead);
    }
    try {
        const newLead = new Lead(req.body);
        const savedLead = await newLead.save();
        res.status(201).json(savedLead);
    } catch (err) {
        res.status(500).json({ error: 'Failed to save lead information' });
    }
});

// GET route for admins
router.get('/', requireAdmin, async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        const data = getMockLeads().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return res.json(data);
    }
    try {
        const leads = await Lead.find().sort({ createdAt: -1 });
        res.json(leads);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve leads' });
    }
});

// DELETE route for admins
router.delete('/:id', requireAdmin, async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        let data = getMockLeads();
        data = data.filter(l => l._id !== req.params.id);
        saveMockLeads(data);
        return res.json({ message: 'Lead deleted' });
    }
    try {
        await Lead.findByIdAndDelete(req.params.id);
        res.json({ message: 'Lead deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
