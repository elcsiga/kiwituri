import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import * as yaml from 'js-yaml';
import {map} from "rxjs/operators";

export interface Config {
  key: string;
  title: string;
  value: string;
}

export interface Settings {
  CATEGORIES: string[],
  TAGS: object;
  SIZES: string[];
  SEXES: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private configs: BehaviorSubject<Config[]> = new BehaviorSubject<Config[]>([]);
  configs$ = this.configs.asObservable();

  getText(key): Observable<string> {
    return this.configs$.pipe(
      map(configs => configs.find(c => c.key === key)),
      map( config => config ? config.value : '')
    )
  }

  settings$: Observable<Settings> = this.configs$.pipe(
    map(configs => configs.find(c => c.key === 'settings')),
    map(config => config ? yaml.safeLoad(config.value): {
      CATEGORIES: {},
      TAGS: {},
      SIZES: {},
      SEXES: {}
    })
  );

  getCategory(key): Observable<string> {
    return this.settings$.pipe(
      map(settings$ => settings$.CATEGORIES[key] || ' ??? ')
    )
  }
  getSize(key): Observable<string> {
    return this.settings$.pipe(
      map(settings$ => settings$.SIZES[key] || ' ??? ')
    )
  }
  getSex(key): Observable<string> {
    return this.settings$.pipe(
      map(settings$ => settings$.SEXES[key] || ' ??? ')
    )
  }

  constructor(
    private http: HttpClient
  ) {
    this.load();
  }

  load() {
    this.http.get<Config[]>('/api/config')
      .subscribe(configs => {
        this.configs.next(configs);
      }, error => {
        console.error(error);
      })
  }
}
