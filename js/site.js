// Add 'data-toggle' to every 'div' with a 'title' attribute.
// Bootstrap tooltips require both a 'title' and a 'data-toggle' attribute to work.
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('div[title]').forEach((node) => {
    node.setAttribute('data-toggle', 'tooltip')
  })
}, false)
