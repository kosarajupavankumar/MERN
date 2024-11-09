const path = require("path");

const filePath = path.join(__dirname, "fs.js");

const dirName = path.dirname(filePath);

const baseName = path.basename(filePath, '.js');

const extName = path.extname(filePath);

console.log(filePath);

console.log(dirName);

console.log(baseName);

console.log(extName);

const direcctory = '/home/user';
const subDirectory = 'docs';
const file = 'example.txt';

const fullPath = path.join(direcctory, subDirectory, file);

console.log(fullPath);

const fullPath1 = path.resolve(__dirname, 'fs.js');

console.log(fullPath1);