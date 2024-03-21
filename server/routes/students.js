var express = require('express');
var router = express.Router();

const Student = require('../models/Student');

//get student list
router.get('/', (req, res, next) => {
    Student.find()
        .populate('cohort')
        .then((foundStudents) => {
            console.log("These are the found students ===>", foundStudents);
            res.json(foundStudents)
        })
        .catch((err) => {
            console.log('This is the error ===>',err)
            res.json(err)
        })
});

//get student by id
router.get("/details/:studentId", (req, res, next) => {
    Student.findById(req.params.studentId)
      .populate('cohort')
      .then((foundStudent) => {
        console.log("These is the found student===>", foundStudent);
        res.json(foundStudent);
      })
      .catch((err) => {
        console.log("Error finding student ===>", err);
        res.status(502).json(err);
      });
  })

//Create
router.post('/', (req, res, next) => {

    const { firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, projects, cohort } = req.body

    Student.create({
        firstName,
        lastName,
        email,
        phone,
        linkedinUrl,
        languages,
        program,
        background,
        image,
        projects,
        cohort
   })
   .then((createdStudent) => {
        console.log("Student added -->", createdStudent);
        res.status(201).json(createdStudent);
   })
   .catch((error) => {
        console.error("Error while creating the student ->", error);
        res.status(500).json({errorMessage: "Failed to create the student", error});
   })

});

//Update
router.post('/update/:studentId', (req, res, next) => {
    Student.findByIdAndUpdate(
        req.params.studentId,
        req.body, 
        {
            new:true,
        }
    )
    .then((updatedStudent) => {
        console.log("This is the updated student ===>", updatedStudent)
        res.json(updatedStudent)
    })
    .catch((err) => {
        console.log("Error updating student ===>", err)
        res.status(502).json(err)
    })
});

// Delete
router.get('/delete/:studentId', (req, res, next) => {
    Student.findByIdAndDelete(req.params.studentId)
        .then((deletedStudent) => {
            console.log("Deleted ===>", deletedStudent)
            res.json(deletedStudent)
        })
        .catch((err) => {
            console.log("Error deleting student ====>", err);
            res.status(502).json(err);
          });
})

module.exports = router;

