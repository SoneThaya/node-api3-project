const express = require('express');

const Users = require('./userDb')

const router = express.Router();

router.post('/', validateUser('name'), (req, res) => {
  // do your magic!
  Users.add(req.body)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "error adding to posts"
      })
    })
});

router.post('/:id/posts', validatePost('text'), (req, res) => {
  // do your magic!
  Users.add(req.body)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "error adding text"
      })
    })
});

router.get('/', (req, res) => {
  // do your magic!
  console.log(req)
  Users.get()
    .then(users => {
      res.status(200).json({ headers: req.headers, users})
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: 'error retrieving users'
      })
    })
});

router.get('/:id', validateUserId, (req, res) => {
  console.log(req.params)
  Users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({message: "error retrieving posts"})
    })
  
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
 
  res.status(200).json(req.user.post)
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.remove(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json({message: "user deleted"})
      } else {
        res.status(404).json({ message: "DID not find user"})
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "error deleted user"
      })
    })
});

router.put('/:id', validatePost('text'), (req, res) => {
  // do your magic!
  Users.update(req.params.id, req.body)
    .then(post => {
      if (post) {
        res.status(201).json(post)
      } else {
        res.status(400).json({message: "missing required text field"})
      }
    })
    .catch(error => {
      console.log(error)
      res.status(400).json({message: "missing post data"})
    })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  Users.getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user;
        next()
      } else {
        res.status(404).json({message: "User by ID not found"})
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "error retrieving user"
      })
    })
}

function validateUser(prop) {
  return function (req, res, next) {
    // do your magic!
    if (!req.body[prop]) {
      res.status(400).json({ message: "missing user data" })
    } else {
      next()
    }
  }
  
}

function validatePost(prop) {
  
  return function (req, res, next) {
    if (!req.body[prop]) {
      res.status(400).json({message: "missing post data"})
    } else {
      next()
    }
  }
  
}

module.exports = router;
