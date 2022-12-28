console.log('Hello world')
console.log(global)

const os = require('os')
const path = require('path')
const math = require('./math')

console.log(math.add(2, 3 ))
console.log(math.substract(2, 3 ))
console.log(math.multiply(2, 3 ))
console.log(math.divide(2, 3 ))
// console.log(os.homedir())
// console.log(os.type())
// console.log(os.version())

// console.log(__dirname);
// console.log(__filename);

// console.log(path.parse(__filename));