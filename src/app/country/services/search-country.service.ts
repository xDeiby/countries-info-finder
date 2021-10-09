import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CountriesResponse } from '../interfaces/country.interface';
import { Observable } from 'rxjs';

type Query = 'name' | 'capital';

@Injectable({
  providedIn: 'root',
})
export class SearchCountryService {
  private apiUrl: string = 'https://restcountries.com/v2';

  get httpParams() {
    return new HttpParams().set(
      'fields',
      'name,capital,alpha2Code,flags,population'
    );
  }

  constructor(private http: HttpClient) {}

  public searchCountries(
    country: string,
    typeSearch: Query = 'name'
  ): Observable<CountriesResponse[]> {
    return this.http.get<CountriesResponse[]>(
      `${this.apiUrl}/${typeSearch}/${country}`,
      { params: this.httpParams }
    );
  }

  public searchCountry(code: string): Observable<CountriesResponse> {
    return this.http.get<CountriesResponse>(`${this.apiUrl}/alpha/${code}`);
  }

  public searchRegion(region: string): Observable<CountriesResponse[]> {
    return this.http.get<CountriesResponse[]>(
      `${this.apiUrl}/continent/${region}`,
      { params: this.httpParams }
    );
  }
}
