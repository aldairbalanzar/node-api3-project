const express = require('express');
const helmet = require('helmet');
const server = express();

const Users = require('./users/userDb');
const Posts  = require('./posts/postDb');



server.use(express());
server.use(helmet());
server.use(logger);
server.use(express.json());

server.get('/', (req, res) => {
  // res.status(200).json({ message: "Let's write some middleware" });
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.get('/api/users', (req, res) => {
  Users.get(req.params)
  .then(users => {
    users
    ? res.status(200).json(users)
    : res.status(400).json({message: "could not find list of users."})
  })
  // res.status(200).json({ message: "route that sends back list of users." })
})

server.get('/api/users/:id', validateUserId, (req, res) => {
  const id = req.params.id;
  Users.getById(id)
  .then(user => {
    user
    ?res.status(200).json(user)
    : res.status(400).json({message: "could not find user with that id."})
  })
});

server.post('/api/users', validateUser, (req, res) => {
  const newUser = req.body;
  console.log(newUser);
  newUser
  ? Users.insert(newUser)
  .then(post => {
    res.status(200).json(newUser)
  })
  :res.status(400).json({ message: "error posting this user." })
});

server.get('/api/users/:id/posts', validateUserId, (req, res) => {
  const id = req.params.id;
  Users.getUserPosts(id)
   .then(posts => {
    console.log(posts);
    res.status(200).json(posts)
  })
})

server.post('/api/users/:id/posts', validateUserId, validatePost, (req, res) => {
  const id = req.params.id;
  const newPost = req.body;

  Users.getById(id)
  .then(Posts.insert(newPost)
    .then(post => res.status(200).json(post))
    .catch(err => res.status(400).json({ errorMessage: "error trying to post that post."})))
  .catch(err => res.status(400).json({ errorMessage: "error trying to find that user."}))
  
  // Posts.insert(req.body)
  // .then(post => res.status(201).json(post))
  // .catch(err => res.status(400).json({ errorMessage: "error trying to post that post."}))
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
