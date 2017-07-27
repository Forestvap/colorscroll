import { Injectable } from '@angular/core';
import { Subject, ConnectableObservable, Observable } from 'rxjs';
import { HSL } from '../../shared';
import { TheColorApiService } from '../../api';
import { ColorConverterService } from './color-converter.service';

export type HslOperation = (color: HSL) => HSL;

@Injectable()
export class LiveColorService {
  hsl$: ConnectableObservable<HSL>;
  hex$: Observable<string>;
  hslString$: Observable<string>;

  private readonly hslUpdates$ = new Subject<HslOperation>();

  constructor(
    public colorApi: TheColorApiService,
    private converter: ColorConverterService
  ) {
    window['convert'] = this.converter;
    this.hsl$
      = this.hslUpdates$
          .startWith((hsl: HSL) => hsl)
          .scan(
            (hsl, operation) => operation(hsl),
            { h: 170, l: 50, s: 100 }
          )
          .publishReplay(1);

    this.hslString$ = this.hsl$.map(({h, s, l}) => `hsl(${h}, ${s}%, ${l}%)`);
    this.hex$ = this.hsl$.map(({h, s, l}) => this.converter.hsl.hex([h, s, l]));
    this.hsl$.connect();
  }

  apply(operation: HslOperation) {
    this.hslUpdates$.next(operation);
  }




}
