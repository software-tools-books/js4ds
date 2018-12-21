// Pull all H2's into div.headings, or delete div.headings.
const makeTableOfContents = () => {
  const container = document.querySelector('div.headings')
  if (! container) {
    return
  }
  const headings = Array.from(document.querySelectorAll('h2'))
  if (headings.length === 0) {
    container.parentNode.removeChild(container)
  }
  const items = headings
        .map((h) => '<li><a href="#' + h.id + '">' + h.innerHTML + '</a></li>')
        .join('\n')
  container.innerHTML = '<h2>Contents</h2><ul>\n' + items + '</ul>'
}

// Add Bootstrap striped table classes to all tables.
const stripeTables = () => {
  Array.from(document.querySelectorAll('table'))
    .forEach(t => t.classList.add('table', 'table-striped'))
}

// Convert bibliography citation links.
const fixBibCites = () => {
  const pageIsRoot = document.currentScript.getAttribute('ROOT') != ''
  const bibStem = pageIsRoot ? './bib/#b:' : '../bib/#b:'
  Array.from(document.querySelectorAll('a'))
    .filter(e => e.getAttribute('href') == '#BIB')
    .forEach(e => {
      const cites = e.textContent
	    .split(',')
	    .filter(c => c.length > 0)
	    .map(c => '<a href="' + bibStem + c + '" class="citation">' + c + '</a>')
      const newNode = document.createElement('span')
      newNode.innerHTML = '[' + cites.join(',') + ']'
      e.parentNode.replaceChild(newNode, e)
    })
}

// Perform transformations on load (which is why this script is included at the
// bottom of the page).
(function(){
  makeTableOfContents()
  stripeTables()
  fixBibCites()
})()
