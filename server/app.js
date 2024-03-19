var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require('./routes/auth')
var apiRouter = require('./routes/api')


const mongoose = require("mongoose");

const Cohort = require("./models/Cohort.model");
const Student = require("./models/Student.model");
 
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));


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
app.use('/api', apiRouter)

//Cohort:
app.get("/cohorts", (req, res) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log("Retrieved cohorts ->", cohorts);
      res.json(cohorts);
    })
    .catch((error) => {
      console.error("Error while retrieving cohorts ->", error);
      res.status(500).send({ error: "Failed to retrieve cohorts" });
    });
});

//Students:
app.get("/students", (req, res) => {
  Student.find({})
    .then((students) => {
      console.log("Retrieved students ->", students);
      res.json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students ->", error);
      res.status(500).send({ error: "Failed to retrieve students" });
    });
});

// docs route:
app.get('/docs', (request, response, next) => {
  console.log(request);
  response.sendFile(__dirname + '/views/docs.html');
});

// chorts json
// app.get('/api/cohorts', (request, response, next) => {
//   const filePath = path.join(__dirname, '../cohorts.json');
//   response.sendFile(filePath);
// });

// // students json
// app.get('/api/students', (request, response, next) => {
//   console.log(request);
//   const filePath = path.join(__dirname, '../students.json')
//   response.sendFile(filePath);
// });

module.exports = app;


// error
// Luis Emmanuel@Emmanuel MINGW64 ~/OneDrive/Desktop/Ironhack/code/M3-MINI/cohort-tools-project/server (master)
// $ npm run dev

// > server@0.0.0 dev
// > nodemon ./bin/www

// [nodemon] 3.1.0
// [nodemon] to restart at any time, enter `rs`
// [nodemon] watching path(s): *.*
// [nodemon] watching extensions: js,mjs,cjs,json
// [nodemon] starting `node ./bin/www`
// C:\Users\Luis Emmanuel\OneDrive\Desktop\Ironhack\code\M3-MINI\cohort-tools-project\server\node_modules\mongoose\lib\schema.js:689
//       throw new TypeError('Invalid value for schema path `' + fullPath +
//       ^

// TypeError: Invalid value for schema path `projects.type`, got value "undefined"
//     at Schema.add (C:\Users\Luis Emmanuel\OneDrive\Desktop\Ironhack\code\M3-MINI\cohort-tools-project\server\node_modules\mongoose\lib\schema.js:689:13)
//     at Schema.add (C:\Users\Luis Emmanuel\OneDrive\Desktop\Ironhack\code\M3-MINI\cohort-tools-project\server\node_modules\mongoose\lib\schema.js:747:12)
//     at new Schema (C:\Users\Luis Emmanuel\OneDrive\Desktop\Ironhack\code\M3-MINI\cohort-tools-project\server\node_modules\mongoose\lib\schema.js:142:10)
//     at Object.<anonymous> (C:\Users\Luis Emmanuel\OneDrive\Desktop\Ironhack\code\M3-MINI\cohort-tools-project\server\models\Student.model.js:7:23)
//     at Module._compile (node:internal/modules/cjs/loader:1376:14)
//     at Module._extensions..js (node:internal/modules/cjs/loader:1435:10)
//     at Module.load (node:internal/modules/cjs/loader:1207:32)
//     at Module._load (node:internal/modules/cjs/loader:1023:12)
//     at Module.require (node:internal/modules/cjs/loader:1235:19)
//     at require (node:internal/modules/helpers:176:18)

// Node.js v20.11.0
// [nodemon] app crashed - waiting for file changes before starting...
