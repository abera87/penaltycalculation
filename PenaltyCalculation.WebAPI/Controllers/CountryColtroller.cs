using System;
using System.Collections.Generic;
using System.Linq;
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
    public class CountryController : ControllerBase
    {
        private readonly PenaltyDBContext dBContext;

        public CountryController(PenaltyDBContext dBContext)
        {
            this.dBContext = dBContext;
        }

        public async Task<IEnumerable<Country>> Get()
        {
            return await dBContext.Countries.AsQueryable().ToListAsync();
        }
       
    }
}