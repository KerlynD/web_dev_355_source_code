// Creating a server

const http = require("http"); // package
const fs = require("fs")

const port = 3000; // transport layer, many different ports
const server = http.createServer(); // function to create server

server.on("listening", () => 
    console.log(`server is running on port ${port}`)
); // listening for events

/*server.on("request", (req,res) => {
    res.writeHead(200, {"Content-type":"text/html"})
    res.write("Hello CS 355");
    console.log(req)
}); // responding to requested data */

// working with requests & html
server.on("request", (req, res) => {
    const url = req.url;
    
    if(url === '/'){
        res.writeHead(200, {"Content-type":"text/html"});
        fs.createReadStream("./signup.html").pipe(res); // serving streams of data
    } else if(url === "/style.css"){ // need to send css as well
        res.writeHead(200, {"Content-type":"text/css"});
        fs.createReadStream("./style.css").pipe(res);
    } else if(url.startsWith("/helloworld")){
        const newURL = ("localhost:3000" + new URL(url)); //save the url data
        console.log(newURL.searchParams); 
    }
});

server.listen(port); // looking at port 3000