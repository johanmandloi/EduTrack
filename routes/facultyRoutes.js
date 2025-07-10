const express = require('express');
const { body, validationResult } = require('express-validator');
const { verifyToken, requireRole } = require('../middleware/auth');
const facultyController = require('../controllers/facultyController');

const router = express.Router();

router.post('/',
    verifyToken,
    requireRole('admin'),
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('department').notEmpty().withMessage('Department is required'),
        body('user_id').isInt().withMessage('user_id must be integer')
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        facultyController.createFaculty(req, res);
    }
);

router.get('/',
    verifyToken,
    requireRole('admin'),
    facultyController.getAllFaculty
);

module.exports = router;
