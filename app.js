var results = require("./data.json");

// console.log(result);

function isGameInResult(game, results) {
  let isIn = false;
  let k = 0;
  resultGame = [];
  for (let i = 0; i < results.length; i += 15) {
    for (j = 0; j < 15; j++) {
      resultGame.push(results[i + j]);
    }
    resultGame.sort((a, b) => a - b);
    if (resultGame.toString() === game.toString()) {
      isIn = true;
      k = Math.floor(i / 15) + 3;
      console.log("Combination already drawn! Line - " + k);
      console.log(game);
      console.log(resultGame);
    }
    resultGame = [];
  }
  return isIn;
}

function isInGames(gameDrawn, games) {
  let isInGames = false;
  games.forEach((gam) => {
    for (key in gam) {
      let array1 = gam[key].toString();
      let array2 = gameDrawn.toString();
      if (array1 == array2) {
        isInGames = true;
      }
    }
  });

  return isInGames;
}

function getGame(results, games) {
  let even = 0;
  let odds = 0;
  let isIn = true;
  let game = [];
  while (isIn) {
    even = 0;
    odd = 0;
    game = [];
    for (let i = 1; i <= 15; i++) {
      let flag = false;
      while (!flag) {
        num = Math.floor(Math.random() * 25) + 1;
        if (game == null) {
          game.push(num);
          flag = true;
        } else if (!game.includes(num)) {
          game.push(num);
          flag = true;
        }
      }
    }
    game.sort((a, b) => a - b);
    isIn = isGameInResult(game, results, games);
    if (!isIn) {
      game.forEach((number) => {
        if (number % 2 == 0) {
          even++;
        } else {
          odd++;
        }
      });
      if (even < 5 || odd < 5) {
        isIn = true;
      } else {
        isIn = isInGames(game, games);
      }
    }
  }
  return game;
}

function sortTimes(nTimes) {
  min = nTimes[1];
  max = nTimes[1];
  let sorted = [];
  for (key in nTimes) {
    if (nTimes[key] < min) {
      min = nTimes[key];
    }
    if (nTimes[key] > max) {
      max = nTimes[key];
    }
  }

  for (let i = min; i <= max; i++) {
    for (key in nTimes) {
      if (nTimes[key] == i) {
        object = {};
        object[key] = nTimes[key];
        sorted.push(object);
      }
    }
  }

  return sorted;
}

function mostProb(sorted) {
  mostProb = [];
  for (let i = 0; i < 15; i++) {
    mostProb.push(Number(Object.keys(sorted[i])[0]));
  }
  mostProb.sort((a, b) => a - b);
  return mostProb;
}

/* 
  The code commented below was made to count how many times
  each number appears in the json file. 
*/

let numberOfTimes = {};

for (let i = 1; i <= 25; i++) {
  numberOfTimes[i.toString()] = 0;
}

for (let i = 0; i < results.data.length; i++) {
  numberOfTimes[results.data[i].toString()]++;
}

/*
  The code commented below was made to see if a combination of numbers was already drawn
  where game2 is the game that you want to see the result.
*/

// let game2 = [ 'Your game here, ex: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15' ];
// game2.sort((a, b) => a - b);
// let isIn = isGameInResult(game2, result.data);

let games = [];

let mostProbGame = mostProb(sortTimes(numberOfTimes));

let ngames = 0;
let f = 0;

if (isGameInResult(mostProbGame, results)) {
  ngames = 10;
  f = 1;
  games.push({ "Most Prob Game": mostProbGame });
} else {
  f = 0;
  ngames = 11;
}

for (let i = 1; i < ngames; i++) {
  let game = getGame(results.data, games);
  let newgame = {};
  newgame[`Game ${i + f}`] = game;
  games.push(newgame);
}

console.log(games);
