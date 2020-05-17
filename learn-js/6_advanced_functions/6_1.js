// Напишите функцию sumTo(n), которая вычисляет сумму чисел 1 + 2 + ... + n.
// Например:
// sumTo(1) = 1
// sumTo(2) = 2 + 1 = 3
// sumTo(3) = 3 + 2 + 1 = 6
// sumTo(4) = 4 + 3 + 2 + 1 = 10
// sumTo(100) = 100 + 99 + ... + 2 + 1 = 5050
// Сделайте три варианта решения:
// 1. С использованием цикла.
// 2. Через рекурсию, т.к. sumTo(n) = n + sumTo(n-1) for n > 1.
// 3. С использованием формулы арифметической прогрессии.

// 1
function sumTo(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

console.log(sumTo(100));

// 2
function sumToRecursive(n) {
  if (n == 1) {
    return 1;
  }
  return n + sumToRecursive(n - 1);
}

console.log(sumToRecursive(100));

// 3 эх...
