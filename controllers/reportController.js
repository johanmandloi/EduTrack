const db = require('../data/studentsdb');
const { Parser } = require('json2csv');

// Export student report (already implemented)
exports.exportStudentReport = (req, res) => {
    const studentId = req.params.id;
    const format = req.query.format;

    const sql = "SELECT * FROM grades WHERE student_id = ?";
    db.query(sql, [studentId], (err, result) => {
        if (err) return res.status(500).json({ error: err });

        if (format === 'csv') {
            const parser = new Parser();
            const csv = parser.parse(result);
            res.header('Content-Type', 'text/csv');
            res.attachment(`student_${studentId}_report.csv`);
            return res.send(csv);
        } else {
            res.json(result);
        }
    });
};

// Get individual student performance
exports.getStudentPerformance = (req, res) => {
    const studentId = req.params.id;
    const sql = "SELECT * FROM grades WHERE student_id = ?";
    db.query(sql, [studentId], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
};

// Get course-wise stats
exports.getCourseStats = (req, res) => {
    const courseId = req.params.id;
    const sql = "SELECT grade, COUNT(*) as count FROM grades WHERE course_id = ? GROUP BY grade";
    db.query(sql, [courseId], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
};

// Get student attendance summary
exports.getAttendanceSummary = (req, res) => {
    const studentId = req.params.studentId;
    const sql = "SELECT status, COUNT(*) as count FROM attendance WHERE student_id = ? GROUP BY status";
    db.query(sql, [studentId], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
};
