using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Mission11.Data
{
    public class Book
    {
        //bookID
        [Key]
        public int BookID { get; set; }

        //title
        [Required]
        public string Title { get; set; }

        //author
        [Required]
        public string Author { get; set; }

        //publisher
        [Required]
        public string Publisher { get; set; }

        //isbn
        [Required]
        public string ISBN { get; set; }

        //class
        [Required]
        public string Classification { get; set; }

        //category
        [Required]
        public string Category { get; set; }

        //numpages
        [Required]
        public int PageCount { get; set; }

        //price 
        [Required]
        public double Price { get; set; }

        

    }
}
