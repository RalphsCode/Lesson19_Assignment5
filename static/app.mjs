console.log('JS is running.')

import axios from 'axios';
// const fs = require('fs');

const form = document.getElementById("guessForm");
form.addEventListener("submit", processForm);


function processForm(event) {
    event.preventDefault(); // Prevent default form submission behavior
    const guessInput = document.getElementById("guess");
    const guessValue = guessInput.value;
    // Call your function with the form entry value as an argument
    checkGuess(guessValue);
  }
  
  
async function checkGuess(guess) {
    console.log('checkGuess is running, will look for:', guess)
    apiLookUp = await axios.get('../words.txt')
        // Process the fetched data
        words = apiLookUp.data; 
        if (words) {
            console.log('words has been loaded.')
            // Search for the argument within the entries
            const foundEntry = words.find(entry => entry.includes(guess));
            if (foundEntry) {
                console.log(guess, 'has been found!')
        } else {
            console.log('words have not been loaded.')
            }
        } // End if
}  // End function