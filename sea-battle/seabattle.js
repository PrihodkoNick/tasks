// don't forget !!! and ???

const logs = document.querySelector(".logs"); // поле логов
const game = {
  started: false,
  mouseDown: false,
  auto: false,
};

const players = ["player", "computer"]; // игроки
const ships = []; // корабли
const enemies = []; // корабли противника
const limits = new Set(); // ограничения (границы)
const limitsEnemies = new Set(); // ограничения (границы) для кораблей компьютера

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
    if (limits.has(coords)) {
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
function checkLimits(set, who = 0) {
  let exists;
  for (let coords of set.values()) {
    if (who) {
      exists = limitsEnemies.has(coords.slice(0, coords.indexOf(",")));
    } else {
      exists = limits.has(coords.slice(0, coords.indexOf(",")));
    }

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
function addOuterLimits(set, who = 0) {
  if (who) {
    for (let item of set.values()) {
      let { x, y } = getXY(item);

      x === 0 || y === 0 ? "" : limitsEnemies.add(`${x}:${y}`);
      x - 1 === 0 || y === 0 ? "" : limitsEnemies.add(`${x - 1}:${y}`);
      x + 1 === 0 || x + 1 > 10 || y === 0
        ? ""
        : limitsEnemies.add(`${x + 1}:${y}`);
      x === 0 || y - 1 === 0 ? "" : limitsEnemies.add(`${x}:${y - 1}`);
      x === 0 || y + 1 === 0 || y + 1 > 10
        ? ""
        : limitsEnemies.add(`${x}:${y + 1}`);

      x - 1 === 0 || y - 1 === 0 ? "" : limitsEnemies.add(`${x - 1}:${y - 1}`);
      x + 1 === 0 || x + 1 > 10 || y - 1 === 0
        ? ""
        : limitsEnemies.add(`${x + 1}:${y - 1}`);
      x + 1 === 0 || x + 1 > 10 || y + 1 === 0 || y + 1 > 10
        ? ""
        : limitsEnemies.add(`${x + 1}:${y + 1}`);
      x - 1 === 0 || y + 1 === 0 || y + 1 > 10
        ? ""
        : limitsEnemies.add(`${x - 1}:${y + 1}`);
    }
  } else {
    for (let item of set.values()) {
      let { x, y } = getXY(item);

      x === 0 || y === 0 ? "" : limits.add(`${x}:${y}`);
      x - 1 === 0 || y === 0 ? "" : limits.add(`${x - 1}:${y}`);
      x + 1 === 0 || x + 1 > 10 || y === 0 ? "" : limits.add(`${x + 1}:${y}`);
      x === 0 || y - 1 === 0 ? "" : limits.add(`${x}:${y - 1}`);
      x === 0 || y + 1 === 0 || y + 1 > 10 ? "" : limits.add(`${x}:${y + 1}`);

      x - 1 === 0 || y - 1 === 0 ? "" : limits.add(`${x - 1}:${y - 1}`);
      x + 1 === 0 || x + 1 > 10 || y - 1 === 0
        ? ""
        : limits.add(`${x + 1}:${y - 1}`);
      x + 1 === 0 || x + 1 > 10 || y + 1 === 0 || y + 1 > 10
        ? ""
        : limits.add(`${x + 1}:${y + 1}`);
      x - 1 === 0 || y + 1 === 0 || y + 1 > 10
        ? ""
        : limits.add(`${x - 1}:${y + 1}`);
    }
  }
}

// автоматичсекая отрисовка выстрелов вокруг потопленного корабля (who: 0-игрок, 1-компьютер)
function addOuterShots(arr, who = 0) {
  if (who) {
    for (let item of arr) {
      let { x, y } = getXY(item);

      x === 0 || y === 0 ? "" : computerShots.push(`${x}:${y}`);
      x - 1 === 0 || y === 0 ? "" : computerShots.push(`${x - 1}:${y}`);
      x + 1 === 0 || x + 1 > 10 || y === 0
        ? ""
        : computerShots.push(`${x + 1}:${y}`);
      x === 0 || y - 1 === 0 ? "" : computerShots.push(`${x}:${y - 1}`);
      x === 0 || y + 1 === 0 || y + 1 > 10
        ? ""
        : computerShots.push(`${x}:${y + 1}`);

      x - 1 === 0 || y - 1 === 0 ? "" : computerShots.push(`${x - 1}:${y - 1}`);
      x + 1 === 0 || x + 1 > 10 || y - 1 === 0
        ? ""
        : computerShots.push(`${x + 1}:${y - 1}`);
      x + 1 === 0 || x + 1 > 10 || y + 1 === 0 || y + 1 > 10
        ? ""
        : computerShots.push(`${x + 1}:${y + 1}`);
      x - 1 === 0 || y + 1 === 0 || y + 1 > 10
        ? ""
        : computerShots.push(`${x - 1}:${y + 1}`);
    }
  } else {
    for (let item of arr) {
      let { x, y } = getXY(item);

      x === 0 || y === 0 ? "" : playerShots.push(`${x}:${y}`);
      x - 1 === 0 || y === 0 ? "" : playerShots.push(`${x - 1}:${y}`);
      x + 1 === 0 || x + 1 > 10 || y === 0
        ? ""
        : playerShots.push(`${x + 1}:${y}`);
      x === 0 || y - 1 === 0 ? "" : playerShots.push(`${x}:${y - 1}`);
      x === 0 || y + 1 === 0 || y + 1 > 10
        ? ""
        : playerShots.push(`${x}:${y + 1}`);

      x - 1 === 0 || y - 1 === 0 ? "" : playerShots.push(`${x - 1}:${y - 1}`);
      x + 1 === 0 || x + 1 > 10 || y - 1 === 0
        ? ""
        : playerShots.push(`${x + 1}:${y - 1}`);
      x + 1 === 0 || x + 1 > 10 || y + 1 === 0 || y + 1 > 10
        ? ""
        : playerShots.push(`${x + 1}:${y + 1}`);
      x - 1 === 0 || y + 1 === 0 || y + 1 > 10
        ? ""
        : playerShots.push(`${x - 1}:${y + 1}`);
    }
  }
}

// отрисовка игрового поля игрока
function render() {
  // корабли
  ships.forEach((deck) => {
    deck.forEach((item) => {
      let { x, y, hit } = getXY(item);
      let cell = document.querySelector(
        `.player tr:nth-child(${y + 1}) td:nth-child(${x + 1})`
      );

      if (hit === "true") {
        cell.classList.add("ship", "wounded");
      } else {
        cell.classList.add("ship");
      }
    });
  });

  // промахи
  computerShots.forEach((attempt) => {
    let { x, y } = getXY(attempt);
    let cell = document.querySelector(
      `.player tr:nth-child(${y + 1}) td:nth-child(${x + 1})`
    );

    if (!cell.classList.contains("wounded")) {
      cell.classList.add("miss");
    }
  });

  // ограничения
  limits.forEach((limit) => {
    let { x, y } = getXY(limit);
    let cell = document.querySelector(
      `.player tr:nth-child(${y + 1}) td:nth-child(${x + 1})`
    );

    try {
      if (!cell.classList.contains("ship")) {
        cell.classList.add("limit");
      }
    } catch {
      console.log("Скорее всего вылезли за границы игрового поля");
    }
  });
}

// отрисовка игрового поля компьютера
function renderComputer() {
  // корабли
  enemies.forEach((deck) => {
    deck.forEach((item) => {
      let { x, y, hit } = getXY(item);
      let cell = document.querySelector(
        `.computer tr:nth-child(${y + 1}) td:nth-child(${x + 1})`
      );

      // ??? как преобразовать строку "true" в булевское true
      if (hit === "true") {
        cell.classList.add("ship", "hide", "wounded");
      } else {
        cell.classList.add("ship", "hide");
      }

      if (cell.classList.contains("wounded")) {
        cell.classList.remove("hide");
      }
    });
  });

  // промахи
  for (let shot of playerShots) {
    let { x, y } = getXY(shot);
    let cell = document.querySelector(
      `.computer tr:nth-child(${y + 1}) td:nth-child(${x + 1})`
    );

    if (!cell.classList.contains("wounded")) {
      cell.classList.add("miss");
    }
  }

  // ограничения границы
  limitsEnemies.forEach((limit) => {
    let { x, y } = getXY(limit);
    let cell = document.querySelector(
      `.computer tr:nth-child(${y + 1}) td:nth-child(${x + 1})`
    );

    try {
      if (!cell.classList.contains("ship")) {
        cell.classList.add("limit", "hide");
      }
    } catch {
      console.log("Скорее всего вылезли за границы игрового поля");
    }
  });
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
    logs.innerText = `Первым стреляет ${players[firstMove]}`;

    if (firstMove) {
      computerShot();
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
        // смотрим потопили ли корабль и автоматически выставляем вокруг него выстрелы
        setShots(item, 1);
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
    if (!game.started) {
      console.log("начните игру!");
      return;
    }

    let res;
    const coords = getCoords(e);
    let x = +coords.slice(0, coords.indexOf(":"));
    let y = +coords.slice(coords.indexOf(":") + 1);

    let exists = playerShots.find((shot) => shot === coords);
    if (exists) {
      console.log("э-э-э-э-э-э! ты уже стрелял сюда! попробуй еще!");
      return;
    }

    playerShots.push(coords);

    //  идем по массиву кораблей -> "заходим" в каждый корабль и проверяем попали или нет
    for (let item of enemies) {
      for (let deck of item) {
        // let { shipX, shipY } = getXY(deck); // ??? почему-то не срабатывает
        shipX = +deck.slice(0, deck.indexOf(":"));
        shipY = +deck.slice(deck.indexOf(":") + 1, deck.indexOf(","));
        res = x === shipX && y === shipY;
        // если попали
        if (res) {
          let idx = item.findIndex((el) => el === `${x}:${y},false`);
          item[idx] = `${x}:${y},true`;
          // смотрим потопили ли корабль и автоматически выставляем вокруг него выстрелы
          setShots(item);
          break;
        }
      }

      if (res) {
        break;
      }
    }

    renderComputer();

    // если попали по кораблю то стреляем дальше !
    if (res) {
      return;
    }

    computerShot();
  }
});

//
function setShots(ship, who = 0) {
  let decks = 0; // сколько осталось неподбитых палуб

  for (let deck of ship) {
    deck.includes("false") ? decks++ : "";
  }

  // если неподбитых палуб не осталось, значит корабль потоплен
  if (!decks) {
    addOuterShots(ship, who);
    console.log(`потопили ${ship.length}-палубный корабль!`);
  }
}

// -- AUTO ---------------------------------------------------------------------
// автоматическая отрисовка кораблей
document.querySelector(".btn-player-auto").addEventListener("click", (e) => {
  e.preventDefault();

  if (game.started) {
    console.log("игра уже началась!");
    return;
  }

  if (game.auto) {
    console.log("уже расставили корабли автоматически");
    return;
  }

  const shipsAmount = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

  // отрисовываем корабли игрока
  for (let i = 0; i < shipsAmount.length; i++) {
    setShipAuto(shipsAmount[i]);
  }

  //  отрисовываем корабли компьютера
  for (let i = 0; i < shipsAmount.length; i++) {
    setShipAuto(shipsAmount[i], 1);
  }

  game.auto = true;
});

function setShipAuto(len, who = 0) {
  const drawShips = new Set();
  let direction = 0;
  let amount4 = 0;
  let amount3 = 0;
  let amount2 = 0;
  let amount1 = 0;

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
              drawShips.add(`${x}:${i},false`);
            }
            amount4 = 1;
          }
        }
      } else {
        if (direction === 0) {
          for (let i = x; i < x + 4; i++) {
            drawShips.add(`${x}:${i},false`);
          }
          amount4 = 1;
        }
        if (direction === 1) {
          if (y >= 8) {
            console.log("нельзя рисовать вниз 4-х палубный");
          } else {
            for (let i = y; i < y + 4; i++) {
              drawShips.add(`${x}:${i},false`);
            }
            amount4 = 1;
          }
        }
      }
    }

    let check;
    who
      ? (check = checkLimits(drawShips, 1))
      : (check = checkLimits(drawShips)); // проверяем нет ли пересечений (true - есть пересечение, false - нет)
    if (!check) {
      if (who) {
        addOuterLimits(drawShips, 1); // добавляем ограничения
        enemies.push(Array.from(drawShips)); // добавляем корабль
      } else {
        addOuterLimits(drawShips); // добавляем ограничения
        ships.push(Array.from(drawShips)); // добавляем корабль
      }
    } else {
      console.log(
        "нельзя рисовать корабль поверх другого корабля или его границ!"
      );
    }

    who ? renderComputer() : render(); // отрисовываем игровое поле
  }

  drawShips.clear();

  // 3
  if (len === 3) {
    while (amount3 === 0) {
      let { x, y } = getRandomCoordinates(); // получили первую точку
      direction = Math.round(Math.random()); // направление (0-горизонтально, 1-вертикально)

      if (x >= 9) {
        if (direction === 0) {
          console.log("нельзя рисовать вправо 3-х палубный");
          direction = 1;
        }
        if (direction === 1) {
          if (y >= 9) {
            console.log("нельзя рисовать вниз 3-х палубный");
            continue;
          } else {
            for (let i = y; i < y + 3; i++) {
              drawShips.add(`${x}:${i},false`);
            }

            amount3 = 1;
          }
        }
      } else {
        if (direction === 0) {
          for (let i = x; i < x + 3; i++) {
            drawShips.add(`${x}:${i},false`);
          }
          amount3 = 1;
        }
        if (direction === 1) {
          if (y >= 9) {
            console.log("нельзя рисовать вниз 3-х палубный");
          } else {
            for (let i = y; i < y + 3; i++) {
              drawShips.add(`${x}:${i},false`);
            }
            amount3 = 1;
          }
        }
      }
    }

    let check;
    who
      ? (check = checkLimits(drawShips, 1))
      : (check = checkLimits(drawShips)); // проверяем нет ли пересечений (true - есть пересечение, false - нет)
    if (!check) {
      if (who) {
        addOuterLimits(drawShips, 1); // добавляем ограничения
        enemies.push(Array.from(drawShips)); // добавляем корабль
      } else {
        addOuterLimits(drawShips); // добавляем ограничения
        ships.push(Array.from(drawShips)); // добавляем корабли
      }
    } else {
      console.log(
        "нельзя рисовать корабль поверх другого корабля или его границ!"
      );
      who ? setShipAuto(3, 1) : setShipAuto(3); // ??? возможна ли здесь ошибка... не нарисует он в очередной раз три 3-х палубника ???
    }

    who ? renderComputer() : render(); // отрисовываем игровое поле
  }

  drawShips.clear();

  // 2
  if (len === 2) {
    while (amount2 === 0) {
      let { x, y } = getRandomCoordinates(); // получили первую точку
      direction = Math.round(Math.random()); // направление (0-горизонтально, 1-вертикально)

      if (x >= 10) {
        if (direction === 0) {
          console.log("нельзя рисовать вправо 2-х палубный");
          direction = 1;
        }
        if (direction === 1) {
          if (y >= 10) {
            console.log("нельзя рисовать вниз 2-х палубный");
            continue;
          } else {
            for (let i = y; i < y + 2; i++) {
              drawShips.add(`${x}:${i},false`);
            }
            amount2 = 1;
          }
        }
      } else {
        if (direction === 0) {
          for (let i = x; i < x + 2; i++) {
            drawShips.add(`${x}:${i},false`);
          }
          amount2 = 1;
        }
        if (direction === 1) {
          if (y >= 10) {
            console.log("нельзя рисовать вниз 2-х палубный");
          } else {
            for (let i = y; i < y + 2; i++) {
              drawShips.add(`${x}:${i},false`);
            }
            amount2 = 1;
          }
        }
      }
    }

    let check;
    who
      ? (check = checkLimits(drawShips, 1))
      : (check = checkLimits(drawShips)); // проверяем нет ли пересечений (true - есть пересечение, false - нет)
    if (!check) {
      if (who) {
        addOuterLimits(drawShips, 1); // добавляем ограничения
        enemies.push(Array.from(drawShips)); // добавляем корабль
      } else {
        addOuterLimits(drawShips); // добавляем ограничения
        ships.push(Array.from(drawShips)); // добавляем корабли
      }
    } else {
      console.log(
        "нельзя рисовать корабль поверх другого корабля или его границ!"
      );
      who ? setShipAuto(2, 1) : setShipAuto(2); // ??? возможна ли здесь ошибка... не нарисует он в очередной раз три 3-х палубника ???
    }

    who ? renderComputer() : render(); // отрисовываем игровое поле
  }

  drawShips.clear();

  // 1
  if (len === 1) {
    while (amount1 === 0) {
      let { x, y } = getRandomCoordinates(); // получили первую точку
      direction = Math.round(Math.random()); // направление (0-горизонтально, 1-вертикально)

      drawShips.add(`${x}:${y},false`);
      amount1 = 1;
    }

    let check;
    who
      ? (check = checkLimits(drawShips, 1))
      : (check = checkLimits(drawShips)); // проверяем нет ли пересечений (true - есть пересечение, false - нет)
    if (!check) {
      if (who) {
        addOuterLimits(drawShips, 1); // добавляем ограничения
        enemies.push(Array.from(drawShips)); // добавляем корабль
      } else {
        addOuterLimits(drawShips); // добавляем ограничения
        ships.push(Array.from(drawShips)); // добавляем корабли
      }
    } else {
      console.log(
        "нельзя рисовать корабль поверх другого корабля или его границ!"
      );
      who ? setShipAuto(1, 1) : setShipAuto(1); // ??? возможна ли здесь ошибка... не нарисует он в очередной раз три 3-х палубника ???
    }

    who ? renderComputer() : render(); // отрисовываем игровое поле
  }
}

// получение случайных координат
function getRandomCoordinates() {
  let x = Math.round(Math.random() * 10) || 1;
  let y = Math.round(Math.random() * 10) || 1;

  return { x, y };
}
