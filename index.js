var Word = require('./word');
var inquirer = require('inquirer');
var colors = require('colors');

// Set colour scheme for Inquirer prompts and alerts
colors.setTheme({
	message: 'brightCyan',
	pick: 'brightMagenta',
	verbiage: 'green',
	instructions: 'cyan',
	warn: 'yellow',
	guessesLeft: 'blue',
	lose: 'red',
	youWin: 'blue',
	winWord: 'brightGreen'
});

// creat random word Array
wordList = [ 'KLF', 'KLF', 'BEETHOVEN' ];
var select = 0;
var chosenWord = '';
var gameWord = '';
var counter = 0;

//derive a word from the array, and use the word constructor for the program logic
function startGame() {
	if (wordList.length < 2) {
		wordList = [ 'KLF', 'KLF', 'BEETHOVEN' ];
	}
	select = Math.floor(Math.random() * wordList.length);
	chosenWord = wordList[select];
	gameWord = new Word(chosenWord);
	gameWord.makeWord();
	if (select > -1) {
		wordList.splice(select, 1);
	}
	console.log('\nGuess a famous musical artist. You get eight tries.\n'.verbiage);
	promptUser();
}

//handle user input and restarts the game if player loses
function promptUser() {
	if (counter < 8) {
		console.log(gameWord.showWord());
		inquirer
			.prompt([
				{
					type: 'input',
					name: 'letter',
					message: '\nPick a letter and press enter. '.pick
				}
			])
			.then(function(data) {
				checkAnswer(data);
			});
	} else {
		console.log("\nSorry, you're out of guesses.\n".lose);
		console.log(chosenWord.random);
		chosenWord = '';
		gameWord = '';
		select = 0;
		counter = 0;
		startGame();
	}
}
// convert guessed letters to uppercase and checks guessed letters against the word from the array
function checkAnswer(data) {
	if (data.letter.length === 1 && /^[a-zA-Z]+$/.test(data.letter)) {
		var checkable = data.letter.toUpperCase();
		var temp = gameWord.showWord();
		gameWord.checkGuess(checkable);
		if (temp === gameWord.showWord()) {
			console.log('\nSorry, wrong letter!\n'.warn);
			counter++;
			console.log((8 - counter + ' guesses remaining').guessesLeft);
			promptUser();
		} else {
			rightGuess();
		}
	} else {
		console.log('\nPlease enter a letter, one at a time.\n'.instructions);
		promptUser();
	}
}

// handle correctly guessed letters and restart game
function rightGuess() {
	console.log('\nYou guessed correctly.\n'.message);
	if (chosenWord.replace(/ /g, '') == gameWord.showWord().replace(/ /g, '')) {
		console.log(gameWord.showWord().winWord);
		console.log('\nYou win!!\n'.youWin);
		chosenWord = '';
		gameWord = '';
		select = 0;
		counter = 0;
		startGame();
	} else {
		promptUser();
	}
}

startGame();
