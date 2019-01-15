const http = require('http');
const fs = require('fs');

/* 
    4. Write a program to read data from a html file and display on the browser.
*/
var port = 8444;
http.createServer((req, res) => {
    fs.readFile('./sample.html', (err, data) => {
        if (err) console.log(err);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
    });
}).listen(port);