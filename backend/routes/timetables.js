const express = require('express');
const router = express.Router();
const Timetable = require('../models/timetable');

// Create a timetable entry
router.post('/', async (req, res) => {
    try {
        const timetable = new Timetable(req.body);
        await timetable.save();
        res.status(201).send(timetable);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all timetable entries
router.get('/', async (req, res) => {
    try {
        const timetables = await Timetable.find({});
        res.send(timetables);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get timetable entry by ID
router.get('/:id', async (req, res) => {
    try {
        const timetable = await Timetable.findById(req.params.id);
        if (!timetable) {
            return res.status(404).send();
        }
        res.send(timetable);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update timetable entry by ID
router.patch('/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['course', 'year', 'semester', 'day', 'type', 'deliveryMethod', 'timeSlot', 'classroom'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const timetable = await Timetable.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!timetable) {
            return res.status(404).send();
        }
        res.send(timetable);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete timetable entry by ID
router.delete('/:id', async (req, res) => {
    try {
        const timetable = await Timetable.findByIdAndDelete(req.params.id);
        if (!timetable) {
            return res.status(404).send();
        }
        res.send(timetable);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
