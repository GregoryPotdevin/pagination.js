function generatePages(currentPage, totalPages, options){
  if (!options) options = {};
  var pageScope = options.pageScope == undefined ? 3 : options.pageScope;
  var pages = [];

  if (currentPage > pageScope + 1) pages.push({type: "number", page: 1})
  if (currentPage > pageScope + 2) pages.push({type: "ellipsis"})
  if (currentPage > 1){
    var min = Math.max(1, currentPage-pageScope)
    for (var i = min; i < currentPage; i++) pages.push({ type: "number", page: i })
  }
  pages.push({type: "number", page: currentPage, active: true})
  if (currentPage < totalPages) {
    var max = Math.min(currentPage + pageScope, totalPages)
    for (var i = currentPage + 1; i <= max; i++) pages.push({ type: "number", page: i })
  }
  if (currentPage < totalPages - pageScope) pages.push({ type: "ellipsis" })

  return pages
}

module.exports = generatePages;
