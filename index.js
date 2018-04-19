'use strict';
//================================== Require/ Set up Dependencies ====================>
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const userRouter = require('./users/userRouter');
const authRouter = require('./auth/auth.route.js');
const questionsRouter = require('./questions/questions.route');
const statsRouter = require('./stats/stats.route');
const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');
const jwtAuth = require('./auth/authenticate');
const app = express();


//================================== Logger Middleware ====================>

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);


//================================== Set up CORS config ==================>

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

//================================== Set up JSON parsing ====================>
app.use(express.json());


//================================== Route Handlers ===================>
app.use('/api', userRouter);
app.use('/api', authRouter);
app.use('/api', questionsRouter);
app.use('/api', statsRouter);

//================================== Error Handler ====================>

app.use((err,req,res,next) => {
  err.status = err.status || 500;
  err.message = err.message || 'Internal Server Error';
  console.log(err);
  res.status(err.status).json(err);
});


//================================== Run Server ====================>

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app, runServer };
