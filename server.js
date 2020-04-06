const express = require('express');
const server = express();
const helmet = require('helmet');

server.use(express.json());
server.use(express());
server.use(helmet());
server.use(logger);

server.get('/', (req, res) => {
  res.status(200).json({ message: "Let's write some middleware"});
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.get('/api/users/:id', validateUserId, (req, res) => {
  res.status(200).json({ message: "route that expects an id" })
});

server.post('/api/users/:id', validateUser, (req, res) => {
  res.status(200).json({ message: "route that accepts post requests and creates a user"})
});

server.get('/api/users/:id/posts', (req, res) => {
  
})

server.post('/api/users/:id/posts', validatePost, (req, res) => {
  res.status(200).json({ message: "route that accepts post requests and creates a post."})
})

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

function validateUserId(req, res, next){
  !req.params.id
  ? res.status(400).json({ message: "invalid user id" })
  : req.user = req.params.id;

  console.log(`validateUserId: ${req.user}`);
  next();
};

function validateUser(req, res, next){
  if(Object.keys(req.body).length === 0){
    res.status(400).json({ message: "missing user data" })
  }else if(!req.body.name){
    res.status(400).json({ message: "missing required name field" })
  }else{
    next();
  }
  console.log('validateUser: ', req.body);
};

function validatePost(req, res, next){
  if(Object.keys(req.body).length === 0){
    res.status(400).json({ message: "missing post data" })
  }else if(!req.body.text){
    res.status(400).json({ message: "missing required text field" })
  }else{
    next();
  }
  console.log('validatePost: ', req.body)
}

module.exports = server;
