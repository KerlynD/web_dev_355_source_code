var express = require('express');
var router = express.Router();
const fs = require("fs");
const postDBFileName = "./model/postDB.json";

function readPostDB() {
    let data = fs.readFileSync(postDBFileName, "utf-8");
    return JSON.parse(data);
}

function writePostDB(postDB) {
  const data = JSON.stringify(postDB, null, 2);
  fs.writeFileSync(postDBFileName, data, "utf-8");
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');substring(0, 100)
});

router.get("/home", function(req, res, next){
  const postDB = readPostDB()
  posts.forEach(post => {
    post.substring(0, 100)
    
  });
  res.render('home', {posts: postDB.posts})
})

router.get("/home/compose", (req, res) => {
  res.render("compose");
});

router.post("/home/compose/submit", (req, res) => {
  const postDB = readPostDB()
  const { title, body } = req.body

  if (!title || !body) {
    return res.redirect("/home/compose")
  }

  const post = { title, body }

  postDB.posts.push(post)
  writePostDB(postDB)

  res.redirect("/home")
});


module.exports = router;
