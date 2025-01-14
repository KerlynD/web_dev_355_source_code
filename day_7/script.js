const crypto = require('crypto')
//-----------------------Async Programming-----------------------//

// Asynchronously generate a random string
// Callback Function
crypto.randomBytes(11, (err, buf) => {
if (err) throw err;
console.log(`${buf.length} bytes of random data: ${buf.toString('hex')}`);
});

// Asynchronously generate a UUID (Universally Unique Identifier)
console.log(crypto.randomUUID());

//-------------------------Encryption----------------------------//

// Store a password uniquely
const password = "Password"
const salt = 'uniqueSaltValue'
const keyLength = 11 // Unique for every user

crypto.scrypt(password, salt, keyLength, (err, derivedKey) => {
    if (err) throw err;
    console.log('Derived Key (hex):', derivedKey.toString('hex'))
    // returns unique: Derived Key (hex): 008bf086154e5d239b0091
})

//------------------------FS Module-----------------------------//

const fs = require('fs')

// Writing to a file
const data = "Hello World"
fs.writeFile('input.txt', data, "utf-8", (err) => {
    if (err) throw err;
    else console.log("Written")
});

// Read File
fs.readFile("./input.txt", 'utf-8', (err, data) => {
    if (err) throw err;
    else console.log(data)
})

// Create a folder and explore the contents

fs.mkdir("./directory", (err) => { // Create directory
    if(err) console.log("Failed to create folder.");
    else {
        for(let i = 10; i <= 15; i++){
            fs.writeFileSync(`./directory/${i}.txt`, `File ${i}`, (err) => { // Create txt's with #'s
                if(err) console.log(`Error writing file ${i}`);
            })
        } 
        displayDir(); // Sync Function
    }
})

function displayDir(){
    fs.readdir("./directory", (err, files) => {
        if(err) throw err;
        for(let file of files) {
            console.log(file); // Display all files
        }
    })
}

//------------------------------DNS-----------------------------//
const dns = require("dns");

const domain = "google.com"
dns.resolve(domain, (err, address) => { // Resolves to IP Address
    if(err) throw err;
    else console.log(`IP of ${domain}: ${address}`);
})

const domains = ["google.com", "amazon.com", 
                 "ebay.com", "cuny.edu"];
for(let domain of domains) {
    dns.resolve(domain, (err, address) => {
        if(err) console.log(`Error on ${domain}`);
        else console.log(`IP of ${domain}: ${address}`);
    });
}

//----------------------------URL-----------------------------//
const url = require("url");
let urlObj = new URL("https://www.google.com/?q=%22How%20to%20learn%20js?%22")
console.log(urlObj);