(function() {
  const container = document.querySelectorAll('div.toc')[0] // '[0]' to get first element
  const headings = [...document.querySelectorAll('h2')] // [...call()] to convert NodeList to array
  const items = headings
        .map((h) => '<li><a href="#' + h.id + '">' + h.innerHTML + '</a></li>')
        .join('\n')
  container.innerHTML = '<ul>\n' + items + '</ul>'
})()
