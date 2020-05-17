// 1
// У нас есть объект:
// let user = {
//   name: "John",
//   years: 30
// };
// Напишите деструктурирующее присваивание, которое:
// свойство name присвоит в переменную name.
// свойство years присвоит в переменную age.
// свойство isAdmin присвоит в переменную isAdmin (false, если нет такого свойства)
// Пример переменных после вашего присваивания:

let user = {
  name: "John",
  years: 30,
};

let { name, years: age, isAdmin = false } = user;
console.log(name); // John
console.log(age); // 30
console.log(isAdmin); // false

// 2
// У нас есть объект salaries с зарплатами:
// let salaries = {
//   "John": 100,
//   "Pete": 300,
//   "Mary": 250
// };
// Создайте функцию topSalary(salaries), которая возвращает имя самого высокооплачиваемого сотрудника.
// Если объект salaries пустой, то нужно вернуть null.
// Если несколько высокооплачиваемых сотрудников, можно вернуть любого из них.

let salaries = {
  John: 100,
  Pete: 300,
  Mary: 250,
};

function topSalary(obj) {
  let prevValue = 0;
  let res = "";
  for (let [key, value] of Object.entries(obj)) {
    if (value > prevValue) {
      res = key;
    }
    prevValue = value;
  }

  return res;
}

console.log(topSalary(salaries));
