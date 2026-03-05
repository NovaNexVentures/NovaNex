const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
require('dotenv').config();

const Project = require('./models/Project'); // assuming model is here

const projectsDir = path.join(__dirname, '../projects');

async function seed() {
    if (process.env.MONGODB_URI) {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
    } else {
        console.log('No MONGODB_URI. Assuming local dev environment without strict DB connection check, but seeding requires DB.');
        // In our index.js, we start without DB if not provided, but to seed, we need it. 
        // We'll mock a request to our own API instead since it's running in memory/local!
        console.log('Will push via API to localhost:5000');
    }

    const files = fs.readdirSync(projectsDir).filter(f => f.endsWith('.html'));
    const allProjects = [];

    for (const file of files) {
        const html = fs.readFileSync(path.join(projectsDir, file), 'utf-8');
        const $ = cheerio.load(html);

        // Title
        let title = $('title').text().replace(/— Case Study$/i, '').replace(/- Case Study$/i, '').trim();
        if (!title) {
            title = $('h1').first().text().trim() || file.replace('.html', '');
        }

        // Subtitle & Description via heuristic
        let subtitle = '';
        let description = '';

        const paragraphs = [];
        $('p').each((i, el) => {
            const text = $(el).text().trim().replace(/\s+/g, ' ');
            if (text.length > 10) paragraphs.push(text);
        });

        if (paragraphs.length > 0) {
            subtitle = paragraphs[0];
            if (paragraphs.length > 1) {
                description = paragraphs.slice(1, 4).join('\n\n'); // grab up to 3 paragraphs 
            } else {
                description = subtitle;
            }
        } else {
            subtitle = title + ' Showcase';
            description = 'An overview of the ' + title + ' project.';
        }

        // Tags via heuristic
        const commonTags = ['React', 'Node.js', 'Python', 'Firebase', 'MongoDB', 'Flutter', 'Dart', 'AWS', 'TensorFlow', 'Vue', 'Angular', 'Next.js', 'Express', 'SQL', 'PostgreSQL', 'Java', 'C++', 'C#', '.NET', 'Docker', 'Kubernetes', 'Cybersecurity', 'Machine Learning', 'AI'];
        let tags = [];

        // Check elements that might be tags
        $('span, div, li').each((i, el) => {
            const text = $(el).text().trim();
            if (text.length > 1 && text.length < 25) {
                if (commonTags.some(t => t.toLowerCase() === text.toLowerCase())) {
                    tags.push(text);
                }
            }
        });

        // Also parse classes that might contain tags
        $('.tag, .tech-item, .feat-tag').each((i, el) => {
            const text = $(el).text().trim().replace(/▶/g, '').trim();
            if (text && text.length < 30) tags.push(text);
        });

        // Deduplicate
        tags = [...new Set(tags)];

        if (tags.length === 0) tags = ['Web Development', 'UI/UX'];

        // Images
        const images = [];
        $('img').each((i, el) => {
            const src = $(el).attr('src');
            if (src) images.push(src);
        });

        const projectData = {
            _id: Math.random().toString(36).substring(2, 10), // fake ObjectId
            title,
            subtitle: subtitle.substring(0, 150),
            description,
            tags,
            images,
            createdAt: new Date().toISOString()
        };

        console.log(`Parsed ${title}...`);
        allProjects.push(projectData);
    }

    fs.writeFileSync(path.join(__dirname, 'seed_data.json'), JSON.stringify(allProjects, null, 2));
}

seed().then(() => {
    console.log('Seeding complete. Saved to seed_data.json.');
    process.exit(0);
});
