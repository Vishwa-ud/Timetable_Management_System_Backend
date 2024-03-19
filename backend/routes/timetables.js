const express = require('express');
const router = express.Router();
const Timetable = require('../models/timetable'); // Import Timetable model

// Add Class Session
router.post('/', async (req, res) => {
    try {
        const classSession = new Timetable(req.body);
        await classSession.save();
        res.status(201).json({ message: 'Class session added successfully', classSession });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Read All Class Sessions
router.get('/', async (req, res) => {
    try {
        const classSessions = await Timetable.find();
        res.status(200).json(classSessions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read Class Session by ID
router.get('/:id', getClassSession, (req, res) => {
    res.status(200).json(res.classSession);
});

// Update Class Session
router.patch('/:id', getClassSession, async (req, res) => {
    try {
        if (req.body.course != null) {
            res.classSession.course = req.body.course;
        }
        if (req.body.weekday != null) {
            res.classSession.weekday = req.body.weekday;
        }

        const updatedClassSession = await res.classSession.save();
        res.status(200).json({ message: 'Class session updated successfully', updatedClassSession });
    } catch (error) {
        res.status(400).json({ message: 'Failed to update class session', error: error.message });
    }
});

// Delete Class Session
router.delete('/:id', getClassSession, async (req, res) => {
    try {
        await res.classSession.deleteOne();
        res.status(200).json({ message: 'Class session deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete class session', error: error.message });
    }
});

// Middleware function to get a specific class session by ID
async function getClassSession(req, res, next) {
    try {
        const classSession = await Timetable.findById(req.params.id);
        if (!classSession) {
            return res.status(404).json({ message: 'Class session not found' });
        }
        res.classSession = classSession; // Assign the retrieved class session to res.classSession
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

module.exports = router;
