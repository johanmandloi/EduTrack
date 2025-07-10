const db = require('../data/studentsdb');

exports.createFaculty = (req, res) => {
    const { name, department, user_id } = req.body;
    const sql = "INSERT INTO faculty (name, department, user_id) VALUES (?, ?, ?)";
    db.query(sql, [name, department, user_id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ id: result.insertId, name, department, user_id });
    });
};

exports.getAllFaculty = (req, res) => {
    db.query("SELECT * FROM faculty", (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
};
