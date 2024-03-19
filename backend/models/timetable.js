const mongoose = require('mongoose');

const classSessionSchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    weekday: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], required: true },
    startTime: { type: String, required: true, validate: /^[0-9]{1,2}:[0-9]{2}\s(AM|PM)$/ },
    endTime: { type: String, required: true, validate: /^[0-9]{1,2}:[0-9]{2}\s(AM|PM)$/ },
    facultyName: { type: String, required: true }, // Store faculty name directly
    location: { type: String, required: true }
});

const timetableSchema = new mongoose.Schema({
    weekNumber: { type: Number, required: true },
    classSessions: [classSessionSchema]
});

const Timetable = mongoose.model('Timetable', timetableSchema);

module.exports = Timetable;
