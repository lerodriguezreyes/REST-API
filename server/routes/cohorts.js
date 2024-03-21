var express = require('express');
var router = express.Router();

const Cohort = require('../models/Cohort')

// create a new cohort

router.post ('/create', (req, res, next) => {
    const {inProgress, cohortSlug, cohortName, program, format, campus, startDate, endDate, programManager, leadTeacher, totalHours} = req.body;
    Cohort.create({
        inProgress,
        cohortSlug,
        cohortName, 
        program,
        format,
        campus,
        startDate,
        endDate, 
        programManager,
        leadTeacher,
        totalHours
    })
    .then((createdCohort) => {
        console.log("Created a new cohort ====>", createdCohort);
        res.json(createdCohort);
    })
    .catch((err) => {
        console.log("Error creating cohort", err);
        res.json({ errorMessage: "Error creating cohort", err });
    });
})

// retrieve all cohorts
router.get ('/', (req, res, next) => {
    Cohort.find()
    .then((foundCohorts) => {
        console.log("Retrieved all cohorts ====>", foundCohorts);
        res.json(foundCohorts);
      })
      .catch((err) => {
        console.log("Error retrieving cohorts", err);
        res.json({ errorMessage: "Error retrieving cohorts", err });
      });
})

// retrieve specific cohort by id
router.get('/details/:cohortId', (req, res, next) => {
    Cohort.findById(req.params.cohortId)
    .then((foundCohort) => {
        console.log("Retrieved soecified cohort ====>", foundCohort);
        res.json(foundCohort);
      })
      .catch((err) => {
        console.log("Error retrieving specified cohort", err);
        res.json({ errorMessage: "Error retrieving specified cohort", err });
      });
})

// update specific cohort by id
router.post('/update/:cohortId', (req, res, next) => {
    Cohort.findByIdAndUpdate(req.params.cohortId, req.body, {
        new: true,
    })
    .then((updatedCohort) => {
        console.log("Updated the cohort ====>", updatedCohort);
        res.json(updatedCohort);
      })
      .catch((err) => {
        console.log("Error updating specified cohort", err);
        res.json({ errorMessage: "Error updating specified cohort", err });
      });
})

// delete specific cohort by id

router.get("/delete/:cohortId", (req, res, next) => {
    Cohort.findByIdAndDelete(req.params.cohortId)
      .then((deletedCohort) => {
        console.log("Deleted ===>", deletedCohort);
        res.json(deletedCohort);
      })
      .catch((err) => {
        console.log("Error deleting cohort ====>", err);
        res.status(502).json(err);
      });
    })

module.exports = router;
