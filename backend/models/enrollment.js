const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model for students
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, // Reference to Course model
    timetable: { type: mongoose.Schema.Types.ObjectId, ref: 'Timetable' } // Reference to Timetable model
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = Enrollment;
