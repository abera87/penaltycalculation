import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Country } from '../Model/Country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http:HttpClient) { }

  getCountries(){
    return this.http.get<Country[]>(environment.APIEndPoint+'country');
  }
}
