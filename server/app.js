var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require('./routes/auth')
var apiRouter = require('./routes/api')

var app = express();

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


// docs route:
app.get('/docs', (request, response, next) => {
  console.log(request);
  response.sendFile(__dirname + '/views/docs.html');
});
// chorts json
app.get('/api/cohorts', (request, response, next) => {
  const filePath = path.join(__dirname, '../cohorts.json');
  response.sendFile(filePath);
});

// students json
app.get('/api/students', (request, response, next) => {
  console.log(request);
  const filePath = path.join(__dirname, '../students.json')
  response.sendFile(filePath);
});

module.exports = app;