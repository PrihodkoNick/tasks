// Напишите функцию printNumbers(from, to), которая выводит число каждую секунду,
// начиная от from и заканчивая to.
// Сделайте два варианта решения.
// Используя setInterval.
// Используя рекурсивный setTimeout.

// function printNumbers(from, to) {
//   let timerId = setInterval(() => {
//     for (let i = from; i <= to; i++) {
//       return console.log(from++);
//     }
//   }, 1000);
// }

// printNumbers(2, 7);

function printNumbersI(from, to) {
  let timerId = setTimeout(function func() {
    if (from < to) {
      console.log(from++);
      setTimeout(func, 1000);
    }
  }, 1000);
}

printNumbersI(7, 10);
