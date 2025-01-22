var express = require('express');
var router = express.Router();
const { getCollection } = require('../models/db');

router.get('/', function(req, res, next) {
  res.redirect("signup");
});

router.get('/signin', function(req, res, next) {
  res.render("signin");
});

router.get('/signup', function(req, res, next) {
  res.render("signup");
});

router.post("/signup/submit", async (req, res) => {
  try {
    let collection = getCollection("users")
    const {name, email, password} = req.body
    let newUser = {"name": name, 'email': email, 'password':password}

    if (!newUser.name || !newUser.email || !newUser.password){
      res.status(401).send("No Empty Fields. GO BACK")
    }
    else {
      await collection.insertOne(req.body)
      res.render("home")
    }

    
  } catch(e) {
    console.error(e)
  }
});

router.post("/signin/submit", async (req, res) => {
  try {
    let collection = getCollection('users')
    const {email, password} = req.body

    let user = {"email": email, "password": password}

    let collectionCheck = await collection.findOne({email: req.body.email})
    
    if (collectionCheck === null) {
      return res.send(`User with email ${email} does not exist.`);
    } 
    else if (user.password != collectionCheck.password) {
      return res.send("Incorrect password.");
    } 
    else {
      res.render("home");
    }
    
  } catch(e) {
    console.error(e)
  }
});

module.exports = router;
