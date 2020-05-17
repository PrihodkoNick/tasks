// Напишите функцию camelize(str), которая преобразует строки вида «my-short-string» в «myShortString».
// То есть дефисы удаляются, а все слова после них получают заглавную букву.
// Примеры:
// camelize("background-color") == 'backgroundColor';
// camelize("list-style-image") == 'listStyleImage';
// camelize("-webkit-transition") == 'WebkitTransition';

function camelize(str) {
  let arr = str.split("-");
  let res = "";
  for (let i = 0; i < arr.length; i++) {
    if (i) {
      res += arr[i][0].toUpperCase() + arr[i].slice(1);
    } else {
      res += arr[i];
    }
  }

  return res;
}

console.log(camelize("list-style-image"));
