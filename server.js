const express = require('express');
const helmet = require('helmet');
const server = express();

const usersRouter = require('./users/usersRouter.js');

server.use(express());
server.use(helmet());
server.use(logger);
server.use(express.json());

server.get('/', (req, res) => {
  const message = process.env.MESSAGE || "hello from localhost"
  res.status(200).json({ api: "node_api3_project", message  });
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
