// Utility to combine all generated HTML files into a single page.

const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const { JSDOM } = require('jsdom')

HEADER = `---
permalink: /all/
root: true
layout: plain
---
`

const main = () => {
  const [configFile, rootDir, language, destFile] = process.argv.slice(2)
  const {config, order} = getConfig(configFile)
  const allFiles = [makeSrcPath(rootDir, language, '')]
	.concat(order.map(key => makeSrcPath(rootDir, language, key)))
  const allChapters = allFiles
	.map(path => ({path, doc: getDoc(path)}))
	.map(({path, doc}) => ({path, doc: transformHeadings(path, doc)}))
	.map(({path, doc}) => ({path, doc: doc.querySelector('html')}))
	.map(({path, doc}) => ({path, doc: transformHrefs(path, doc, language)}))
	.map(({path, doc}) => ({path, doc: doc.querySelector('div.main')}))
	.map(({path, doc}) => ({path, doc: cleanup(path, doc)}))
	.map(({path, doc}) => doc)
  writeResult(destFile, config.title, allChapters)
}

const getConfig = (configFile) => {
  const config = yaml.safeLoad(fs.readFileSync(configFile, 'utf-8'))
  const toc = config.toc
  const order = toc.lessons.concat(toc.bib).concat(toc.extras)
  return {config, order}
}

const makeSrcPath = (rootDir, language, key) => {
  return rootDir = path.join(rootDir, language, key, 'index.html')
}

const getDoc = (path) => {
  const text = fs.readFileSync(path, 'utf-8')
  return new JSDOM(text).window.document
}

const transformHrefs = (path, doc, language) => {
  const upwardPat = /\.\.\/(.+)\/(#.+)?/
  const languagePat = new RegExp(`^/${language}/(.+)/`)
  Array.from(doc.querySelectorAll('a')).forEach(node => {
    const href = node.getAttribute('href')
    let fields = href.match(upwardPat)
    // no match, so try a language replacement
    if (fields === null) {
      fields = href.match(languagePat)
      if (fields) {
	node.setAttribute('href', '#s:' + fields[1])
      }
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

const transformHeadings = (path, doc) => {

  const topId = pathToId(path)

  // h3 becomes h4 and auto-generated IDs are removed.
  Array.from(doc.querySelectorAll('h3')).forEach(node => {
    const h4 = doc.createElement('h4')
    patch(node, h4)
  })

  // h2 becomes h3.
  Array.from(doc.querySelectorAll('h2')).forEach(node => {
    const h3 = doc.createElement('h3')
    h3.setAttribute('id', node.getAttribute('id'))
    patch(node, h3)
  })

  // h1 becomes h2 with new ID.
  Array.from(doc.querySelectorAll('h1')).forEach(node => {
    const h2 = doc.createElement('h2')
    h2.setAttribute('id', topId)
    patch(node, h2)
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

const cleanup = (path, div) => {
  div.className = 'chapter'
  for (sel of ['blockquote.disclaimer', 'div.headings']) {
    Array.from(div.querySelectorAll(sel)).forEach(node => {
      node.parentNode.removeChild(node)
    })
  }
  return div
}

const writeResult = (path, title, chapters) => {
  const result = HEADER.replace('TITLE', title) +
	chapters.map(doc => doc.outerHTML).join('\n')
  fs.writeFileSync(path, result, 'utf-8')
}

main()
