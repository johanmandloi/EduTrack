const express = require('express');
const { body, validationResult } = require('express-validator');
const { verifyToken, requireRole } = require('../middleware/auth');
const courseController = require('../controllers/courseController');

const router = express.Router();

router.post('/',
    verifyToken,
    requireRole('faculty'),
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('description').notEmpty().withMessage('Description is required'),
        body('faculty_id').isInt().withMessage('faculty_id must be integer')
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        courseController.createCourse(req, res);
    }
);

router.get('/', verifyToken, courseController.getAllCourses);

module.exports = router;
