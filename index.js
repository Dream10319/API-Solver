const express = require("express");
const http = require("http");
const fs = require('fs');

const app = express();
app.use(express.json());
const server = http.createServer(app);

app.use("/v1/baemin/solver", (req, res) => {
    console.log('baemin', Date.now())
    // Set the response header
    res.writeHead(200, { 'Content-Type': 'application/json' });

    // Send the JSON data as response
    // res.end(JSON.stringify(jsonData));
    res.end("5NcSD/b68BGSy+oL0soV4ZfI1zMjFb66m5fAaVhfwkoTQaWle6aVJ0h6YEGzx32RyduVWvMaoUkme8EUqQ3FecI/trBds6xf1QBzt093Nl0O7l2PIYQd0JOCOYxdOSTB0faFO/vDXi+HhNnX/bvee6ed4MCDE7vgiJAWpadWqRH4WLZ9XWvJMK+SiEcyumPV")

})

app.use("/v1/yogiyo/solver", (req, res) => {
    console.log('yogiyo', Date.now())
    // Set the response header
    res.writeHead(200, { 'Content-Type': 'application/json' });

    // Send the JSON data as response
    // res.end(JSON.stringify(jsonData));
    res.end("https://api.zenrows.com/v1/?apikey=3a14ceddf104f28fdc51f8d07417a31ca2c42357&url=")
})

app.use("/v1/cardsales/solver", (req, res) => {
    console.log('creditsales', Date.now())
    // Set the response header
    res.writeHead(200, { 'Content-Type': 'application/json' });

    // Send the JSON data as response
    // res.end(JSON.stringify(jsonData));
    res.end("YTBmZDNlYzQtMGQ0ZC00NzljLWE1NDktZjQwYjE4NmNlMDE1OjdjYzIxOTY4LTJiNzAtNDhlMy05MzExLTQwMjcxYTg2YzA2OA==")
})

app.use("/v1/tossabledigits/token", (req, res) => {
    console.log('tossabledigits', Date.now())
    // Set the response header
    res.writeHead(200, { 'Content-Type': 'application/json' });

    // Send the JSON data as response
    // res.end(JSON.stringify(jsonData));
    res.end("MAV3-19KA-JE1B-A0P3")
})

server.listen(5001, () => {
    console.log('Server is working')
})

