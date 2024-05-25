var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var goalsRuter = require('./routes/goals');
var tasksRuter = require('./routes/tasks');
const router = express.Router();


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/',router);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

router.use((req, res, next)=> {
  if(req.headers.authorization && req.headers.authorization === 'actividad3DAW'){
    next();
  }else {
    res.json({'error': 'No se están enviando las credenciales'})
  }
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/goals', goalsRuter);
app.use('/tasks', tasksRuter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
