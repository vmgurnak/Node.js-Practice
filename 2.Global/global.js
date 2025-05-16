//Global Object
// console.log(global);

// setTimeout(() => {
//   console.log('Hello!');
// }, 2000);

//Global Object
// console.log(__dirname);

//Global Object
// console.log(__filename);

//Global Object
// console.log(process);

//Variables in process environment
// console.log(process.env);
// console.log(process.argv);
// console.log(`Hello, ${process.argv[2]}`);

//Global Object
const url = new URL('https://webDev.com/path/name#test');
console.log(url.hostname);
console.log(url.href);
console.log(url.pathname);
console.log(url.hash);
