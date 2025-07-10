const express = require('express');
const { body, validationResult } = require('express-validator');
const { verifyToken, requireRole } = require('../middleware/auth');
const attendenceController = require('../controllers/attendenceController');



const router = express.Router();

router.post('/',
    verifyToken,
    requireRole('faculty'),
    [
        body('student_id').isInt().withMessage('student_id must be integer'),
        body('course_id').isInt().withMessage('course_id must be integer'),
        body('status').isIn(['present', 'absent']).withMessage('status must be present or absent')
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        attendenceController.markAttendence(req, res);
    }
);

router.get('/student/:id',
    verifyToken,
    requireRole('student'),
    (req, res) => {
        attendenceController.getStudentAttendence(req, res);
    }
);

module.exports = router;
