const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    year: { type: Number, required: true },
    semester: { type: String, required: true },
    day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], required: true },
    type: { type: String, enum: ['Lab', 'Lecture'], required: true },
    deliveryMethod: { type: String, enum: ['Online', 'Hybrid', 'Physical'], required: true },
    timeSlot: { type: String, required: true }, // Format: "HH:MM - HH:MM"
    classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom', required: true }
});

const Timetable = mongoose.model('Timetable', timetableSchema);

module.exports = Timetable;

