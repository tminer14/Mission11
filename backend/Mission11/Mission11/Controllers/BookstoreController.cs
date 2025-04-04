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

        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody]Book newBook)
        {
            _context.Books.Add(newBook);
            _context.SaveChanges();
            return Ok(newBook);
        }

        [HttpPut("UpdateBook/{bookID}")]
        public IActionResult UpdateBook(int bookID, [FromBody] Book updatedBook)
        {
            var existingBook = _context.Books.Find(bookID);

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;

            _context.Books.Update(existingBook);
            _context.SaveChanges();

            return Ok(existingBook);

        }

        [HttpDelete("DeleteBook/{bookID}")]
        public IActionResult DeleteBook(int bookID)
        {
            var book = _context.Books.Find(bookID);

            if (book == null)
            {
                return NotFound(new { message = "Book not found." });
            }

            _context.Books.Remove(book);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
