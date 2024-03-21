var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require('./routes/auth')
var apiRouter = require('./routes/api')
var studentsRouter = require('../server/routes/students')
var cohortsRouter = require('../server/routes/cohorts')

const mongoose = require("mongoose");

// const Cohort = require("./models/Cohort.model");
// const Student = require("./models/Student.model");
 
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: [process.env.REACT_APP_URI],
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use('/auth', authRouter);
app.use('/api', apiRouter);

app.use('/students', studentsRouter)
app.use('/cohorts', cohortsRouter)


// THESE ARE ALL THE STATIC ROUTES. I THINK WE CAN ERASE THEM AND ONLY LEAVE THE HTML ROUTE FOR THE DOCS - LUIS E.
//Cohort:
// app.get("/cohorts", (req, res) => {
//   Cohort.find({})
//     .then((cohorts) => {
//       console.log("Retrieved cohorts ->", cohorts);
//       res.json(cohorts);
//     })
//     .catch((error) => {
//       console.error("Error while retrieving cohorts ->", error);
//       res.status(500).send({ error: "Failed to retrieve cohorts" });
//     });
// });

// //Students:
// app.get("/students", (req, res) => {
//   Student.find({})
//     .then((students) => {
//       console.log("Retrieved students ->", students);
//       res.json(students);
//     })
//     .catch((error) => {
//       console.error("Error while retrieving students ->", error);
//       res.status(500).send({ error: "Failed to retrieve students" });
//     });
// });

// docs route:
app.get('/docs', (request, response, next) => {
  console.log(request);
  response.sendFile(__dirname + '/views/docs.html');
});

// THIS IS THE MONGOOSE CONNECTION, DO NOT ERASE
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));

  
module.exports = app;
