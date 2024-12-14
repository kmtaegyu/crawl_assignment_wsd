const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: String, default: 'Not specified' },
    experience: { type: String, default: 'Not specified' },
    education: { type: String, default: 'Not specified' },
    employmentType: { type: String, default: 'Full-Time' },
    deadline: { type: String, default: 'No deadline' },
    sector: { type: String },
    link: { type: String, required: true }
});

module.exports = mongoose.model('Job', jobSchema);
