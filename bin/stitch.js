// Utility to combine all generated HTML files into a single page.

const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const { JSDOM } = require('jsdom')

HEADER = `---
permalink: /en/all/
layout: plain
---
`

const main = () => {
  const [configFile, rootDir, indexFile, destFile] = process.argv.slice(2)
  const {config, order} = getConfig(configFile)

  const allFiles = [indexFile]
	.concat(order.map(key => makeSrcPath(rootDir, key)))
  const allChapters = allFiles
	.map(path => getDoc(path))
	.map(doc => doc.querySelector('html'))
	.map(doc => transformHrefs(doc))
	.map(doc => doc.querySelector('div.main'))
	.map(div => cleanup(div))

  const result = HEADER.replace('TITLE', config.title) +
	allChapters.map(div => div.outerHTML).join('\n')
  fs.writeFileSync(destFile, result, 'utf-8')
}

const getConfig = (configFile) => {
  const config = yaml.safeLoad(fs.readFileSync(configFile, 'utf-8'))
  const toc = config.toc
  const order = toc.lessons.concat(toc.bib).concat(toc.extras)
  return {config, order}
}

const cleanup = (div) => {
  div.className = 'chapter'
  removeAll(div, 'blockquote.disclaimer', 'div.headings')
  return div
}

const makeSrcPath = (rootDir, key) => {
  return rootDir = path.join(rootDir, key, 'index.html')
}

const getDoc = (path) => {
  const text = fs.readFileSync(path, 'utf-8')
  return new JSDOM(text).window.document
}

const transformHrefs = (doc) => {
  const hrefPat = /\.\.\/(.+)\/(#.+)?/
  Array.from(doc.querySelectorAll('a')).forEach(node => {
    const href = node.getAttribute('href')
    const fields = href.match(hrefPat)
    // no match
    if (fields === null) {
    }
    // anchored
    else if (fields[2] !== undefined) {
      node.setAttribute('href', fields[2])
    }
    // section
    else {
      node.setAttribute('href', '#s:' + fields[1])
    }
  })
  return doc
}

const patch = (oldNode, newNode) => {
  while (oldNode.childNodes.length > 0) {
    newNode.appendChild(oldNode.childNodes[0])
  }
  oldNode.parentNode.replaceChild(newNode, oldNode)
}

const pathToId = (path) => {
  return 's:' + path.split('/').slice(-2, -1)
}

const removeAll = (doc, ...selectors) => {
  selectors.forEach(sel => {
    Array.from(doc.querySelectorAll(sel)).forEach(node => {
      node.parentNode.removeChild(node)
    })
  })
}

main()
