const os = require('os');

const { sayHi, userName } = require('./test');

console.log(sayHi);
console.log(userName);

const name = 'Tommy';

module.exports = name;

console.log(sayHi(name));
console.log(os.platform(), os.release());
