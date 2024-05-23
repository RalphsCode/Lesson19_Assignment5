console.log('JS is running.')

// import axios from 'axios';
// const fs = require('fs');

const form = document.getElementById("guessForm");
form.addEventListener("submit", processForm);


function processForm(event) {
    event.preventDefault();
    const guessValue = $('#guess').val(); // using jQuery to get the input value
    // Clear the input, and make focus
    $('#guess').val('').focus()
    checkGuess(guessValue);
  }
  

// async function checkGuessAxios(guess) {
//     console.log('checkGuess is running, will look for:', guess)
//     apiLookUp = await axios.get('words.txt')
//         // Process the fetched data
//         words = apiLookUp.data; 
//         if (words) {
//             console.log('words has been loaded.')
//             // Search for the argument within the entries
//             const foundEntry = words.find(entry => entry.includes(guess));
//             if (foundEntry) {
//                 console.log(guess, 'has been found!')
//         } else {
//             console.log('words have not been loaded.')
//             }
//         } // End if
// }  // End function

let score = 0
async function checkGuess(guess) {
    
    /* I need to take the guess, and send it back to the server/Python
    and see if it is in the words file. Then return a message to
    the frontend/JS, to display. */
    const resp = await axios.get("/process_guess", { params: { guess: guess }});
    
    if (resp.data['result'] == 'ok'){
        outputText = $('<li> NICE! "' + guess + '" is a word, and is on the board!' + '</li>');
        score = score + guess.length
    } else if (resp.data['result'] == 'not-word'){
        outputText = $('<li>"' + guess + '" is not a word that I know!' + '</li>');
    } else {
        outputText = $('<li> OOops! "' + guess + '" is indeed a word, but I cannot find it on the board!' + '</li>');
    }

    // Add the outputText to the DOM
    $('#score').text(score)
    $('li:first').before(outputText); 

}   
