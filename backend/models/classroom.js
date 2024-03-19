const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
    classID: { type: String, required: true },
    type: { type: String, enum: ['Lab', 'LectureHall'], required: true },
    capacity: { type: Number, required: true }
});

const Classroom = mongoose.model('Classroom', classroomSchema);

module.exports = Classroom;
