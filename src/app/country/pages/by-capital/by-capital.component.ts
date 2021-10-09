import { Component } from '@angular/core';
import { CountriesResponse } from '../../interfaces/country.interface';
import { SearchCountryService } from '../../services/search-country.service';

@Component({
  selector: 'app-by-capital',
  templateUrl: './by-capital.component.html',
  styles: [],
})
export class ByCapitalComponent {
  public searchValue: string = '';
  public countries: CountriesResponse[] = [];
  public error: boolean = false;

  constructor(private searchCountryService: SearchCountryService) {}

  public search(value: string) {
    this.searchValue = value;
    this.error = false;

    value.trim() &&
      this.searchCountryService
        .searchCountries(value.trim(), 'capital')
        .subscribe((result) => {
          if (Array.isArray(result)) {
            this.countries = result;
          } else {
            this.error = true;
            this.countries = [];
          }
        });
  }

  public suggest(value: string) {
    this.error = false;
    console.log(value);
  }
}
