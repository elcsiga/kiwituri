import { Injectable } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from "@angular/material";
import {SearchSheetComponent} from "../components/search-sheet/search-sheet.component";
import {Store} from "../util/Store";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

export interface SearchSheetData {
  service: SearchService;
}
export interface SearchData {
  size: string;
  sex: string;
}


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private search = new Store<SearchData>({
    size: 'ALL',
    sex: 'ALL'
  });

  searchSheetRef: MatBottomSheetRef;

  constructor(private bottomSheet: MatBottomSheet ) { }

  search$ = this.search.value$;
  getSearchSnapshot() {
    return this.search.snapshot();
  }

  setSize(size: string) {
    this.search.update( search => ({...search, size }));
  }
  setSex(sex: string) {
    this.search.update(search => ({...search, sex}));
  }

  openCartSheet() {
    const data: SearchSheetData = {
      service: this
    };

    this.searchSheetRef = this.bottomSheet.open(SearchSheetComponent, { data });
  }

  closeCartSheet() {
    if(this.searchSheetRef) {
      this.searchSheetRef.dismiss();
    }
  }

  isFiltering(): Observable<boolean> {
    return this.search$.pipe( map(s => s.sex !== 'ALL' || s.size !== 'ALL' ));
  }

  reset() {
    this.setSex('ALL');
    this.setSize('ALL');
  }
}
