const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const db = require('../data/studentsdb');

// Register
router.post('/register', [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars'),
    body('role').isIn(['student', 'faculty', 'admin']).withMessage('Invalid role')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (email, password, role) VALUES (?, ?, ?)";
    db.query(sql, [email, hashedPassword, role], (err, result) => {
        if (err) return res.status(500).json({ error: err });

        const userId = result.insertId;

        if (role === 'faculty') {
            const insertFaculty = "INSERT INTO faculty (name, department, user_id) VALUES (?, ?, ?)";
            db.query(insertFaculty, ['Default Faculty Name', 'Default Department', userId], (err2) => {
                if (err2) return res.status(500).json({ error: err2 });
                res.status(201).json({ message: "Faculty registered and inserted into faculty table" });
            });
        } else if (role === 'student') {
            const insertStudent = "INSERT INTO students (name, age, email, user_id) VALUES (?, ?, ?, ?)";
            db.query(insertStudent, ['Default Student Name', 20, email, userId], (err3) => {
                if (err3) return res.status(500).json({ error: err3 });
                res.status(201).json({ message: "Student registered and inserted into students table" });
            });
        } else {
            res.status(201).json({ message: "Admin registered" });
        }
    });
});

// Login
router.post('/login', [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password is required')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], async (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(400).json({ message: "User not found" });

        const user = results[0];
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
});

module.exports = router;
