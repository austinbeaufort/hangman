const randomWords = require('random-words')
const { randomChoice } = require('home-on-the-range')

const wordArray = randomWords(100)
const word = randomChoice(wordArray)

module.exports = word