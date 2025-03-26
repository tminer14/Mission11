using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Any;
using Mission11.Data;

namespace Mission11.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookstoreController : ControllerBase
    {
        private BookDbContext _context;


        public BookstoreController(BookDbContext temp)
        {
            _context = temp;
        }

        [HttpGet(Name = "GetBooks")]
        public IActionResult Get(int pageHowMany= 5, int pageNum=1, [FromQuery] List<string> bookCategory = null)
        {

            var query = _context.Books.AsQueryable();

            if (bookCategory != null && bookCategory.Any())
            {
                query = query.Where(bc => bookCategory.Contains(bc.Category));
            }

            var BookList = query
            .OrderBy(b => b.Title)
            .Skip((pageNum - 1)* pageHowMany)
            .Take(pageHowMany)
            .ToList();

            var TotalNumBooks = query.Count();

            return Ok(new
            {
                books = BookList,
                totalNumBooks = TotalNumBooks
            });

        }

        [HttpGet("GetBookTypes")]
        public IActionResult GetBookTypes()
        {
            var bookTypes = _context.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();

            //remember that the Ok makes sure it's JSON! 
            return Ok(bookTypes);
        }
    }
}
