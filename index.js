const word = require('./words')
const doesNotInclude = require('./helpers')

const { range } = require('home-on-the-range')
const { map, join, not, pipe, split, inc, equals, without, complement, includes } = require('ramda')
const { input } = require('console-input')

function main() {
    console.log('*************************************')
    console.log('Welcome To Hangman!')
    console.log('*************************************')
    runGameLogic()
}


const getBlank = () => '_'
const makeBlanks = arrayOfChars => map(getBlank, arrayOfChars)
const makeAnswerString = pipe(split(''), makeBlanks, join(' '))




function getAlphabet() {
    const integers = range(97, 122)
    const alphabet = map(String.fromCharCode, integers)
    return alphabet
}


function runGameLogic() {
    let counter = 0
    let alphabet = getAlphabet()
    let answerString = makeAnswerString(word)

    while(true) {
        drawHangman(counter)
        console.log(`Incorrect guesses: ${counter}`)
        console.log('\nWord to guess: ', answerString)
        const currentGuess = input('\n Guess a letter or the word: ')

        const winningGuess = equals(currentGuess, word)
        const isWord = currentGuess.length > 1

        if (winningGuess) {
            gameWon()
        }
    
        if (not(winningGuess) && isWord) {
            counter = inc(counter)
            continue
        }

        if (doesNotInclude(currentGuess, alphabet)) {
            console.log(`Already guessed ${currentGuess}`)
            continue
        }
        alphabet = without(currentGuess, alphabet)
        const match = checkMatch(word, currentGuess)

        if (match) {
            answerString = updateAnswerString(currentGuess, word, answerString)
            continue
        }
        counter = inc(counter)
        if (counter > 5) {
            drawHangman(counter)
            console.log('sorry, you lost')
            console.log(`The correct answer was: ${word}`)
            process.exit(0)
        }
    }
}

function updateAnswerString(currentGuess, word, answerString) {
    const wordCharArray = split('', word)
    const answerCharArray = split(' ', answerString)

    const newAnswerArray = wordCharArray.map((wordChar, index) => {
        const answerChar = answerCharArray[index]

        const newChar = 
            equals(currentGuess, wordChar) ? wordChar :
            not(equals(answerChar, '_'))   ? answerChar : '_'
        return newChar
    })
    const allLettersGuessed = doesNotInclude('_', newAnswerArray)
    if (allLettersGuessed) {
        gameWon()
    }
    const newAnswerString = newAnswerArray.join(' ')
    return newAnswerString
}

function gameWon() {
    console.log('\n*************************************')
    console.log('Correct, you win!!')
    console.log('*************************************')
    process.exit(0)
}



function checkMatch(word, guess) {
    const charArray = split('', word)
    const match = charArray.some(char => guess === char)
    return match
}

function drawHangman(counter) {
    switch(counter) {
        case 0:
            makeInitialPost()
            break
        case 1:
            drawHead()
            break
        case 2:
            drawTorso()
            break
        case 3:
            drawRightArm()
            break
        case 4:
            drawLeftArm()
            break
        case 5:
            drawRightLeg()
            break
        case 6:
            drawLeftLeg()
            break
    }

}

function makeInitialPost() {
    console.log(
        `
         _____
        |     |
              |
              |
              |
              |
        =========`
            )
}

function drawHead() {
    console.log(
        `
         _____
        |     |
        O     |
              |
              |
              |
        =========`
            )
}

function drawTorso() {
    console.log(
        `
         _____
        |     |
        O     |
        |     |
        |     |
              |
        =========`
            )
}

function drawRightArm() {
    console.log(
        `
         _____
        |     |
        O     |
        |/    |
        |     |
              |
        =========`
            )
}

function drawLeftArm() {
    console.log(
        `
         _____
        |     |
        O     |
       \\|/    |
        |     |
              |
        =========`
            )
}

function drawRightLeg() {
    console.log(
        `
         _____
        |     |
        O     |
       \\|/    |
        |     |
         \\    |
        =========`
            )
}

function drawLeftLeg() {
    console.log(
        `
         _____
        |     |
        O     |
       \\|/    |
        |     |
       / \\    |
              |
        =========`
            )
}


main()