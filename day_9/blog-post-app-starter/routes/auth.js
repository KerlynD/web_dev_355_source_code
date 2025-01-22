var express = require('express');
var router = express.Router();
const fs = require("fs");
const userDBFileName = "./model/userDB.json";

function readUserDB() {
    let data = fs.readFileSync(userDBFileName, "utf-8");
    return JSON.parse(data);
}

function writeUserDB(users){
    let data = JSON.stringify(users, null, 2);
    fs.writeFileSync(userDBFileName, data, "utf-8");
}

router.get('/login', function(req, res) {
    res.render('login');
});

router.get('/signup', function(req, res) {
    res.render('signup');
});

router.post("/login/submit", (req, res) => {
    let userDB = readUserDB();
    const {username, password} = req.body;

    const user = userDB.find(u => u.username === username)

    if (!user){
        return res.status(401).send("User not found")
    }

    if (user.password === password){
        res.render('home')
    }
    else{
        return res.send("Incorrect Password")
    }

});

router.post("/signup/submit", (req, res) => {
    let userDB = readUserDB()
    const {username, password, fullname, email} = req.body
    const newUser = {"username": username, "password": password, "fullname": fullname, "email": email}

    if (newUser.email === "" || newUser.fullname === ""
        || newUser.username === "" || newUser.password === ""){
            return res.status(401).send("No Empty Fields")
    }
    else{
        userDB.push(newUser)
        writeUserDB(userDB)
        res.render('home')
    }
});

module.exports = router;