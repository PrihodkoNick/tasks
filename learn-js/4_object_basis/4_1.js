// Напишите код, выполнив задание из каждого пункта отдельной строкой:

// Создайте пустой объект user.
// Добавьте свойство name со значением John.
// Добавьте свойство surname со значением Smith.
// Измените значение свойства name на Pete.
// Удалите свойство name из объекта.

let user = {};

user.name = "John";
user.surname = "Smith";
console.log(user);
user.name = "Pete";
console.log(user);
delete user.name;
console.log(user);
