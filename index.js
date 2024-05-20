const express = require("express");
const http = require("http");
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: 'http://localhost:2018',
    methods: ['GET'],
    allowedHeaders: ['Content-Type', 'Authorization'] // Add any other headers your client might send
}));

app.use(express.json());
const server = http.createServer(app);
var count = 0;
var qrCodeContents =
[
    '2@fgyNPwr0SXCgeQlH7u4cUeC63yor09YM7pPT4n8uckA4/yL4CcMnurOG6FzdoHTC4v2NQ1rpli2PHA==,z7gebY2Qt+LAay/wnZrJCeSRoTut0cIhM1vqpVlJwmQ=,Xp6kuzdg5PCBMI3f7GhrZHXZd7D/oMydJkDch1W83SA=,xkByL7hYBq0AruhlINCXTWCl45mwG/sw42X+pCTeK7g=,1',
    '2@YOroTQRU5gPcXvHBe2L8fxbn3nYrm3qtvg2j1PEmZVEg7ZOa/4T+neSWgmp9h07pDy86lu7Ht4XqVA==,koPMktsEfyHtoApl0gErkEM179dyX3PMU8I9xB+XWFE=,Yj785Bf3mr9ILC21FjE295LL73YpHJ2IQCK8vR8n8kc=,BUrMbR1XEPukWqxzxQRbbLwF/EqDGk+UrnaubI9AYnw=,1',
    '2@4Hx3m08hoDyUTPUqN47MNwo7XExYP2LtmlsauEQgDZ6BCU8e/PnS+IUJamY4pDk/2jUnkyONCbSTmA==,hcHqCfyBdnXNAq3CT1cucFfoFv18wA+UT5KaftgDOFM=,EL07wlUvVW7rRY5zIVaemRVSl8XjoHlau/v2HXCnu2o=,dOuQrrbEggVsa2Co7MrAz7nyx8oh/gHFc3RAjh+s4xs=,1',
    '2@B4AFED6/fz5kR1n7OUX6j2wm29AZ1xo7awYZagBw/Y8tYLCSRYmJYa2+atJI7tLk+pu53P1DtWlotA==,Vb0O9GM0FIsC4owXIPrUpsiUR/gPuzOCe4UilORswlI=,IHJy0jVYyO4gy4+BMyyJY3q/+wsvXLEg8xc4h9WGpAc=,gFkxNJpbY5epI8G2+76u4lQMUqfhb45NGop0oxwbq90=,1',
    '2@LIojmOYlDQFi+PMOoI1hUdqE0fbo2RJ0BGrlk+go+Z9sty+3MJQYYHZT/TIK4FYxfpRgYBNnYIIoPQ==,hK1ZxWfizrCoTyP5yed0aBjFN28GDYWbqsbvLxzHrXA=,7Wn6WBwr9MXa5WNjG0dAIyxFo2gdlKqM+rLDvjUbP2U=,7DgkYYJeEMDEC0iNTwcpqIFQ6X42RE4PxWXAOuBuy50=,1',
    '2@/ls/NNu40gBbZkhD983rTITfCpTNwHipGqJ5MUN3QUVRkg96Kh4wbLs9PGsrHQaWFHHSpez2N4iOqw==,7pcTrgajQfRrZIAxANoTGmuGdpgQjocdMaDREwS1Uzw=,TnuaITnPHB7jmzaJ4euCnCp2dhs4LJ9HfrBsNWCy22k=,/BsKT6tRvkrqTpMo2+TFA82Bqd0rvzaW5b/Bau4kH+8=,1',
    '2@L1F3t0XLYqAShztSCTlSnI3NglIbOFe5qknbq4E9YqYk4OyDI9/sDI+JMFCWoWaT7rwwha3kUoIdRA==,uUANwuCaShTOQImPUEGAEAXZBOJG6QAVjhOCPjSZFAU=,Y3BGw8i4FU1WaTxqmueEs+EHiBobOSwJkCfwpy4Zz2Q=,2iNAa5CWjlKgoyOgOQQNY7lXkuoYPMY8HyEGm/uHnH0=,1',
    '2@W+qO7I2QoMhw+VLj5T7lFkleCMLy0ADFG8BGLFXdPnOVPBNqgz7TkBadm0XvhJj8F7HxHuw/g/2KxA==,MOa5bhFBcDNmJciJuJk2ZSH+q1lHV/ur4lVZTi94biA=,5mSdq7xGIVYh3VQ1HDWaB0IY5p0EriKa+3RpgBjUZD8=,r9wpsVt3BpJjrPc7CuO35HikilsOFO4rNSrFUJpx71c=,1',
    '2@p/w91taRoMYa4MKyMsvHZx5N2Z6ijAjMhWB8eIK5HMsG9S65E4zT48VQPNMiWXyIPCs/xP8KOIJ8QA==,1t0P7XuWWs7hI2PgwHz0YdzzZyzzU/HH5sxqrZWZ2Ek=,Wy98nf3tHVxeWO9t14e7LJfVoiya5mKd2qzlWl3NJCk=,c5y7xaY5xTZ1qeS5LYB6zRpc7A52zFn1zu7R0JRiqH0=,1',
    '2@tRn60EPho0y6mQpm1GNLgcu5E2bcKrf+SG0nUcGKjrqgRkhCTHb6LaTfGwZmRyjBlVxPKslqLxCXZw==,Y3yjvDVm+eJQNJGPPo430D0vNfIEKZvedjE1GdUFSVk=,WLFDDEpXK1Gr135LLdIT8Hs9aNhYEsUTYV7x/0YXaWY=,nNOaRlBdS15VZ+qcM06SWCmW8xCwQAFuR9DyGPICs1c=,1',
    '2@L966/qA5OdiAX/23iDjjBHxgCQISzb16DFjLR+NjV8FoJz1EVbwVos04Qw2cPjIjLd2TVbvYN+tHzQ==,bmY3fRxiYnAxKn03rWZt/a9kFRuSPJ4m8uc2JGlMlhc=,OzQ0NOuBwtdUS7mJ6wEAlhSbGi/J9RkTfRmAxv4Do2g=,cfyAEUKNhyojEVf4lULzGilF6KYGd6EDrZBqlVxNV8g=,1',
];

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

app.use("/V1/qrgen", (req, res) => {
    console.log('qrgen', Date.now())
    // Set the response header
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.header('Access-Control-Allow-Origin', 'http://localhost:2018');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Add any other required headers
    // Set the appropriate content type for the response
    res.setHeader('Content-Type', 'text/plain');
    // Send the JSON data as response
    // res.end(JSON.stringify(jsonData));
    res.end(qrCodeContents[count])
    count++;
    if(count == 10) count = 0;
})

server.listen(5001, () => {
    console.log('Server is working')
})

