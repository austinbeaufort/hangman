const { range } = require('home-on-the-range')
const { map, join, not, pipe, split, inc, equals, without, complement, includes } = require('ramda')
const randomWords = require('random-words')


const drawHangman = require('./drawHangman')
const print = require('./print')

function main() {
    print.welcome()
    runGameLogic()
}


const getBlank = () => '_'
const makeBlanks = arrayOfChars => map(getBlank, arrayOfChars)
const makeAnswerString = pipe(split(''), makeBlanks, join(' '))
const doesNotInclude = complement(includes)



function runGameLogic() {
    const word = randomWords()
    let counter = 0
    let alphabet = getAlphabet()
    let answerString = makeAnswerString(word)

    while(true) {
        drawHangman(counter)
        currentGuess = print.getNextGuess(counter, answerString)

        const winningGuess = equals(currentGuess, word)
        const guessIsWord = currentGuess.length > 1

        checkForWin(winningGuess, word)
    
        if (not(winningGuess) && guessIsWord) {
            counter = inc(counter)
            continue
        }

        if (doesNotInclude(currentGuess, alphabet)) {
            print.alreadyGuessed(currentGuess)
            continue
        }

        alphabet = without(currentGuess, alphabet)
        const match = checkMatch(word, currentGuess)

        if (match) {
            answerString = updateAnswerString(currentGuess, word, answerString)
            answerArray = answerString.split('')
            const allLettersGuessed = doesNotInclude('_', answerArray)
            checkForWin(allLettersGuessed, word)
            continue
        }

        counter = inc(counter)
        if (counter > 5) {
            drawHangman(counter)
            print.gameLost(word)
            process.exit(0)
        }
    }
}


function checkForWin(statement, word) {
    if (statement) print.gameWon(word)
}


function getAlphabet() {
    const integers = range(97, 122)
    const alphabet = map(String.fromCharCode, integers)
    return alphabet
}


function checkMatch(word, guess) {
    const charArray = split('', word)
    const match = charArray.some(char => guess === char)
    return match
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

    const newAnswerString = newAnswerArray.join(' ')
    return newAnswerString
}


main()