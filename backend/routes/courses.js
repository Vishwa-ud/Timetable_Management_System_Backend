const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const User = require('../models/user');

// Create a new course
router.post('/', async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(201).send({message: "Course created successfully!"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific course by ID
router.get('/:id', getCourse, (req, res) => {
    res.json(res.course);
});

// Update a course by ID
router.patch('/:id', getCourse, async (req, res) => {
    if (req.body.name != null) {
        res.course.name = req.body.name;
    }
    if (req.body.code != null) {
        res.course.code = req.body.code;
    }
    if (req.body.description != null) {
        res.course.description = req.body.description;
    }
    if (req.body.credits != null) {
        res.course.credits = req.body.credits;
    }
    try {
        const updatedCourse = await res.course.save();
        res.json(updatedCourse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a course by ID
router.delete('/:id', getCourse, async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.json({ message: 'Course deleted successfull!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Assign Faculty to a course
router.post('/:id/assign-faculty', getCourse, async (req, res) => {
    try {
        // Check if the user making the request is an admin
        if (req.user.role !== 'Admin') {
            return res.status(403).json({ message: 'Only Admins can assign Faculty to courses' });
        }

        // Validate the faculty option against predefined list
        const predefinedFaculties = ['Computing', 'Business', 'Engineering'];
        if (!predefinedFaculties.includes(req.body.faculty)) {
            return res.status(400).json({ message: 'Invalid faculty option. Please select from predefined faculties.' });
        }

        // Assign the faculty to the course
        res.course.faculty = req.body.faculty;
        await res.course.save();

        res.json({ message: 'Faculty assigned to course successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Middleware function to get a specific course by ID
async function getCourse(req, res, next) {
    let course;
    try {
        course = await Course.findById(req.params.id);
        if (course == null) {
            return res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.course = course;
    next();
}

module.exports = router;
