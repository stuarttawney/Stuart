// Array to hold the presidents name all in lowercase
var wordsList = ["carter", "clinton", "bush", "lincoln", "obama", "trump",
  "reagan", "roosevelt", "johnson", "kennedy", "nixon", "eisenhower"];
// answerswill be held in this araea.
var chosenWord = "";
// this will put the answer into letters to be stored into an array.
var lettersInChosenWord = [];
// number of blanksdisplayed based on answer
var numBlanks = 0;
// hold mix of blanks and answerd.
var blanksAndSuccesses = [];
// holds the wrong guesss
var wrongGuesses = [];

// Game counters
var winCounter = 0;
var lossCounter = 0;
var numGuesses = 9;


function startGame() {
  // Reset the guesses back to 0.
  numGuesses = 9;

  // answer is random
  chosenWord = wordsList[Math.floor(Math.random() * wordsList.length)];
  // break into individual letters
  lettersInChosenWord = chosenWord.split("");
  // we count the number of the letters in the name.
  numBlanks = lettersInChosenWord.length;


  console.log(chosenWord);

  //reste each round
  blanksAndSuccesses = [];
  // reset wrong guesses from the previous round
  wrongGuesses = [];

  
  for (var i = 0; i < numBlanks; i++) {
    blanksAndSuccesses.push("_");
  }

  // initial blanks go to the console
  console.log(blanksAndSuccesses);


  // reprints guessesLeft to 9
  document.getElementById("guesses-left").innerHTML = numGuesses;

  // prints the blanks at the beginning of each round
  document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");

  // clears the wrong guesses from the previous round
  document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");
}

// this is where we do all the comparisons its not being called right now but 
// its for future
function checkLetters(letter) {

  // just in case the user puts a number
  var letterInWord = false;

  // to see if the letter is even in the array
  for (var i = 0; i < numBlanks; i++) {
    if (chosenWord[i] === letter) {
      // if it does exist than go on
      letterInWord = true;
    }
  }

  // if it does exist this will tell where exactly that it does
  if (letterInWord) {

    // loop through the word.
    for (var j = 0; j < numBlanks; j++) {

      // populate the blanksAndSuccesses with every instance of the letter.
      if (chosenWord[j] === letter) {
        // here we set the specific space in blanks and letter equal to the letter when there is a match.
        blanksAndSuccesses[j] = letter;
      }
    }
    // log for testing.
    console.log(blanksAndSuccesses);
  }
  // if the letter doesnt exist at all
  else {
    // ..then we add the letter to the list of wrong letters, and we subtract one of the guesses.
    wrongGuesses.push(letter);
    numGuesses--;
  }
}

//function that runs after each guess is made
function roundComplete() {

  // initial update to tell us how many wins losses and guesses are left
  console.log("WinCount: " + winCounter + " | LossCount: " + lossCounter + " | NumGuesses: " + numGuesses);

  
  document.getElementById("guesses-left").innerHTML = numGuesses;
  
  document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");
  
  document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");

  
  if (lettersInChosenWord.toString() === blanksAndSuccesses.toString()) {
    
    winCounter++;
    alert("You win!");

    
    document.getElementById("win-counter").innerHTML = winCounter;
    startGame();
  }

  // if we've run out of guesses..
  else if (numGuesses === 0) {
    // add to the loss counter.
    lossCounter++;
  
    alert("You lose");

    
    document.getElementById("loss-counter").innerHTML = lossCounter;
    // restart the game.
    startGame();
  }

}


startGame();

// key event
document.onkeyup = function(event) {
  // turns all clicks to lower case letters
  var letterGuessed = String.fromCharCode(event.which).toLowerCase();
  // runs code to check for correctness
  checkLetters(letterGuessed);
  // runs code after each round is done
  roundComplete();
};
