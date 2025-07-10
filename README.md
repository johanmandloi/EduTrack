# Edu-Track - Student Management System

## Overview
Edu-Track is a Node.js-based student management system that supports:
- User management (Students, Faculty, Admin)
- Course management
- Student enrollment
- Grade entry and tracking
- Attendance management
- Reporting & analytics
- Real-time dashboard updates using Socket.io

## Features
### 1️⃣ User Management
- Student registration & profile management
- Faculty account creation with department association
- Admin dashboard for system oversight
- Secure authentication with hashed passwords (bcrypt)

### 2️⃣ Academic Management
- Course creation & faculty assignment
- Student enrollment in courses
- Grade entry and real-time broadcasting of grades
- Attendance marking and tracking

### 3️⃣ Reporting & Analytics
- Student performance reports
- Course-wise analytics
- Attendance reports
- Export functionality (planned extension)

## Technical Stack
- **Backend:** Node.js + Express
- **Database:** MySQL
- **Real-time:** Socket.io
- **Validation:** express-validator
- **Authentication:** JWT

## Setup Instructions
### Prerequisites
- Node.js & npm installed
- MySQL server running locally

### Clone & Install
```bash
git clone https://github.com/akshatmhjj/EduTrack.git
cd Edu-Track
npm install
````

### Database Setup

1. Import the provided database dump file (`Dump20250629.sql`) into MySQL:

   * Use MySQL Workbench or run:

     ```bash
     mysql -u root -p studentsdb < path/to/Dump20250629.sql
     ```

2. Ensure your `.env` file is configured (check `.env.example` if needed).

### Running the App

```bash
node server.js
```

The server will run at `http://localhost:3000`.

### API Documentation

Swagger UI available at:

```
http://localhost:3000/api-docs
```

## Sample Data for Testing

| Entity          | Example Data                                                                      |
| --------------- | --------------------------------------------------------------------------------- |
| Admin User      | Email: `admin@example.com`, Password: `admin123`, Role: `admin`                   |
| Faculty User    | Email: `faculty1@example.com`, Password: `faculty123`, Role: `faculty`            |
| Student User    | Email: `student1@example.com`, Password: `student123`, Role: `student`            |
| Faculty Profile | Name: `Faculty One`, Department: `Science`                                        |
| Course          | Title: `Maths 101`, Description: `Maths Class 8`, Faculty ID: 1 |
| Enrollment      | Student ID: 1, Course ID: 2                     |

## Testing

Use Postman collection (provided separately) to:

* Register users
* Login as student/faculty/admin
* Add courses
* Enroll students
* Mark attendance
* Enter grades
* Fetch reports

## Additional Notes

✅ Code follows consistent style & ES6+ standards.
✅ Error handling & input validation implemented.
✅ Sensitive data protected using hashing & JWT-based security.
✅ Database design normalized (6+ tables with proper constraints).
✅ Setup includes migration-ready dump & clear documentation.

---

**Author:** akshatmhjj
**Repo:** [Edu-Track](https://github.com/akshatmhjj/EduTrack)

