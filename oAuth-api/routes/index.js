var express = require('express');
var axios = require("axios");
var crypto = require("crypto")
var router = express.Router();

let stateDirectory = [];

router.get('/', function(req, res) {
  res.render('index');
});

//STEP 1
router.get('/github-auth', async function(req, res) {
  const state = crypto.randomBytes(8).toString('hex');
  stateDirectory.push(state);
  const clientid = process.env.client_id;
  const redirecturi = process.env.redirect_uri;

  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientid}&redirect_uri=${redirecturi}&state=${state}`;
  res.redirect(githubAuthUrl);
});

//STEP 2
router.get("/callback", (req, res) => {
  const {code, state} = req.query;
  if(!stateDirectory.find(state)){
    res.send("Bad request. Try again");
  } else {
    //res.send(`Check the url for the code and the state!!! \ncode=${code}, state=${state}`);
    getToken(req, res, code);
  }
});

//STEP 3
async function getToken(req, res, code) {
  const response = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: process.env.client_id,
      client_secret: process.env.client_secret,
      code: code,
    },
    {
      headers: {
        Accept: "application/json"
      },
    }
  );

  const { access_token } = response.data;
  res.cookie("access_token", access_token);
  res.redirect("/repos");
}

//STEP 4
router.get("/repos", async (req, res) => {
  const token = req.cookies.access_token;
  console.log(token);
  const repos = await getAllRepos(req, res, token);
  res.render("repos", { repos });
});

async function getAllRepos(req, res, token) {
  const response = await axios.get("https://api.github.com/user/repos", {
    headers: {
      "Accept": "application/vnd.github+json",
      "Authorization": `Bearer ${token}`
    }
  });
  return response.data;
}



module.exports = router;
