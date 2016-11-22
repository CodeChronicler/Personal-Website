using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace LEM.Website.Models
{
    public class ContactForm
    {
        [DisplayName("Name *")]
        [Required(ErrorMessage = "Please enter your name ")]
        public string Name { get; set; }

        [DisplayName("Email *")]
        [Required(ErrorMessage = "Please enter your email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Please enter your message")]
        public string Message { get; set; }

    }
}