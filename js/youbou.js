// Pull all H2's into div.headings, or delete div.headings.
const makeTableOfContents = () => {
  const container = document.querySelectorAll('div.headings')[0]
  const headings = Array.from(document.querySelectorAll('h2'))
  if (headings.length === 0) {
    container.parentNode.removeChild(container)
  }
  const items = headings
        .map((h) => '<li><a href="#' + h.id + '">' + h.innerHTML + '</a></li>')
        .join('\n')
  container.innerHTML = '<p><strong>Contents</strong></p><ul>\n' + items + '</ul>'
}

// Add Bootstrap striped table classes to all tables.
const stripeTables = () => {
  const tables = document.querySelectorAll('table')
  Array.from(tables).forEach(t => {
    t.classList.add('table', 'table-striped')
  })
}

// Perform transformations on load (which is why this script is included at the
// bottom of the page).
(function(){
  makeTableOfContents()
  stripeTables()
})()
