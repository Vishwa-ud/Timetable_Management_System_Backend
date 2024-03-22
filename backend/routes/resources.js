const express = require('express');
const router = express.Router();
const Resource = require('../models/resource');

// Create a new resource
router.post('/', async (req, res) => {
    try {
        const resource = new Resource(req.body);
        await resource.save();
        res.status(201).json(resource);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all resources
router.get('/', async (req, res) => {
    try {
        const resources = await Resource.find();
        res.status(200).json(resources);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single resource by ID
router.get('/:id', async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }
        res.status(200).json(resource);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a resource by ID
router.patch('/:id', async (req, res) => {
    try {
        const updatedResource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedResource) {
            return res.status(404).json({ message: 'Resource not found' });
        }
        res.status(200).json(updatedResource);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a resource by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedResource = await Resource.findByIdAndDelete(req.params.id);
        if (!deletedResource) {
            return res.status(404).json({ message: 'Resource not found' });
        }
        res.status(200).json({ message: 'Resource deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
