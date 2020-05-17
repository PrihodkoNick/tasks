// Преобразуйте user в JSON, затем прочитайте этот JSON в другую переменную.

let user = {
  name: "Василий Иванович",
  age: 35,
};

let json = JSON.stringify(user, null, 2);
console.log("json:", json);
let newUser = JSON.parse(json);
console.log("newUser:", newUser);
