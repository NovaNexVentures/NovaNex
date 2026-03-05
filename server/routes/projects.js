const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const seedPath = path.join(__dirname, '../seed_data.json');

// Helper to get mock data
const getMockData = () => {
    if (fs.existsSync(seedPath)) {
        return JSON.parse(fs.readFileSync(seedPath, 'utf-8'));
    }
    return [];
};

// Helper to save mock data
const saveMockData = (data) => {
    fs.writeFileSync(seedPath, JSON.stringify(data, null, 2));
};

// Middleware to protect admin routes
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

// GET all projects (public)
router.get('/', async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        const data = getMockData().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return res.json(data);
    }
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET single project (public)
router.get('/:id', async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        const data = getMockData();
        const project = data.find(p => p._id === req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        return res.json(project);
    }
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST new project (admin only)
router.post('/', requireAdmin, async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        const data = getMockData();
        const newProject = { _id: Math.random().toString(36).substr(2, 9), ...req.body, createdAt: new Date().toISOString() };
        data.push(newProject);
        saveMockData(data);
        return res.status(201).json(newProject);
    }
    const project = new Project(req.body);
    try {
        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update project (admin only)
router.put('/:id', requireAdmin, async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        const data = getMockData();
        const idx = data.findIndex(p => p._id === req.params.id);
        if (idx === -1) return res.status(404).json({ message: 'Project not found' });
        data[idx] = { ...data[idx], ...req.body };
        saveMockData(data);
        return res.json(data[idx]);
    }
    try {
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE project (admin only)
router.delete('/:id', requireAdmin, async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        let data = getMockData();
        data = data.filter(p => p._id !== req.params.id);
        saveMockData(data);
        return res.json({ message: 'Project deleted' });
    }
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: 'Project deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
