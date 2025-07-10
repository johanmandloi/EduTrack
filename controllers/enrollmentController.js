const db = require('../data/studentsdb');

exports.enrollStudent = (req, res) => {
    const { student_id, course_id } = req.body;

    const sql = "INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)";
    db.query(sql, [student_id, course_id], (err, result) => {
        if (err) return res.status(500).json({ error: err });

        // Emit event
        const io = req.app.get('io');
        io.emit('studentEnrolled', { student_id, course_id });

        res.status(201).json({ message: "Student enrolled and broadcasted" });
    });
};
