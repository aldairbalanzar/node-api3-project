const express = require('express');
const helmet = require('helmet');
const server = express();

const usersRouter = require('./users/usersRouter.js');

server.use(express());
server.use(helmet());
server.use(logger);
server.use(express.json());

server.get('/', (req, res) => {
  // res.status(200).json({ message: "Let's write some middleware" });
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('/api/users', usersRouter);

// //custom middleware

function logger(req, res, next) {
  const method = req.method;
  const endpoint = req.originalUrl;
  date = Date();

  console.log(`logger: 
  method: ${method}
  endpoint: ${endpoint}
  Timestamp: ${date.toString()}`);
  next();
};

module.exports = server;
