using System;

namespace PenaltyCalculation.Entities{
    public class Holiday{
        public int Id { get; set; }
        public DateTime HolidayDate { get; set; }
        public int CountryId { get; set; }
        public Country Country { get; set; }
    }
}