(function() {
  const container = document.querySelectorAll('div.toc')[0]
  const headings = Array.from(document.querySelectorAll('h2'))
  const items = headings
        .map((h) => '<li><a href="#' + h.id + '">' + h.innerHTML + '</a></li>')
        .join('\n')
  container.innerHTML = '<ul>\n' + items + '</ul>'
})()
