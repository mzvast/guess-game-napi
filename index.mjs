// create a cli game of 2 players guess a number between 1-100, who guesses closer wins
import readline from 'readline';
import chalk from 'chalk';
import {getRandomNumberRange} from './guess-napi/index.js';

// game loop
// create game
const game = {
    // create a random number
    randomNumber: void 0, // this will obtain from rust side
};
// create 2 players
const player1 = {
    name: 'Player 1',
    guess: void 0,
    score: 0,
};
const player2 = {
    name: 'Player 2',
    guess: void 0,
    score: 0,
};

(async function () {
    while (true) {
        game.randomNumber = getRandomNumberRange(1, 100);
        // accept player 1's guess from terminal, use readline
        await askInputNumber(player1);
        // accept player 2's guess from terminal, use readline
        await askInputNumber(player2);

        // the closer wins
        const diff1 = Math.abs(game.randomNumber - player1.guess);
        const diff2 = Math.abs(game.randomNumber - player2.guess);

        // print the secret number
        console.log(`The secret number is: ${game.randomNumber}`);
        if (diff1 < diff2) {
            console.log(`${player1.name} wins!`);
            player1.score++;
        } else if (diff1 > diff2) {
            console.log(`${player2.name} wins!`);
            player2.score++;
        } else {
            console.log("It's a tie!");
        }

        printScore(player1, player2);

        // ask player if they want to play again
        const ans = (await askInputString()) || 'y';
        if (ans !== 'y') {
            break;
        }
    }
})();

function askInputNumber(player) {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question(`${player.name} enter your guess: `, (answer) => {
            player.guess = answer;
            rl.close();
            resolve();
        });
    });
}

function askInputString() {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question(`if you want play again (y/n) `, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

function printScore(player1, player2) {
    // print player's score in colored text
    // who's score higher use green color,else use red color
    console.log(
        `${player1.name} score: ${
            player1.score > player2.score
                ? chalk.green(player1.score)
                : chalk.red(player1.score)
        }`
    );
    console.log(
        `${player2.name} score: ${
            player2.score > player1.score
                ? chalk.green(player2.score)
                : chalk.red(player2.score)
        }`
    );
}
