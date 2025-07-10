const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*'
    }
});

// Middleware
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const gradeRoutes = require('./routes/gradeRoutes');
const attendenceRoutes = require('./routes/attendenceRoutes');
const reportRoutes = require('./routes/reportRoutes');

// Use routes
app.use('/auth', authRoutes);
app.use('/items', studentRoutes);
app.use('/courses', courseRoutes);
app.use('/enrollments', enrollmentRoutes);
app.use('/grades', gradeRoutes);
app.use('/attendence', attendenceRoutes);
app.use('/reports', reportRoutes);

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Socket.io connection
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Attach io to app so controllers can use it
app.set('io', io);

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to Student Management API');
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
});
