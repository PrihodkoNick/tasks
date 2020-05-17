// Напишите функцию ucFirst(str), возвращающую строку str с заглавным первым символом.
// Например:
// ucFirst("вася") == "Вася";

function ucFirst(str) {
  let temp = str.slice(1);
  return str[0].toUpperCase() + temp;
}

console.log(ucFirst("коля"));
