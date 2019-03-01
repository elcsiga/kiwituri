import { Injectable } from '@angular/core';
import {Store} from "../util/Store";
import {ItemRecord} from "../../../../server/src/common/interfaces/item";

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  private progress = new Store<number | null>(null);
  progress$ = this.progress.value$;

  constructor() { }

  set( p: number ) {
    this.progress.set(p);
  }

  clear() {
    this.progress.set(null);
  }
}
