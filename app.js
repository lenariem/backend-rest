/** EXTERNAL DEPENDENCIES */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

/** ROUTERS */
const indexRouter = require('./routes/index');
const menuRouter = require('./routes/menu');
const orderRouter = require('./routes/order');

/** OUR MIDDLEWARE */
const env = require('./config/config');
const cors = require('cors');

/** INIT THE SERVER */
const app = express();

/** LOGS */
app.use(logger('dev'));

/** CONNECT TO MONGO */
mongoose.connect(env.db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on(
  'error',
  console.error.bind(console, 'connection error:')
);

mongoose.connection.on('open', () => {
  console.log(`Connected to the database...`);
});

/** REQUEST PARSERS */
app.use(express.json()); // parser for JSON data => req.body
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* let frontendOrigin = 'https://frontend-rest-react.herokuapp.com/'
app.use(
  cors({
    origin: [frontendOrigin], // HERE YOU CAN WHITELIST THE DOMAIN OF YOUR CLIENT
    credentials: true, // allow cookies from other origins
  })
); */


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });


/** STATIC FILES */
app.use(express.static(path.join(__dirname, 'public'))); // => current_folder / public


/** ROUTES */
app.use('/', indexRouter);
app.use('/menu', menuRouter)
app.use('/orders', orderRouter)

/** ERROR HANDLING */
app.use(function (req, res, next) {
  const err = new Error(
    'Looks like something is broken...'
  );
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(400).send({
    error: {
      message: err.message,
    },
  });
});

app.listen(process.env.PORT || 5000);

module.exports = app;
