import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { of, Subscription } from 'rxjs';
import { concatMap } from "rxjs/operators";
import { Country } from '../Model/Country';
import { CountryService } from '../services/country.service';
import { PenaltyCalculationService } from '../services/penalty-calculation.service';
import { environment  } from '../../environments/environment';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.css']
})
export class CalculationComponent implements OnInit, OnDestroy {

  countries: Country[] = [];
  calculationForm: FormGroup;
  countryService$: Subscription;
  penaltyAmount$: Subscription;
  penaltyDays: number;
  penaltyAmount: number;
  currencyCode: string;
  showResult: boolean;
  serverErrorMessage: string;

  constructor(private countryService: CountryService, private penaltyService: PenaltyCalculationService) { }

  ngOnInit(): void {
    this.GetCountries();

    //this.countries = ["US", "India"];
    this.calculationForm = new FormGroup({
      'startDate': new FormControl((new Date).toISOString().substring(0, 10)),
      'endDate': new FormControl((new Date).toISOString().substring(0, 10)),
      'country': new FormControl(0)
    },
      {
        validators: [
          this.CompareDate('startDate', 'endDate'),
          this.CheckCountry('country')
        ]
      });
  }

  ngOnDestroy() {
    this.countryService$.unsubscribe();
    this.penaltyAmount$.unsubscribe();
    // this.penaltyDays.unsubscribe();
  }

  onClaculate() {
    // console.log(this.calculationForm);
    this.currencyCode = this.countries.filter(c => c.id === +this.calculationForm.value.country)[0].currencyCode;
    this.penaltyAmount$ = this.penaltyService.GetTotalDays(this.calculationForm.value.startDate, this.calculationForm.value.endDate, this.calculationForm.value.country)
      .pipe(
        concatMap((days) => {
          // console.log(days);
          if (days > environment.PenaltyDays)
            return this.penaltyService.GetPenaltyAmount(days);
          else
            return of(0);
        })
      )
      .subscribe(data => {
        this.penaltyAmount = data;
        this.showResult = true;
      },
        error => {
          this.serverErrorMessage = error.error;
        }
      );

  }

  private GetCountries() {
    this.countryService$ = this.countryService.getCountries()
      .subscribe((data) => {
        // console.log(data);
        this.countries = data;
        this.currencyCode = this.countries[0].currencyCode;
      });
  }

  CompareDate(startDt: string, endDt: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let sdt = group.controls[startDt];
      let edt = group.controls[endDt];
      if (sdt.value > edt.value) {
        return {
          dates: "Start date should be less than end date"
        };
      }
      return {};
    }
  }

  CheckCountry(country: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let c = group.controls[country];
      if (c.value == 0) {
        return {
          countryErr: 'Select country'
        }
      }
      return {};
    }
  }

}
