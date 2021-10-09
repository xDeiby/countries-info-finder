import { Component, Input } from '@angular/core';
import { CountriesResponse } from '../../interfaces/country.interface';
import { SearchCountryService } from '../../services/search-country.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: [],
})
export class TableComponent {
  constructor(private searchCountryService: SearchCountryService) {}

  @Input()
  public data: CountriesResponse[] = [];
}
