using System;
using System.Collections.Generic;

namespace PenaltyCalculation.Entities
{
     public class Country{
         public int Id { get; set; }
         public string Name { get; set; }
         public string CurrencyCode { get; set; }

         public DayOfWeek WeekEnd { get; set; }
         public ICollection<Holiday> Holidays{get;set;}
     }
}