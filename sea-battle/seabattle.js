// don't forget !!!

const logs = document.querySelector(".logs"); // поле логов
const game = {
  started: false,
  mouseDown: false,
};

const players = ["player", "computer"]; // игроки
const ships = []; // корабли
const limits = []; // ограничения (границы)

const computerShots = []; // выстрелы компьютера
const playerShots = []; // выстрелы игрока

const ship = new Set(); // временное хранилище для отрисовки корабля

// начинаем рисовать корабль
document.querySelector(".player").addEventListener("mousedown", (e) => {
  e.preventDefault();
  if (e.which === 1) {
    if (game.started) {
      console.log("нельзя рисовать корабли во время игры!");
      return;
    }

    game.mouseDown = true;

    let coords = getCoords(e);
    // если пересекаем корабль или границы
    if (limits.find((limit) => limit === coords)) {
      console.log(
        "Нельзя рисовать новый корабль поверх старого или рядом с ним!"
      );
      game.mouseDown = false;
    }
  }
});

function getCoords(e) {
  let x = e.target.cellIndex;
  let y = e.target.closest("tr").innerText.replace(/\s/g, "");

  return `${x}:${y}`;
}

// рисуем корабль
document.querySelector(".player").addEventListener("mousemove", (e) => {
  setShipCoordinates(e);
});

// устанавливаем координаты корабля
function setShipCoordinates(e) {
  if (e.target.nodeName === "TD") {
    // рисуем только если зажата левая кнопка мыши
    if (game.mouseDown) {
      ship.add(`${getCoords(e)},false`); // Set не дублирует значения !
    }
  }
}

// заканчиваем рисовать корабль
document.querySelector(".player").addEventListener("mouseup", (e) => {
  if (e.which === 1) {
    game.mouseDown = false;

    if (ship.size > 4) {
      console.log("Нельзя рисовать корабль более 4-х палуб!");
      ship.clear();
    } else {
      let amount4 = 0;
      let amount3 = 0;
      let amount2 = 0;
      let amount1 = 0;

      // проверяем кол-во отрисованных ранее кораблей
      for (let item of ships) {
        // 4
        if (item.length === 4 && ship.size === 4) {
          amount4 = 1;
          console.log("Вы уже нарисовали 4-х палубный корабль!");
        }
        // 3
        if (item.length === 3 && ship.size === 3) {
          if (amount3 < 2) {
            amount3++;
          }
        }
        // 2
        if (item.length === 2 && ship.size === 2) {
          if (amount2 < 3) {
            amount2++;
          }
        }
        // 1
        if (item.length === 1 && ship.size === 1) {
          if (amount1 < 4) {
            amount1++;
          }
        }
      }

      if (amount3 >= 2) {
        console.log("Вы уже нарисовали два 3-х палубных корабля!");
      }
      if (amount2 >= 3) {
        console.log("Вы уже нарисовали три 2-х палубных корабля!");
      }
      if (amount1 >= 4) {
        console.log("Вы уже нарисовали четыре однопалубных корабля!");
      }

      // рисуем только если прошли все условия
      if (!amount4 && amount3 < 2 && amount2 < 3 && amount1 < 4) {
        let check = checkLimits(ship); // проверяем нет ли пересечений (true - есть пересечение, false - нет)
        if (!check) {
          addOuterLimits(ship); // добавляем ограничения
          ships.push(Array.from(ship)); // добавляем корабль
        } else {
          console.log(
            "нельзя рисовать корабль поверх другого корабля или его границ!"
          );
        }

        render(); // отрисовываем игровое поле
      }

      ship.clear();
    }
  }
});

// проверка на пересечение границ
function checkLimits(set) {
  for (let coords of set.values()) {
    let exists = limits.find((item) => item === coords);
    if (exists) {
      return true;
    }
  }
  return false;
}

function getXY(coords) {
  let delimeter = coords.indexOf(":");
  let delimeterComma = coords.indexOf(",");

  let x = +coords.substring(0, delimeter);
  let y =
    delimeterComma !== -1
      ? +coords.slice(delimeter + 1, delimeterComma)
      : +coords.slice(delimeter + 1);
  let hit = coords.slice(delimeterComma + 1); // ??? как преобразовать

  return { x, y, hit };
}

// добавление границ
function addOuterLimits(set) {
  for (let item of set.values()) {
    let { x, y } = getXY(item);

    limits.push(`${x}:${y}`);
    limits.push(`${x - 1}:${y}`);
    limits.push(`${x + 1}:${y}`);
    limits.push(`${x}:${y - 1}`);
    limits.push(`${x}:${y + 1}`);

    limits.push(`${x - 1}:${y - 1}`);
    limits.push(`${x + 1}:${y - 1}`);
    limits.push(`${x + 1}:${y + 1}`);
    limits.push(`${x - 1}:${y + 1}`);
  }
}

// отрисовка игрового поля игрока
function render() {
  // корабли
  ships.forEach((deck) => {
    let wounded = null;
    deck.forEach((item) => {
      let { x, y, hit } = getXY(item);

      wounded = hit === "true" ? "wounded" : null;

      document
        .querySelector(`.player tr:nth-child(${y + 1}) td:nth-child(${x + 1})`)
        .classList.add("ship", `${wounded}`);
    });
  });

  // промахи
  computerShots.forEach((attempt) => {
    let { x, y } = getXY(attempt);

    if (
      !document
        .querySelector(`.player tr:nth-child(${y + 1}) td:nth-child(${x + 1})`)
        .classList.contains("wounded")
    ) {
      document
        .querySelector(`.player tr:nth-child(${y + 1}) td:nth-child(${x + 1})`)
        .classList.add("miss");
    }
  });

  // ограничения
  limits.forEach((limit) => {
    let { x, y } = getXY(limit);

    try {
      if (
        !document
          .querySelector(
            `.player tr:nth-child(${y + 1}) td:nth-child(${x + 1})`
          )
          .classList.contains("ship")
      ) {
        document
          .querySelector(
            `.player tr:nth-child(${y + 1}) td:nth-child(${x + 1})`
          )
          .classList.add("limit");
      }
    } catch {
      console.log("Скорее всего вылезли за границы игрового поля");
    }
  });
}

