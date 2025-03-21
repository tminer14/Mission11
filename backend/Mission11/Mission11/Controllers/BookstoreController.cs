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
        public IEnumerable<Book> Get(int pageHowMany= 5, int pageNum=1)
        {
            var bookList = _context.Books
            .Skip((pageNum - 1)* pageHowMany)
            .Take(pageHowMany)
            .ToList();

            var totalNumBooks = (_context.Books.Count());

            return bookList;
        }
    }
}
