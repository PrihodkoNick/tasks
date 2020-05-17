// Есть объект salaries с произвольным количеством свойств, содержащих заработные платы.
// Напишите функцию sumSalaries(salaries), которая возвращает сумму всех зарплат
// с помощью метода Object.values и цикла for..of.
// Если объект salaries пуст, то результат должен быть 0.

function sumSalaries(obj) {
  let res = 0;
  for (let salary of Object.values(obj)) {
    res += salary;
  }

  // можно и так
  // res = Object.values(obj).reduce((sum, current) => (sum += current), 0);

  return res;
}

let salaries = {
  John: 100,
  Pete: 300,
  Mary: 250,
};

console.log(sumSalaries(salaries)); // 650
