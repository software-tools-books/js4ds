// Tidy up page elements.
// ---
//
// 1. Add 'data-toggle' to every 'div' with a 'title' attribute.
//    Bootstrap tooltips require both a 'title' and a 'data-toggle'
//    attribute to work, but requiring people to type that into
//    Markdown is a pain.
//
// 2. Make all tables striped by default.
//
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('div[title]').forEach((node) => {
    node.setAttribute('data-toggle', 'tooltip')
  })
  document.querySelectorAll('table').forEach((node) => {
    node.className += ' table table-striped'
  })
}, false)

// Handle searches.
// ---
//
// Relies on document having 'meta' element with name 'search-domain'
// and content equal to the GitHub Pages domain in the _config.yml
// file, and on the search form having the ID 'search-term'.
//
function doSearch() {
  const queryElement = document.getElementById('search-term')
  if (! queryElement) {
    return false
  }
  const queryString = queryElement.value
  if (! queryString) {
    return false
  }
  const searchDomainElement = document.querySelector('meta[name=search-domain]')
  if (! searchDomainElement) {
    return false
  }
  const searchDomain = searchDomainElement.getAttribute('content')
  if (! searchDomain) {
    return false
  }
  const url = `https://duckduckgo.com/?q=site%3A${searchDomain}+${encodeURI(queryString)}`
  window.open(url)
  return false
}
