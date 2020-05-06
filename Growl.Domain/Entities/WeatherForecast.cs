using System;
using System.Collections.Generic;
using System.Text;

namespace Growl.Domain.Entities
{
    public class WeatherForecast
    {
        public int Id { get; set; }
        public string City { get; set; }
        public float Forecast { get; set; }
        public DateTime Date { get; set; }
    }
}
