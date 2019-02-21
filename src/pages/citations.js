const citations = () => {
  Array.from(document.querySelectorAll('a'))
    .filter(link => link.getAttribute('href') === '#b')
    .map(link => (
      {node: link,
       text: link.textContent.split(',').map(s => s.trim())}
    ))
    .map(({node, text}) => (
      {node,
       text: text.map(cite => `<a href="../bib/#${cite}">${cite}</a>`)}
    ))
    .map(({node, text}) => (
      {node,
       text: `[${text.join(', ')}]`}
    ))
    .forEach(({node, text}) => {
      const span = document.createElement('span')
      span.innerHTML = text
      node.parentNode.replaceChild(span, node)
    })
}

document.addEventListener("DOMContentLoaded", function(event) {
  citations()
})
