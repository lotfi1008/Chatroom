using Chatroom.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using System.IO;
using System.Net.Http.Headers;

namespace Chatroom.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        //

        [HttpGet]
        public IActionResult GetVideoContent()
        {
            string file = @"D:\@ Nikamooz\VAS\MobileAppUI\src\05.Endpoints\MobileAppUI.Endpoints.Mvc\wwwroot\assets\vid\1.mp4";
            if (System.IO.File.Exists(file))
            {

            FileStream fs = System.IO.File.Create(file);
            return File(fs, new MediaTypeHeaderValue("video/mp4").MediaType);
            }
            return BadRequest();

        }
    }
}
