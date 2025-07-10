const db = require('../data/studentsdb');

exports.createCourse = (req, res) => {
    const { title, description, faculty_id } = req.body;
    const sql = "INSERT INTO courses (title, description, faculty_id) VALUES (?, ?, ?)";
    db.query(sql, [title, description, faculty_id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ id: result.insertId, title, description, faculty_id });
    });
};

exports.getAllCourses = (req, res) => {
    const sql = "SELECT * FROM courses";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
};
