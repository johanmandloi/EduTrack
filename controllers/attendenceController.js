const db = require('../data/studentsdb');

exports.markAttendence = (req, res) => {
    const { student_id, course_id, status } = req.body;
    const sql = "INSERT INTO attendance (student_id, course_id, status) VALUES (?, ?, ?)";
    db.query(sql, [student_id, course_id, status], (err, result) => {
        if (err) return res.status(500).json({ error: err });

        // Emit event
        const io = req.app.get('io');
        io.emit('attendanceMarked', { student_id, course_id, status });

        res.status(201).json({ message: "Attendance marked and broadcasted" });
    });
};

exports.getStudentAttendence = (req, res) => {
    const studentId = req.params.id;
    const sql = "SELECT * FROM attendance WHERE student_id = ?";
    db.query(sql, [studentId], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
};
