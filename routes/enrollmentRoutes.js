const express = require('express');
const { body, validationResult } = require('express-validator');
const { verifyToken, requireRole } = require('../middleware/auth');
const enrollmentController = require('../controllers/enrollmentController');

const router = express.Router();

router.post('/',
    verifyToken,
    requireRole('faculty'),
    [
        body('student_id').isInt().withMessage('student_id must be integer'),
        body('course_id').isInt().withMessage('course_id must be integer')
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        enrollmentController.enrollStudent(req, res);
    }
);

router.get('/student/:id',
    verifyToken,
    requireRole('student'),
    (req, res) => {
        enrollmentController.getStudentEnrollments(req, res);
    }
);

module.exports = router;
