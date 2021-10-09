import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { CountriesResponse } from '../../interfaces/country.interface';
import { SearchCountryService } from '../../services/search-country.service';

@Component({
  selector: 'app-show-country',
  templateUrl: './show-country.component.html',
  styles: [],
})
export class ShowCountryComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private searchCountryService: SearchCountryService
  ) {}

  public country: CountriesResponse = {} as CountriesResponse;
  public error: boolean = false;

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.searchCountryService.searchCountry(id)))
      .subscribe((result) => {
        if (Object.keys(result).includes('status')) {
          this.error = true;
        } else {
          this.country = result;
        }
      });

    // this.activatedRoute.params.subscribe(({ id }) =>
    //   this.searchCountryService.searchCountry(id).subscribe((result) => {
    //     if (Object.keys(result).includes('status')) {
    //       this.error = true;
    //     } else {
    //       this.country = result;
    //     }
    //   })
    // );
  }
}
