const express = require('express');
const router = express.Router();
const { verifyToken, requireRole } = require('../middleware/auth');
const reportController = require('../controllers/reportController');

// Student performance report
router.get('/student/:id', verifyToken, reportController.getStudentPerformance);

// Course-wise stats
router.get('/course/:id', verifyToken, requireRole('faculty'), reportController.getCourseStats);

// Attendance summary (with optional export)
router.get('/attendance/:studentId', verifyToken, reportController.getAttendanceSummary);

router.get('/student/:id/export', verifyToken, reportController.exportStudentReport);

module.exports = router;
