// $ npm install mz --save

const fs = require('mz/fs');

// a simple async function:
module.exports = async () => {
    let expression = await fs.readFile('../testFile/data.txt', 'utf-8');
    let fn = new Function('return ' + expression);
    let r = fn();
    console.log(`Calculate: ${expression} = ${r}`);
    return r;
};