// отрисовка игрового поля компьютера
function renderComputer() {
  // промахи
  for (let shot of playerShots) {
    let { x, y } = getXY(shot);

    document
      .querySelector(`.computer tr:nth-child(${y + 1}) td:nth-child(${x + 1})`)
      .classList.add("miss");
  }
}

// start the Game!
document.querySelector(".btn-start").addEventListener("click", (e) => {
  e.preventDefault(); // ???

  if (confirm("Начать новую игру?")) {
    // перед началом игры проверяем есть ли нарисованные корабли
    if (!ships.length) {
      logs.innerText = "Сперва нарисуйте свои корабли!";
      return;
    }
    // !!!
    //  else if (ships.length !== 10) {
    //   logs.innerText = "Количество кораблей должно быть 10!";
    //   return;
    // }

    game.started = true;

    let firstMove = Math.round(Math.random());
    computerShots.length = 0; // clear previous computer attempts
    playerShots.length = 0; // clear previous player attempts

    // !!! здесь нужна перерисовка render()

    logs.innerText = `Первым стреляет ${players[firstMove]}`;

    if (firstMove) {
      // computer

      computerShot();
    } else {
      // player
    }
  }
});

// Выстрел компьютера
function computerShot() {
  let res;
  let { x, y } = setNewShot();

  //  идем по массиву кораблей -> "заходим" в каждый корабль и проверяем попали или нет
  for (let item of ships) {
    for (let deck of item) {
      // let { shipX, shipY } = getXY(deck); // ??? почему-то не срабатывает
      shipX = +deck.slice(0, deck.indexOf(":"));
      shipY = +deck.slice(deck.indexOf(":") + 1, deck.indexOf(","));
      res = x === shipX && y === shipY;
      // если попали
      if (res) {
        let idx = item.findIndex((el) => el === `${x}:${y},false`);
        item[idx] = `${x}:${y},true`;
        break;
      }
    }

    if (res) {
      break;
    }
  }

  render();

  // если попали в корабль, то стреляем снова
  if (res) {
    computerShot(); // стреляем до тех пор пока не промахнемся
  }
}

// Прицеливание компьютера - определение случайной точки координат
function setNewShot() {
  let { x, y } = getRandomCoordinates();

  if (computerShots.find((item) => item === `${x}:${y}`)) {
    return setNewShot(); // компьютер стреляет еще раз если уже был такой выстрел
  } else {
    computerShots.push(`${x}:${y}`);
  }
  return { x, y };
}

// Выстрел игрока
document.querySelector(".computer").addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.nodeName === "TD") {
    playerShots.push(
      `${e.target.cellIndex}:${+e.target.closest("tr").innerText}`
    );

    renderComputer();

    // если попали по кораблю то стреляем дальше !
    // если промазали, то передаем ход компьютеру

    computerShot();
  }
});

// автоматическая отрисовка кораблей
document.querySelector(".btn-player-auto").addEventListener("click", (e) => {
  e.preventDefault();

  const shipsAmount = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

  for (let i = 0; i < shipsAmount.length; i++) {
    setShipAuto(shipsAmount[i]);
  }
});

function setShipAuto(len) {
  const drawShips = [];
  let direction = 0;
  let amount4 = 0;
  let amount3 = 0;

  // 4
  if (len === 4) {
    while (amount4 === 0) {
      let { x, y } = getRandomCoordinates(); // получили первую точку
      direction = Math.round(Math.random()); // направление (0-горизонтально, 1-вертикально)

      if (x >= 8) {
        if (direction === 0) {
          console.log("нельзя рисовать вправо 4-х палубный");
          direction = 1;
        }
        if (direction === 1) {
          if (y >= 8) {
            console.log("нельзя рисовать вниз 4-х палубный");
            continue;
          } else {
            for (let i = y; i < y + 4; i++) {
              drawShips.push([x, i, false]);
            }
            amount4 = 1;
            // ships.push(drawShips); // !!!!!!!!!!!!!!!! поставить в основной файл
          }
        }
      } else {
        if (direction === 0) {
          for (let i = x; i < x + 4; i++) {
            drawShips.push([i, y, false]);
          }
          amount4 = 1;
        }
        if (direction === 1) {
          if (y >= 8) {
            console.log("нельзя рисовать вниз 4-х палубный");
          } else {
            for (let i = y; i < y + 4; i++) {
              drawShips.push([x, i, false]);
            }
            amount4 = 1;
          }
        }
      }
    }
    // здесь отрисовка должна быть через render() !!!

    let check = checkLimits(drawShips); // проверяем нет ли пересечений (true - есть пересечение, false - нет)
    if (!check) {
      addOuterLimits(drawShips); // добавляем ограничения
      ships.push(drawShips); // добавляем корабль
    } else {
      console.log(
        "нельзя рисовать корабль поверх другого корабля или его границ!"
      );
    }

    render(); // отрисовываем игровое поле
  }

  drawShips.length = 0;
}

// получение случайных координат
function getRandomCoordinates() {
  let x = Math.round(Math.random() * 10) || 1;
  let y = Math.round(Math.random() * 10) || 1;

  return { x, y };
}
