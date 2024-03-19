// bookingRoutes.js
const express = require('express');
const router = express.Router();
const Classroom = require('../models/classroom');
const Resource = require('../models/resource');
const Booking = require('../models/booking');

router.post('/book', async (req, res) => {
    try {
        // Extract booking details from request body
        const { classroomID, resources, date, startTime, endTime } = req.body;

        // Check if classroom exists
        const classroom = await Classroom.findById(classroomID);
        if (!classroom) {
            return res.status(404).json({ message: 'Classroom not found' });
        }

        // Calculate total capacity of selected resources
        let totalResourceCapacity = 0;
        for (const resourceId of resources) {
            const resource = await Resource.findById(resourceId);
            if (!resource) {
                return res.status(404).json({ message: 'Resource not found' });
            }
            if (resource.name === 'Seats' || resource.name === 'Desktop') {
                totalResourceCapacity += resource.quantity;
            }
        }

        // Check if total resource capacity exceeds classroom capacity
        if (totalResourceCapacity > classroom.capacity) {
            return res.status(400).json({ message: 'Selected resources exceed classroom capacity' });
        }

        // Check if classroom is already booked for the specified date and time
        const existingBooking = await Booking.findOne({
            classroom: classroomID,
            date,
            $or: [
                { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
                { startTime: { $gte: startTime, $lt: endTime } },
                { endTime: { $gt: startTime, $lte: endTime } }
            ]
        });
        if (existingBooking) {
            return res.status(400).json({ message: 'Classroom already booked' });
        }

        // Check if any of the resources are already booked for the specified date and time
        const bookedResources = await Booking.find({
            resources: { $in: resources },
            date,
            $or: [
                { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
                { startTime: { $gte: startTime, $lt: endTime } },
                { endTime: { $gt: startTime, $lte: endTime } }
            ]
        });
        if (bookedResources.length > 0) {
            return res.status(400).json({ message: 'One or more selected resources are already booked' });
        }

        // Create booking
        const booking = new Booking({
            classroom: classroomID,
            resources,
            date,
            startTime,
            endTime
        });
        await booking.save();

        // Update resource availability
        await Resource.updateMany({ _id: { $in: resources } }, { isAvailable: false });

        res.status(200).json({ message: 'Booking created successfully', booking });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read all bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read booking by ID
router.get('/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update booking by ID
router.put('/:id', async (req, res) => {
    try {
        // Extract updated booking details from request body
        const { classroomID, resources, date, startTime, endTime } = req.body;

        // Check if classroom exists
        const classroom = await Classroom.findById(classroomID);
        if (!classroom) {
            return res.status(404).json({ message: 'Classroom not found' });
        }

        // Calculate total capacity of selected resources
        let totalResourceCapacity = 0;
        for (const resourceId of resources) {
            const resource = await Resource.findById(resourceId);
            if (!resource) {
                return res.status(404).json({ message: 'Resource not found' });
            }
            if (resource.name === 'seats' || resource.name === 'desktop') {
                totalResourceCapacity += resource.quantity;
            }
        }

        // Check if total resource capacity exceeds classroom capacity
        if (totalResourceCapacity > classroom.capacity) {
            return res.status(400).json({ message: 'Selected resources exceed classroom capacity' });
        }

        // Check if classroom is already booked for the specified date and time
        const existingBooking = await Booking.findOne({
            classroom: classroomID,
            date,
            $or: [
                { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
                { startTime: { $gte: startTime, $lt: endTime } },
                { endTime: { $gt: startTime, $lte: endTime } }
            ],
            _id: { $ne: req.params.id } // Exclude the current booking from the check
        });
        if (existingBooking) {
            return res.status(400).json({ message: 'Classroom already booked' });
        }

        // Check if any of the resources are already booked for the specified date and time
        const bookedResources = await Booking.find({
            resources: { $in: resources },
            date,
            $or: [
                { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
                { startTime: { $gte: startTime, $lt: endTime } },
                { endTime: { $gt: startTime, $lte: endTime } }
            ],
            _id: { $ne: req.params.id } // Exclude the current booking from the check
        });
        if (bookedResources.length > 0) {
            return res.status(400).json({ message: 'One or more selected resources are already booked' });
        }

        // Update booking
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete booking by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
        if (!deletedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
