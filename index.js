const express = require("express");
const http = require("http");
const fs = require('fs');

const app = express();
app.use(express.json());
const server = http.createServer(app);

app.use("/v1/solver", (req, res) => {
    console.log(Date.now())
    fs.readFile('temp.json', 'utf8', function (err, data) {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            // Parse the JSON data
            const jsonData = JSON.parse(data);

            // Set the response header
            res.writeHead(200, { 'Content-Type': 'application/json' });

            // Send the JSON data as response
            // res.end(JSON.stringify(jsonData));
            res.end("5NcSD/b68BGSy+oL0soV4ZfI1zMjFb66m5fAaVhfwkoTQaWle6aVJ0h6YEGzx32RyduVWvMaoUkme8EUqQ3FecI/trBds6xf1QBzt093Nl0O7l2PIYQd0JOCOYxdOSTB0faFO/vDXi+HhNnX/bvee6ed4MCDE7vgiJAWpadWqRGp4J2Xwr8wB4zhwlREYlTt")
        }
    });
})

server.listen(5001, () => {
    console.log('Server is working')
})

