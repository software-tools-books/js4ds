#!/usr/bin/env node

const fs = require('fs')
const marked = require('marked')

const countText = (tokens) => {
  if (Array.isArray(tokens)) {
    return tokens.reduce((accum, val) => accum + countText(val), 0)
  }
  else if ((typeof tokens === 'object') && (tokens.type === 'text')) {
    return tokens.text
      .split(' ')
      .filter((word) => { return word.length > 0 })
      .length
  }
  else {
    return 0
  }
}

console.log(process.argv.slice(2).reduce((accum, filename) => {
  const data = fs.readFileSync(filename, 'utf-8')
  const tokens = new marked.Lexer().lex(data)
  return accum + countText(tokens)
}, 0))
