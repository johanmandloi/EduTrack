const db = require('../data/studentsdb');

exports.addGrade = (req, res) => {
    const { student_id, course_id, grade } = req.body;
    const sql = "INSERT INTO grades (student_id, course_id, grade) VALUES (?, ?, ?)";
    db.query(sql, [student_id, course_id, grade], (err, result) => {
        if (err) return res.status(500).json({ error: err });

        // Emit event to Socket.io
        const io = req.app.get('io');
        io.emit('gradeAdded', { student_id, course_id, grade });

        res.status(201).json({ message: "Grade added and broadcasted" });
    });
};

exports.getStudentGrades = (req, res) => {
    const studentId = req.params.id;
    const sql = "SELECT * FROM grades WHERE student_id = ?";
    db.query(sql, [studentId], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
};
