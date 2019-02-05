import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";


interface Config {
  categories: string[];
  sizes: string[];
  tags: string[];
}


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private config: BehaviorSubject<Config> = new BehaviorSubject<Config>(null);
  config$ = this.config.asObservable();

  constructor(
    private http: HttpClient
  ) {
    this.http.get<Config>('/api/config')
      .subscribe(config => {
        this.setConfig(config);
      }, error => {
        console.error(error);
      })
  }

  setConfig(config: Config) {
    this.config.next(config);
  }
}
