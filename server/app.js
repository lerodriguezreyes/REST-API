var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

// var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require('./routes/auth');
var apiRouter = require('./routes/api');
var studentsRouter = require('../server/routes/students');
var cohortsRouter = require('../server/routes/cohorts');

const mongoose = require("mongoose");
 
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

// app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use('/auth', authRouter);
app.use('/api', apiRouter);

app.use('/students', studentsRouter);
app.use('/cohorts', cohortsRouter);

// docs route:
app.get('/docs', (request, response, next) => {
    console.log(request);
    response.sendFile(__dirname + '/views/docs.html');
});

// THIS IS THE MONGOOSE CONNECTION, DO NOT ERASE
mongoose
  .connect(process.env.MONGODB_URI)  //PONER EL NOMBRE DE LA VARIABLE QUE ESTA EN .ENV
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));

  
module.exports = app;
