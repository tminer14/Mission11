using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        public IActionResult Get(int pageHowMany= 5, int pageNum=1)
        {
            var BookList = _context.Books
            .Skip((pageNum - 1)* pageHowMany)
            .Take(pageHowMany)
            .ToList();

            var TotalNumBooks = (_context.Books.Count());

            return Ok(new
            {
                books = BookList,
                totalNumBooks = TotalNumBooks
            });
        }
    }
}
