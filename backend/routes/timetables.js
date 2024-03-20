const express = require('express');
const router = express.Router();
const Timetable = require('../models/timetable');
const Enrollment = require('../models/enrollment');
const Notification = require('../models/notification');

// Create a new timetable entry
router.post('/', async (req, res) => {
    try {
        const timetableEntry = new Timetable(req.body);
        await timetableEntry.save();
        res.status(201).json({ message: 'Timetable entry created successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Read all timetable entries
router.get('/', async (req, res) => {
    try {
        const timetableEntries = await Timetable.find();
        res.json(timetableEntries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Read a specific timetable entry by ID
router.get('/:id', getTimetableEntry, (req, res) => {
    res.json(res.timetableEntry);
});

// Update timetable entry by ID
router.patch('/:id', async (req, res) => {
    try {
        const timetable = await Timetable.findById(req.params.id);
        if (!timetable) {
            return res.status(404).send({ error: 'Timetable not found' });
        }

        // Update the timetable entry
        const updatedTimetable = await Timetable.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        // Find updated courses for each day
        const updatedCoursesByDay = {};

        ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].forEach(day => {
            updatedCoursesByDay[day] = updatedTimetable[day].filter(course => {
                const originalCourse = timetable[day].find(c => c.course.toString() === course.course.toString());
                return !originalCourse || originalCourse.type !== course.type;
            });
        });

        // Find enrolled students for the updated courses for each day and send notifications
        const notificationPromises = [];

        for (const day in updatedCoursesByDay) {
            const courses = updatedCoursesByDay[day];
            for (const course of courses) {
                const enrolledStudents = await Enrollment.find({ course: course.course }).populate('student');
                for (const enrollment of enrolledStudents) {
                    const notification = new Notification({
                        title: 'Timetable Update',
                        message: `The timetable for one of your enrolled courses has been updated for ${day}. Please check your schedule for any changes.`,
                        type: 'timetable',
                        recipient: enrollment.student._id
                    });
                    notificationPromises.push(notification.save());
                }
            }
        }

        await Promise.all(notificationPromises);

        res.send(updatedTimetable);
    } catch (error) {
        console.error('Error updating timetable:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
});

// Delete a specific timetable entry by ID
router.delete('/:id', getTimetableEntry, async (req, res) => {
    try {
        await res.timetableEntry.remove();
        res.json({ message: 'Timetable entry deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getTimetableEntry(req, res, next) {
    try {
        const timetableEntry = await Timetable.findById(req.params.id);
        if (timetableEntry == null) {
            return res.status(404).json({ message: 'Timetable entry not found' });
        }
        res.timetableEntry = timetableEntry;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = router;