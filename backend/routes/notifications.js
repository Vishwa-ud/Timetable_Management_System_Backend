// routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');
const { authenticateUser, authorizeRole } = require('../middleware/auth');

// Route to create a notification (accessible only by Admin and Faculty)
router.post('/', authenticateUser, authorizeRole(['Admin', 'Faculty']), async (req, res) => {
    try {
        const { title, message, type, recipients } = req.body;
        
        // Create notifications for each recipient
        const notifications = [];
        for (const recipient of recipients) {
            const notification = new Notification({
                title,
                message,
                type,
                recipient
            });
            notifications.push(await notification.save());
        }

        res.status(201).json({ message: "Notification Created Successfully", notifications });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to get notifications for a specific user
router.get('/:userId', async (req, res) => {
    try {
        const notifications = await Notification.find({ recipient: req.params.userId }).sort({ timestamp: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to update a notification by ID (accessible only by Admin and Faculty)
router.put('/:id', authenticateUser, authorizeRole(['Admin', 'Faculty']), async (req, res) => {
    try {
        const { title, message, type, recipients } = req.body;
        const notification = await Notification.findByIdAndUpdate(req.params.id, {
            title,
            message,
            type,
            recipients
        }, { new: true });
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.status(200).json({ message: "Notification Updated Successfully", notification });
    } catch (error) {
        console.error('Error updating notification:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to delete a notification by ID (accessible only by Admin and Faculty)
router.delete('/:id', authenticateUser, authorizeRole(['Admin', 'Faculty']), async (req, res) => {
    try {
        const notification = await Notification.findByIdAndDelete(req.params.id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        console.error('Error deleting notification:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
