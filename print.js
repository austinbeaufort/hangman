const { input } = require('console-input')

print = {
    welcome: () => {
        console.log('*************************************')
        console.log('Welcome To Hangman!')
        console.log('*************************************')
    },

    gameWon: word => {
        console.log('\n*************************************')
        console.log(`The word is ${word}`)
        console.log('Correct, you win!!')
        console.log('*************************************')
        process.exit(0)
    },

    gameLost: word => {
        console.log('sorry, you lost')
        console.log(`The correct answer was: ${word}`)
    },

    getNextGuess: (counter, answerString) => {
        console.log(`Incorrect guesses: ${counter}`)
        console.log('\nWord to guess: ', answerString)
        const currentGuess = input('\n Guess a letter or the word: ')
        return currentGuess
    },

    alreadyGuessed: currentGuess => console.log(`Already guessed ${currentGuess}`),
}

module.exports = print