require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Project = require('./models/Project');

async function pushToDB() {
    if (!process.env.MONGODB_URI) {
        console.error('ERROR: No MONGODB_URI found in .env. Cannot seed live database.');
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to Live MongoDB for seeding...');

        const seedDataPath = path.join(__dirname, 'seed_data.json');
        if (!fs.existsSync(seedDataPath)) {
            console.error('ERROR: seed_data.json not found! Please ensure it exists before running.');
            process.exit(1);
        }

        const rawData = fs.readFileSync(seedDataPath, 'utf8');
        let projects = JSON.parse(rawData);

        // Sanitize existing _id strings generated improperly by cheerio script to allow proper Mongoose ObjectId generation
        projects = projects.map(p => {
            const { _id, ...rest } = p;
            return rest;
        });

        // Clear existing just in case
        await Project.deleteMany({});
        console.log('Cleared existing projects from DB');

        // Insert new
        await Project.insertMany(projects);
        console.log(`Successfully seeded ${projects.length} projects to the live database!`);

    } catch (err) {
        console.error('Error during seeding:', err);
    } finally {
        await mongoose.disconnect();
        console.log('Database disconnected.');
        process.exit(0);
    }
}

pushToDB();
