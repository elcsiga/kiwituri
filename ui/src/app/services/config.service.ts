import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";


export interface Config {
  key: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private configs: BehaviorSubject<Config[]> = new BehaviorSubject<Config[]>([]);
  configs$ = this.configs.asObservable();

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
