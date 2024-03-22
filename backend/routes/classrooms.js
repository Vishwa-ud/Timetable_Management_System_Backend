const express = require('express');
const router = express.Router();
const Classroom = require('../models/classroom');

// Create a new classroom
router.post('/', async (req, res) => {
    try {
        const classroom = new Classroom(req.body);
        await classroom.save();
        res.status(201).json(classroom);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all classrooms
router.get('/', async (req, res) => {
    try {
        const classrooms = await Classroom.find();
        res.status(200).json(classrooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single classroom by ID
router.get('/:id', async (req, res) => {
    try {
        const classroom = await Classroom.findById(req.params.id);
        if (!classroom) {
            return res.status(404).json({ message: 'Classroom not found' });
        }
        res.status(200).json(classroom);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a classroom by ID
router.patch('/:id', async (req, res) => {
    try {
        const updatedClassroom = await Classroom.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedClassroom) {
            return res.status(404).json({ message: 'Classroom not found' });
        }
        res.status(200).json(updatedClassroom);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a classroom by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedClassroom = await Classroom.findByIdAndDelete(req.params.id);
        if (!deletedClassroom) {
            return res.status(404).json({ message: 'Classroom not found' });
        }
        res.status(200).json({ message: 'Classroom deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
