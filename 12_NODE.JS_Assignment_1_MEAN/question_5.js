const http = require('http');
const fs = require('fs');

/*
    5. Write a program to read a JSON data and display on the browser.
*/
var port = 8555;
http.createServer((req, res) => {
    fs.readFile('./sample.json', (err, data) => {
        if (err) console.log(err);
        res.writeHead(200, { 'Content-Type': 'json' });
        res.write(data);
        res.end();
    });
}).listen(port);