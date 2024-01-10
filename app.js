var result = require("./data.json");

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

function getGame(results) {
  let isIn = true;
  let game = [];
  while (isIn) {
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
    isIn = isGameInResult(game, results);
    if (!isIn) {
      console.log("Combination not yet drawn!");
    }
  }
  return game;
}

/* 
  The code commented below was made to count how many times
  each number appears in the json file. 
*/

// numberOfTimes = {};

// for(let i = 1; i <= 25; i++) {
//     numberOfTimes[i.toString()] = 0;
// }

// for(let i = 0; i < result.data.length; i++) {
//     numberOfTimes[result.data[i].toString()]++;
// }

/*
  The code commented below was made to see if a combination of numbers was already drawn
  where game2 is the game that you want to see the result.
*/

// let game2 = [ 'Your game here, ex: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15' ];
// game2.sort((a, b) => a - b);
// let isIn = isGameInResult(game2, result.data);

let game = getGame(result.data);
console.log(game);
