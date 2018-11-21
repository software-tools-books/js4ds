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

// Patch bibliography and glossary links.
const fixSpecialLinks = (prefix) => {
  const links = document.querySelectorAll('a')
  Array.from(document.querySelectorAll('a')).forEach(a => {
    const target = a.getAttribute('href')

    // Bibliography citations: [Abc123,Def456](#b:) in Markdown
    if (target === '#b:') {
      const replacement = document.createElement('span')
      const references = a.textContent
            .split(',')
            .map(s => s.trim())
            .map(s => `<a class="bibref" href="${prefix}/bib/#${s}">${s}</a>`)
            .join(',')
      replacement.innerHTML = `[${references}]`
      a.parentNode.replaceChild(replacement, a)
    }

    // Glossary entry: [text](#g:key) in Markdown
    else if (target.startsWith('#g:')) {
      a.setAttribute('href', prefix + '/gloss/' + target)
      a.classList.add('glossref')
    }
  })
}

// Perform transformations on load (which is why this script is included at the
// bottom of the page).
(function(){
  const pageIsRoot = (document.currentScript.getAttribute('ROOT') != '')
  const prefix = pageIsRoot ? '.' : '..'
  makeTableOfContents()
  stripeTables()
  fixSpecialLinks(prefix)
})()
