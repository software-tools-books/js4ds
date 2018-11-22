// Start building utility to stitch together generated pages.

const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const { JSDOM } = require('jsdom')

const main = () => {
    const [configPath, rootDir, indexFile, destFile] = process.argv.slice(2)
    const {config, order} = getConfig(configPath)
    const {destDoc, destDiv} = getDest(destFile)
    prepDest(destDoc, destDiv)
    const allFiles = [indexFile]
	  .concat(order.map(key => makeSrcPath(rootDir, key)))
    allFiles
	.map(path => ({path, doc: getDoc(path)}))
	.map(({path, doc}) => transformHeadings(path, doc))
	.map(doc => transformHrefs(doc))
	.map(doc => doc.querySelector('div.main'))
	.forEach(section => moveChildren(destDiv, section))
    const root = destDoc.querySelector('html')
    removeAll(root, 'blockquote.disclaimer', 'div.headings')
    makeTitleAndToc(destDoc)
    fs.writeFileSync(destFile, root.outerHTML, 'utf-8')
}

const getConfig = (configFile) => {
    const config = yaml.safeLoad(fs.readFileSync(configFile, 'utf-8'))
    const toc = config.toc
    const order = toc.lessons.concat(toc.bib).concat(toc.extras)
    return {config, order}
}

const getDest = (destFile) => {
    const destDoc = getDoc(destFile)
    const destDiv = destDoc.querySelector('div.main')
    return {destDoc, destDiv}
}

const prepDest = (destDoc, destDiv) => {
    while (destDiv.childNodes.length > 0) {
	destDiv.removeChild(destDiv.childNodes[0])
    }
}

const makeSrcPath = (rootDir, key) => {
    return rootDir = path.join(rootDir, key, 'index.html')
}

const getDoc = (path) => {
    const text = fs.readFileSync(path, 'utf-8')
    const dom = new JSDOM(text).window.document
    return dom
}

const transformHeadings = (path, doc) => {

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
	h2.setAttribute('id', pathToId(path))
	patch(node, h2)
    })

    return doc
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

const moveChildren = (dest, src) => {
    while (src.childNodes.length > 0) {
	const child = src.childNodes[0]
	src.removeChild(child)
	dest.appendChild(child)
    }
}

const removeAll = (doc, ...selectors) => {
    selectors.forEach(sel => {
	Array.from(doc.querySelectorAll(sel)).forEach(node => {
	    node.parentNode.removeChild(node)
	})
    })
}

const makeTitleAndToc = (doc) => {
    const firstH2 = doc.querySelector('h2')
    const h1 = doc.createElement('h1')
    patch(firstH2, h1)
    const toc = doc.createElement('div')
    toc.classList.add('listblock', 'headings')
    h1.after(toc)
}

main()
