export default function generatePages(currentPage, totalPages, options={}){
  const pageScope = options.pageScope || 3
  let pages = [];

  if (currentPage > pageScope + 1) pages.push({type: "number", page: 1})
  if (currentPage > pageScope + 2) pages.push({type: "ellipsis"})
  if (currentPage > 1){
    let min = Math.max(1, currentPage-pageScope)
    for (let i = min; i < currentPage; i++) pages.push({ type: "number", page: i })
  }
  pages.push({type: "number", page: currentPage, active: true})
  if (currentPage < totalPages) {
    let max = Math.min(currentPage + pageScope, totalPages)
    for (let i = currentPage + 1; i <= max; i++) pages.push({ type: "number", page: i })
  }
  if (currentPage < totalPages - pageScope) pages.push({ type: "ellipsis" })

  return pages
}

function toString(pages){
  return pages.map((page) => {
    if (page.type == "ellipsis") return "..."
    else if (page.active) return "*" + page.page + "*"
    else return page.page
  }).join(" ")
}

console.log("page 1/10 => " + toString(generatePages(1, 10)))
console.log("page 4/10 => " + toString(generatePages(4, 10)))
console.log("page 6/10, scope=2 => " + toString(generatePages(6, 10, {pageScope: 2})))
console.log(generatePages(6, 10, {pageScope: 2}))
