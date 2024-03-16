const mongoose = require('mongoose');

const classSessionSchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    time: { type: String, required: true }, // Example: "Monday 9:00 AM - 11:00 AM"
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
    location: { type: String, required: true }
});

const timetableSchema = new mongoose.Schema({
    weekNumber: { type: Number, required: true },
    classSessions: [classSessionSchema]
});

const Timetable = mongoose.model('Timetable', timetableSchema);

module.exports = Timetable;
