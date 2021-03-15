using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PenaltyCalculation.DBContext;
using PenaltyCalculation.Entities;

namespace PenaltyCalculation.WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PenaltyCalculationController : ControllerBase
    {
        private readonly PenaltyDBContext dBContext;

        public PenaltyCalculationController(PenaltyDBContext dBContext)
        {
            this.dBContext = dBContext;
        }

        public async Task<IActionResult> CalculateDays(DateTime startDt, DateTime endDt, int countryId)
        {
            var result = 0;
            if (startDt > endDt)
            {
                return new ObjectResult("Start date should be less than end date")
                { StatusCode = (int)HttpStatusCode.BadRequest };
            }
            int noOfDays = endDt.Subtract(startDt).Days + 1;
            int noOfWeek = noOfDays / 7;
            int remainingDay = noOfDays % 7;
            result += 6 * noOfWeek;

            var holidays = await dBContext.Holidays
                            .AsQueryable()
                            .Where(h => h.CountryId == countryId && (h.HolidayDate >= startDt && h.HolidayDate <= endDt)).ToListAsync();
            var country = await dBContext.Countries
                            .AsQueryable()
                            .Where(c => c.Id == countryId).FirstOrDefaultAsync();

            if (country == null)
            {
                return new ObjectResult("Provide proper country")
                { StatusCode = (int)HttpStatusCode.BadRequest };
            }

            //check remaining day falling on weekend
            for (int i = 0; i < remainingDay; i++)
            {
                if (endDt.AddDays(-i).DayOfWeek == country.WeekEnd)
                {
                    remainingDay--;
                    break;
                }
            }
            result += remainingDay;
            // check holiday fall under weekend
            foreach (var h in holidays)
            {
                if (h.HolidayDate.DayOfWeek != country.WeekEnd)
                {
                    result--;
                }
            }

            return Ok(result);
        }
        [Route("Penalty")]
        public async Task<decimal> CalculatePenalty(int noOfDays)
        {
            return await Task.Run(() => (decimal)((noOfDays - 10) * 5.00M));
        }
    }
}