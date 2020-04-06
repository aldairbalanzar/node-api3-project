const express = require("express");
const router = express.Router();
const helmet = require('helmet');

const Users = require("./users/userDb.js");

router.use(express.json());
router.use(express());
// router.use(helmet());
router.use(logger);

router.get('/api/users/:id', validateUserId, (req, res) => {
    res.status(200).json({ message: "route that expects an id" })
  });
  
  router.post('/:id', validateUser, (req, res) => {
    res.status(200).json({ message: "route that accepts post requests and creates a user"})
  });
  
  router.get('/:id/posts', (req, res) => {
    
  })
  
  router.post('/:id/posts', validatePost, (req, res) => {
    res.status(200).json({ message: "route that accepts post requests and creates a post."})
  })
  
  //custom middleware
  
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
  };


  module.exports = router