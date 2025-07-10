const db = require('../data/studentsdb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { email, password, role, name, age, department } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [userResult] = await db.promise().query(
            'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
            [email, hashedPassword, role]
        );

        const userId = userResult.insertId;

        if (role === 'student') {
            await db.promise().query(
                'INSERT INTO students (name, age, email, user_id) VALUES (?, ?, ?, ?)',
                [name, age, email, userId]
            );
        } else if (role === 'faculty') {
            await db.promise().query(
                'INSERT INTO faculty (name, department, user_id) VALUES (?, ?, ?)',
                [name, department, userId]
            );
        }

        res.status(201).json({ message: 'User registered successfully', userId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) return res.status(404).json({ message: 'User not found' });

        const user = users[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
