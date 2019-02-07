import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import * as yaml from 'js-yaml';

export interface Config {
  key: string;
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

  private settings: BehaviorSubject<Settings> = new BehaviorSubject<Settings>({
    CATEGORIES: [],
    TAGS: {},
    SIZES: [],
    SEXES:[]
  });

  settings$ = this.settings.asObservable();

  constructor(
    private http: HttpClient
  ) {
    this.load();
  }

  load() {
    this.http.get<Config[]>('/api/config')
      .subscribe(configs => {
        this.configs.next(configs);

        const settings = yaml.safeLoad(configs.find(c => c.key === 'settings').value);
        this.settings.next(settings);

      }, error => {
        console.error(error);
      })
  }
}
