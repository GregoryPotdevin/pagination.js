
var generatePages = require('../index.js');
describe("Pagination.js tests", function(){

  function toString(pages){
    return pages.map(function(page){
      if (page.type == "ellipsis") return "..."
      else if (page.active) return "*" + page.page + "*"
      else return page.page
    }).join(" ")
  }

  function testPages(currentPage, totalPages, options){
    return toString(generatePages(currentPage, totalPages, options));
  }

  it('works for a single page', function(){
    expect(testPages(1, 1)).toBe("*1*")
  });

  it('works for a multiple pages', function(){
    expect(testPages(1, 4)).toBe("*1* 2 3 4")
    expect(testPages(3, 4)).toBe("1 2 *3* 4")
  });

  it('handles ellipsis', function(){
    expect(testPages(1, 10)).toBe("*1* 2 3 4 ...")
    expect(testPages(3, 10)).toBe("1 2 *3* 4 5 6 ...")
    expect(testPages(7, 10)).toBe("1 ... 4 5 6 *7* 8 9 10")
  });

  it('ignores first ellipsis if needed', function(){
    expect(testPages(5, 10)).toBe("1 2 3 4 *5* 6 7 8 ...")
  });

  it('handles pageScope option', function(){
    expect(testPages(5, 10, {pageScope: 0})).toBe("1 ... *5* ...")
    expect(testPages(5, 10, {pageScope: 1})).toBe("1 ... 4 *5* 6 ...")
    expect(testPages(5, 10, {pageScope: 5})).toBe("1 2 3 4 *5* 6 7 8 9 10")
  });


});

// og("page 1/10 => " + toString(generatePages(1, 10)))
// console.log("page 4/10 => " + toString(generatePages(4, 10)))
// console.log("page 6/10, scope=2 => " + toString(generatePages(6, 10, {pageScope: 2})))
// console.log(generatePages(6, 10, {pageScope: 2}))



