// Start building utility to stitch together generated pages.

const fs = require('fs')
const htmlparser = require('htmlparser2')
const filename = process.argv[2]
const rawPage = fs.readFileSync(filename, 'utf-8')

const jsdom = require('jsdom')
const { JSDOM } = jsdom
const wholePage = new JSDOM(rawPage)
const mainDiv = wholePage.window.document.querySelector('div.main')
const title = mainDiv.querySelector('h1')
console.log(title.textContent)
