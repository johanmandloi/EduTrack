const express = require('express');
const router = express.Router();
// const students = require('../data/student');
const studentsdb = require("../data/studentsdb");

// GET all students
router.get("/", (req, res) => {
    // res.json(students);
    studentsdb.query("SELECT * FROM students " ,(err,result) =>{
        if(err) return res.status(500).json({error:err});
        res.json(result);
    } )
});

// GET student by ID
router.get('/:id', (req, res) => {

    studentsdb.query("SELECT * FROM students WHERE id =?" , [req.params.id] , (err,result) =>{
        if (err) return res.status(500).json({error:err});
        if(result.length === 0) return res.status(404).json({message : "Student Not found"})
        res.json(result);
    })

    // const studentId = parseInt(req.params.id);
    // const student = students.find(s => s.id === studentId);

    // if (!student) {
    //     return res.status(404).json({
    //         error: "Student not found",
    //         message: "The student you are looking for doesn't exist"
    //     });
    // }

    // res.json({
    //     message: "Student found",
    //     student: student
    // });
});

// POST new student
router.post("/", (req, res) => {
    const {name , email , age} = req.body;

    const sql = "INSERT into students (name , email , age) VALUES(?,?,?)";
    studentsdb.query(sql,[name , email , age] , (err,result) =>{
        if(err) return res.status(500).json({error:err});
        res.status(201).json({id : result.insertId , name , email , age})
    })

    // const { name, email, age } = req.body;

    // if (!name || !age || !email) {
    //     return res.status(400).json({ message: "Please enter name, email, and age" });
    // }

    // const newStudent = {
    //     id: students.length + 1,
    //     name,
    //     age,
    //     email
    // };

    // students.push(newStudent);
    // res.status(201).json({ message: "Item created successfully", student: newStudent });
});

// DELETE student by ID
router.delete("/:id", (req, res) => {

    studentsdb.query("DELETE FROM students where id =?" , [req,params.id] , (err,result) =>{
        if(err) return res.status(500).json({error:err});

        res.json({message : "Student Deleted"});
    })

    // const studentId = parseInt(req.params.id);
    // const studentIndex = students.findIndex(student => student.id === studentId);

    // if (studentIndex === -1) {
    //     return res.status(404).json({ error: "Student not found" });
    // }

    // const deletedItem = students.splice(studentIndex, 1);

    // res.json({
    //     message: "Item deleted successfully",
    //     deleted: deletedItem[0]
    // });
});

router.put("/:id" , (req,res)=>{
    const {name,email,age} = req.body;
    const sql = "UPDATE students SET name = ?, email = ?, age = ? WHERE id =?";
    studentsdb.query(sql , [name,email,age,req.params.id] , (err,result)=>{
        if(err) return res.status(500).json({error:err});
        res.json({message : "student updated"});
    })
})

module.exports = router;
