const fs = require('fs');
const calculator = require('./calculator');
/* 
    1. Write a program to create a module and develop a calculator
*/
var a = 3.5, b = 2.5;
console.log(`Addition of ${a} & ${b}: `, calculator.add(a, b));
console.log(`Subtraction of ${a} & ${b}: `, calculator.sub(a, b));
console.log(`Multiplication of ${a} & ${b}: `, calculator.mul(a, b));
console.log(`Division of ${a} & ${b}: `, calculator.div(a, b));
console.log(`Division of ${a} & ${b}: `, calculator.div(a, 0));
console.log(`Power of ${a} & ${b}: `, calculator.pow(a, b));

console.log('-------------------');

/* 
    2. Write a program read data from a file.
*/
console.log("The sample.txt contains: ")
fs.readFile('./sample.txt', 'utf8', (err, data) => {
    if (err) console.log(err);
    console.log(data);
});

console.log('-------------------');

/* 
    3. Write a program to read data from a file and write data into another file.
*/
fs.readFile('./sample.txt', 'utf8', (err, data) => {
    fs.writeFile('./sample-copy.txt', data, 'utf-8', (err) => {
        if (err) console.log(err);
    });
});

console.log('-------------------');

/* 
    Please find solutions for Question 4 and Question 5 in question_4.js & question_5.js respectively.
    Commands to run:
    -> `node question_4.js`
    -> `node question_5.js`
*/


