const makeTableOfContents = () => {
  const container = document.querySelectorAll('div.headings')[0]
  const headings = Array.from(document.querySelectorAll('h2'))
  const items = headings
        .map((h) => '<li><a href="#' + h.id + '">' + h.innerHTML + '</a></li>')
        .join('\n')
  container.innerHTML = '<p><strong>Contents</strong></p><ul>\n' + items + '</ul>'
}

const stripeTables = () => {
  const tables = document.querySelectorAll('table')
  Array.from(tables).forEach(t => {
    t.classList.add('table', 'table-striped')
  })
}

const fixSpecialLinks = (prefix) => {
  const links = document.querySelectorAll('a')
  Array.from(document.querySelectorAll('a')).forEach(a => {
    const target = a.getAttribute('href')
    if (target.startsWith('#b:')) {
      a.setAttribute('href', prefix + '/bib/' + target)
      a.classList.add('bibref')
    }
    else if (target.startsWith('#g:')) {
      a.setAttribute('href', prefix + '/gloss/' + target)
      a.classList.add('glossref')
    }
  })
}

(function(){
  const pageIsRoot = (document.currentScript.getAttribute('ROOT') != '')
  const prefix = pageIsRoot ? '.' : '..'
  makeTableOfContents()
  stripeTables()
  fixSpecialLinks(prefix)
})()
