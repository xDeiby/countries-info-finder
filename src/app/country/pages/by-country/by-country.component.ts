import { Component } from '@angular/core';
import { SearchCountryService } from '../../services/search-country.service';
import { CountriesResponse } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country',
  templateUrl: './by-country.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class ByCountryComponent {
  public searchValue: string = '';
  public countries: CountriesResponse[] = [];
  public suggests: CountriesResponse[] = [];
  public error: boolean = false;
  public showSuggests: boolean = false;

  constructor(private searchCountryService: SearchCountryService) {}

  public search(value: string) {
    this.searchValue = value;
    this.error = false;

    value.trim() &&
      this.searchCountryService
        .searchCountries(value.trim())
        .subscribe((result) => {
          if (Array.isArray(result)) {
            this.countries = result;
          } else {
            this.error = true;
            this.countries = [];
          }
        });
  }

  public newSuggests(value: string) {
    this.error = false;
    this.searchValue = value;
    this.showSuggests = true;

    this.searchCountryService.searchCountries(value).subscribe((result) => {
      if (Array.isArray(result)) {
        this.suggests = result.splice(0, 10);
      } else {
        this.countries = [];
      }
    });
  }

  public searchSuggest() {
    this.search(this.searchValue);
    this.showSuggests = false;
  }
}
