// routes/enrollments.js
const express = require('express');
const router = express.Router();
const Enrollment = require('../models/enrollment');
const Timetable = require('../models/timetable');
const { authenticateUser, authorizeRole } = require('../middleware/auth');

// Route to enroll in a course
router.post('/', authenticateUser, async (req, res) => {
    try {
        const enrollment = new Enrollment({
            student: req.user._id, // Student ID from authenticated user
            course: req.body.courseId, // Course ID from request body
        });
        await enrollment.save();
        res.status(201).json({ message: 'Enrollment successful', enrollment });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to get timetable for enrolled students
router.get('/timetable', authenticateUser, async (req, res) => {
    try {
        // Find enrollments for the authenticated user
        const enrollments = await Enrollment.find({ student: req.user._id });

        // Extract course IDs from enrollments
        const courseIds = enrollments.map(enrollment => enrollment.course);

        // Find timetables for the enrolled courses
        const timetables = await Timetable.find({ course: { $in: courseIds } });

        res.status(200).json(timetables);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Route to view all student enrollments (for admins and faculty)
router.get('/', authenticateUser, authorizeRole(['Admin', 'Faculty']), async (req, res) => {
    try {
        const enrollments = await Enrollment.find().populate('student').populate('course');
        res.status(200).json(enrollments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to remove a student enrollment (for admins and faculty)
router.delete('/:id', authenticateUser, authorizeRole(['Admin', 'Faculty']), async (req, res) => {
    try {
        await Enrollment.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Enrollment removed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
