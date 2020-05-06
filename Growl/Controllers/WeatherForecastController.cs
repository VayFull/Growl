using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Growl.Data.Contexts;
using Growl.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Growl.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly GrowlDbContext _context;
        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, GrowlDbContext growlDbContext)
        {
            _logger = logger;
            _context = growlDbContext;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            return _context.WeatherForecasts.AsEnumerable();
        }
    }
}
