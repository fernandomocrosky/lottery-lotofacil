var result = require("./dados.json");

// console.log(result);

function isGameInResult(game, results) {
    let isIn = false;
    let k = 0;
    resultGame = [];
    for (let i = 0; i < results.length - 14; i++) {
        for(j = 0; j < 15; j++) {
            resultGame.push(results[i + j]);
        }
        resultGame.sort((a, b) => a - b);
        if(resultGame.toString() === game.toString()) {
            isIn = true;
            k = Math.floor((i / 15)) + 3;
            console.log(k + " Jogo - " + game);
        }
        resultGame = [];
    }
    return isIn;
}

function getGame(results) {
    let isIn = true;
    let game = [18,	20,	25,	23,	10,	11,	24,	14,	6,	2,	13,	9,	5,	16,	3];
    while(isIn) {
        game = [];
        for (let i = 1; i <= 15; i++) {
            let flag = false;
            while(!flag) {
                num = Math.floor(Math.random() * 25) + 1;
                if(game == null) {
                    game.push(num);
                    flag = true;
                } else if(!game.includes(num)) {
                    game.push(num);
                    flag = true;
                }
            }
        }
        game.sort((a, b) => a - b);
        isIn = isGameInResult(game, results);
        if(!isIn) {
            console.log("Combinação ainda não sorteada");
        }
    }
    return game;
}

numberOfTimes = {};

for(let i = 1; i <= 25; i++) {
    numberOfTimes[i.toString()] = 0;
}

for(let i = 0; i < result.data.length; i++) {
    numberOfTimes[result.data[i].toString()]++;
}

let game = getGame(result.data);
console.log(game);

// let isIn = isGameInResult(game, result.data);
