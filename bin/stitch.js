// Utility to combine all generated HTML files into a single page.

const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const { JSDOM } = require('jsdom')

const main = () => {
  const [configFile, rootDir, indexFile, templateFile, destFile] = process.argv.slice(2)
  const {config, order} = getConfig(configFile)

  const allFiles = [indexFile]
	.concat(order.map(key => makeSrcPath(rootDir, key)))
  const allChapters = allFiles
	.map(path => getDoc(path))
	.map(doc => doc.querySelector('html'))
	.map(doc => transformHrefs(doc))
	.map(doc => doc.querySelector('div.main'))
  allChapters.forEach(div => div.className = 'chapter')

  const destDoc = getDoc(templateFile)
  fillIn(destDoc, config.title, allChapters)
  fs.writeFileSync(destFile, destDoc.querySelector('html').outerHTML, 'utf-8')
}

const getConfig = (configFile) => {
  const config = yaml.safeLoad(fs.readFileSync(configFile, 'utf-8'))
  const toc = config.toc
  const order = toc.lessons.concat(toc.bib).concat(toc.extras)
  return {config, order}
}

const fillIn = (doc, title, allChapters) => {
  console.log('***doc is', doc)
  const destDiv = doc.querySelector('div.main')
  console.log('destDiv is', destDiv.outerHTML)

  removeAll(destDiv, 'blockquote.disclaimer', 'div.headings')
  while (destDiv.childNodes.length > 0) {
    destDiv.removeChild(destDiv.childNodes[0])
  }

  const h1 = doc.createElement('h1')
  h1.innerHTML = title
  console.log('h1 is', h1.outerHTML)
  destDiv.appendChild(h1)
  const toc = doc.createElement('div')
  toc.classList.add('listblock', 'headings')
  destDiv.appendChild(toc)
  console.log('destDiv becomes', destDiv.outerHTML)

  allChapters.forEach(c => destDiv.appendChild(c))
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
