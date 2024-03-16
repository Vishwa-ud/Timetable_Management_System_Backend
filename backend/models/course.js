const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    description: { type: String },
    credits: { type: Number },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' } // Reference to Faculty model
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;