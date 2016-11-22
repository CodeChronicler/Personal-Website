using System.Net.Mail;
using System.Text;
using LEM.Website.Models;

namespace LEM.Website.Helpers
{
    public static class EmailHelper
    {
        public static string CreateContactSubmissionEmailContent(ContactForm model)
        {
            var content = new StringBuilder();
            content.AppendFormat("Name: {0} \n", model.Name);
            content.AppendFormat("Email: {0} \n", model.Email);
            content.AppendFormat("Message: {0} \n", model.Message);
            return content.ToString();
        }

        public static void SendEmail(MailAddress reciprocant, string subject, string content)
        {
            using (var client = new SmtpClient())
            {
                var mailMessage = new MailMessage();
                mailMessage.To.Add(reciprocant);
                mailMessage.From = new MailAddress("lesmac88@gmail.co.uk");
                mailMessage.Subject = subject;
                mailMessage.Body = content;

                client.Send(mailMessage);
            }
        }
    }
}