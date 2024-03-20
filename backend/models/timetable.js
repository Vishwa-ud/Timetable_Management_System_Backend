const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    type: { type: String, enum: ['Lab', 'Lecture'], required: true },
    deliveryMethod: { type: String, enum: ['Online', 'Hybrid', 'Physical'], required: true },
    timeSlot: { type: String, required: true }, // Format: "HH:MM - HH:MM"
    classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom', required: true }
});

const timetableSchema = new mongoose.Schema({
    year: { type: Number, required: true },
    semester: { type: String, required: true },
    Monday: [courseSchema],
    Tuesday: [courseSchema],
    Wednesday: [courseSchema],
    Thursday: [courseSchema],
    Friday: [courseSchema],
    Saturday: [courseSchema],
    Sunday: [courseSchema]
});

const Timetable = mongoose.model('Timetable', timetableSchema);

module.exports = Timetable;