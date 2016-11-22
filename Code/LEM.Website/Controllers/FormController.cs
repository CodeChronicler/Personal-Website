using System;
using System.Net.Mail;
using System.Web.Mvc;
using LEM.Website.Helpers;
using LEM.Website.Models;
using Umbraco.Core.Logging;
using Umbraco.Web.Mvc;

namespace LEM.Website.Controllers
{
    public class FormController : SurfaceController
    {
        [HttpGet]
        public ActionResult ContactForm()
        {
            return View(new ContactForm());
        }

        [HttpPost]
        public ActionResult ContactForm(ContactForm model)
        {
            var status = "Success";
            if (ModelState.IsValid)
            {
                try
                {
                    var content = EmailHelper.CreateContactSubmissionEmailContent(model);

                    try
                    {
                        EmailHelper.SendEmail(new MailAddress("lesmac88@gmail.com"), "Contact form Submission", content);
                    }
                    catch (Exception ex)
                    {
                        LogHelper.Error(typeof(FormController), $"Could not send Contact Email : {content}", ex);
                    }
                    
                }
                catch (Exception e)
                {
                    LogHelper.Error(typeof(FormController), $"Could not send Contact Email : {e}", e);
                    ViewBag.Status = "Failed";
                }
            }
            else
            {
                status = "Invalid";
            }
            return Redirect($"/?submission={status}");
        }
    }
}