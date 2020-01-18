const { complement, includes } = require('ramda')

const doesNotInclude = complement(includes)

module.exports = doesNotInclude