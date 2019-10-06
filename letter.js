function Letter(charctr) {
	this.charctr = charctr;
	this.guessed = false;
	this.displayLet = function() {
		if (this.charctr === ' ') {
			return ' ';
		} else if (!this.guessed) {
			return '_';
		} else {
			return this.charctr;
		}
	};
	this.check = function(userGuess) {
		if (userGuess === this.charctr) {
			this.guessed = true;
		}
	};
}

module.exports = Letter;
