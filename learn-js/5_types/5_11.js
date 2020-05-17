// Создайте дату
// Создайте объект Date для даты: 20 февраля 2012 года, 3 часа 12 минут. Временная зона – местная.

let feb_20_2012 = new Date(Date.UTC(2012, 1, 20, 3, 12));
console.log("feb_20_2012:", feb_20_2012);

// Напишите функцию getWeekDay(date), показывающую день недели в коротком формате: «ПН», «ВТ», «СР», «ЧТ», «ПТ», «СБ», «ВС».
let date = new Date(2012, 0, 3); // 3 января 2012 года

function getWeekDay(date) {
  return date.getDay(); // 2 - это вторник
}

console.log(getWeekDay(date));
