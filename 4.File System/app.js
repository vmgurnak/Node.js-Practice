const fs = require('fs');

// const { setTimeout } = require('timers/promises');

// fs.readFile('./test.txt', (error, data) => {
//   console.log(data);
// });

// fs.readFile('./test.txt', (error, data) => {
//   console.log(data.toString());
// });

// fs.readFile('./test.txt', 'utf-8', (error, data) => {
//   console.log(data);
// });

// console.log('Just test!');

// fs.readFile('./test.txt', 'utf-8', (error, data) => {
//   fs.writeFile('./test2.txt', `${data} New text`, () => {
//     console.log('File was written');
//   });
// });

//Четение файла, создание папки, запись файла в папку
fs.readFile('./test.txt', 'utf-8', (error, data) => {
  fs.mkdir('./files', (error) => {
    error ? console.log(error) : console.log('Folder ./files was created');
  });
  fs.writeFile('./files/test2.txt', `${data} New text`, (error) => {
    error ? console.log(error) : console.log('File test2.txt was written');
  });
});

//Проверка существования файла, удаление файла
setTimeout(() => {
  if (fs.existsSync('./files/test2.txt')) {
    fs.unlink('./files/test2.txt', () => {});
    console.log('File test2.txt was deleted');
  }
}, 4000);

//Проверка существования папки, удаление папки
setTimeout(() => {
  if (fs.existsSync('./files')) {
    fs.rmdir('./files', () => {});
    console.log('Folder files was deleted');
  }
}, 8000);
