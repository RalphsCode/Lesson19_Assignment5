console.log('JS is running.')

let score = 0
let guesses = []
gameTimer()

// Create an event listener for the submit guess button on the game page
const guessForm = document.getElementById("guessForm");
guessForm.addEventListener("submit", processForm);

// Create an event listener for the Reset High Score button on the game page
const resetScore = document.getElementById("resetHighScore");
resetScore.addEventListener("click", resetHighScore);

// Set the initial High Score mark on the game page
const legacyHighScore = document.getElementById("highScore");
const currentHighScore = localStorage.getItem('highScore')
if (currentHighScore) {
    legacyHighScore.innerHTML = currentHighScore
} else {
    legacyHighScore.innerHTML = '0'
}

// Reset the High Score
function resetHighScore(event) {
    /* Resets the High Score when the button is clicked */
    localStorage.setItem('highScore', 0);
    console.log('High Score has been RESET to 0');
    $('#highScore').text(0)
}


function processForm(event) {
    /* Get the user's guess from the input box on the game page.
    Send the guess to be checked by processForm() 
    Reset the input box.*/
    event.preventDefault();
    // use jQuery to get the input value, and strip any spaces
    const guessValue = $('#guess').val().toLowerCase().trim(); 
    // Clear the input, and make focus
    $('#guess').val('').focus()
    // Send the guess to get checked
    checkGuess(guessValue);
  }   // END processForm()
  

async function checkGuess(guess) {
    /* Send the user's guess to the server / Python to be verified
    Based on the validity of the guess, display the result on the game page */
    const resp = await axios.get("/process_guess", { params: { guess: guess }});
    if (resp.data['result'] == 'ok'){
        // Check if the guess was already found
        const guessIndex = guesses.indexOf(guess);
        if (guessIndex != -1) {
            outputText = $('<li> Repeat! - "' + guess + '" was already found.' + '</li>')
        } else {
        outputText = $('<li> NICE! "' + guess + '" is a word, and is on the board!' + ' +' + guess.length + '</li>');
        // a valid word was found, and the score is updated
        score = score + guess.length
        guesses.push(guess)
        }  // END if...
    } else if (resp.data['result'] == 'not-word'){
        outputText = $('<li>"' + guess + '" is not a word that I know!' + '</li>');
    } else {
        outputText = $('<li> OOops! "' + guess + '" is indeed a word, but I cannot find it on the board!' + '</li>');
    }  // END if...

    // Send the score to be checked with the highScore 
    let topScore = highScore(score)

    // Update the DOM / game page
    $('#score').text(score)
    $('#highScore').text(topScore)
    // add the result of checking the user's guess
    $('li:first').before(outputText); 
}   // END checkGuess()


function highScore(score) {
    /* Check how the score compares to the high score.
    If the current score is higher: set it as the highscore
    and update the localStorage highScore variable. */
    let bestScore = localStorage.getItem('highScore')
    if (bestScore === null || score > bestScore) {
        localStorage.setItem('highScore', score)
        return score
    } else { 
        return bestScore 
    }
} // END highScore()


function gameTimer() {
    /* Sets a game timer, that once expired removes the submit
    button from the game page. */
    let seconds = 60;
    const timerElement = document.getElementById("timer"); 
    
    const intervalId = setInterval(() => {
        seconds--;
        timerElement.textContent = `${seconds} seconds remaining`;
        if (seconds === 0) {
        clearInterval(intervalId);
        timerElement.textContent = "Time's up!";
        // When time's up, remove the enter guess form
        const removeGuessForm = document.getElementById("guessForm");
        removeGuessForm.remove();
        // When time's up, send the highScore to the server
        const resp = axios.post('/high_score', JSON.parse(localStorage.getItem('highScore')), {headers: { 'Content-Type': 'application/json' }})
        console.log('high_score sent to server. Response:', resp.data)
        }
    }, 1000); // Call the function every second
}  // END gameTimer()