import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { noop } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PenaltyCalculationService {

  constructor(private http: HttpClient) { }

  params: HttpParams;


  GetTotalDays(startDate: Date, endDate: Date, countryId: number) {
    this.params = new HttpParams();
    this.params = this.params.append('startDt', startDate.toString());
    this.params = this.params.set('endDt', endDate.toString());
    this.params = this.params.append('countryId', countryId.toString());

    return this.http.get<number>(environment.APIEndPoint + 'PenaltyCalculation', { params: this.params });
  }

  GetPenaltyAmount(noOfDays: number) {
    this.params = new HttpParams();
    this.params = this.params.append('noOfDays', noOfDays.toString());

    return this.http.get<number>(environment.APIEndPoint + 'PenaltyCalculation/Penalty', { params: this.params });
  }
}
