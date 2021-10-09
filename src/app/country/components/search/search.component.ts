import {
  Component,
  ElementRef,
  Output,
  ViewChild,
  EventEmitter,
  OnInit,
  Input,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent implements OnInit {
  constructor() {}

  @ViewChild('valueSearch')
  public valueSearch!: ElementRef<HTMLInputElement>;

  @Output()
  public onNewSearch: EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();

  @Input()
  public placeholder: string = 'país';

  public debuncer: Subject<string> = new Subject();

  ngOnInit(): void {
    this.debuncer
      .pipe(debounceTime(300))
      .subscribe((value) => this.onDebounce.emit(value));
  }

  public searchValue() {
    this.onNewSearch.emit(this.valueSearch.nativeElement.value);
  }

  public inputModifies(event: any) {
    this.debuncer.next(event.target.value);
  }
}
