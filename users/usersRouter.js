const express = require("express");
const router = express.Router();

const Users = require('./userDb');
const Posts  = require('../posts/postDb');

router.get('/', (req, res) => {
    Users.get(req.params)
    .then(users => {
      users
      ? res.status(200).json(users)
      : res.status(400).json({message: "could not find list of users."})
    })
    // res.status(200).json({ message: "route that sends back list of users." })
  })
  
router.get('/:id', validateUserId, (req, res) => {
const id = req.params.id;
Users.getById(id)
.then(user => {
    user
    ?res.status(200).json(user)
    : res.status(400).json({message: "could not find user with that id."})
})
});

router.post('/', validateUser, (req, res) => {
const newUser = req.body;
console.log(newUser);
newUser
? Users.insert(newUser)
.then(post => {
    res.status(200).json(newUser)
})
:res.status(400).json({ message: "error posting this user." })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;

    Users.update(userId, updatedUser)
    .then(res.status(200))
    .catch(res.status(400).json({ message: "error trying to update user data." }))
});
  
router.delete('/:id', validateUserId, (req, res) => {
const userId = req.params.id
Users.remove(userId)
.then(user => res.status(200).json({ message: "user deleted."}, user))
.catch(err => res.status(400).json({ errorMessage: "could not find that user"}))
});

router.get('/:id/posts', validateUserId, (req, res) => {
const id = req.params.id;
Users.getUserPosts(id)
    .then(posts => {
    console.log(posts);
    res.status(200).json(posts)
})
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
const id = req.params.id;
const newPost = {
    user_id: id,
    text: req.body.text
}

Posts.insert(newPost)
    .then(res.status(200).json(newPost))
    .catch(err => res.status(400).json({ errorMessage: "error trying to post that post."}))
});


//custom middleware
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

  module.exports = router;