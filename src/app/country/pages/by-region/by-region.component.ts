import { Component } from '@angular/core';
import { CountriesResponse } from '../../interfaces/country.interface';
import { SearchCountryService } from '../../services/search-country.service';

@Component({
  selector: 'app-by-region',
  templateUrl: './by-region.component.html',
  styles: [
    `
      button {
        margin-right: 5px;
      }
    `,
  ],
})
export class ByRegionComponent {
  public regions: string[] = [
    'africa',
    'americas',
    'asia',
    'europe',
    'oceania',
  ];

  public countries: CountriesResponse[] = [];

  public activeRegion: string = '';
  constructor(private searchCountryService: SearchCountryService) {}

  public activateRegion(region: string) {
    if (region !== this.activeRegion) {
      this.activeRegion = region;
      this.countries = [];
      this.searchCountryService
        .searchRegion(region)
        .subscribe((result) => (this.countries = result));
    }
  }

  public getCssStyle(region: string): string {
    return `btn ${
      this.activeRegion === region ? 'btn-primary' : 'btn-outline-primary'
    }`;
  }
}
