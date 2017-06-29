#!/usr/bin/env node

const fs = require('fs')
const marked = require('marked')

const showGloss = (tokens) => {
  if (Array.isArray(tokens)) {
    tokens.forEach((t) => showGloss(t))
  }
  else if ((typeof tokens === 'object') && (tokens.type === 'text')) {
    if (tokens.text ~ /\/gloss\//) {
      console.log(tokens.text)
    }
  }
}

for (let filename of process.argv.slice(2)) {
  const data = fs.readFileSync(filename, 'utf-8')
  const tokens = new marked.Lexer().lex(data)
  showGloss(tokens)
}
