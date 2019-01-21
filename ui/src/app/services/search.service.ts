import { Injectable } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from "@angular/material";
import {SearchSheetComponent} from "../components/search-sheet/search-sheet.component";

export interface SearchSheetData {
  service: SearchService;
}


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchSheetRef: MatBottomSheetRef;

  constructor(private bottomSheet: MatBottomSheet ) { }

  openCartSheet() {

    const data: SearchSheetData = {
      service: this
    };

    this.searchSheetRef = this.bottomSheet.open(SearchSheetComponent, { data });

    this.searchSheetRef.afterDismissed().subscribe(() => {
      console.log('Bottom sheet has been dismissed.');
    });
  }

  closeCartSheet() {
    if(this.searchSheetRef) {
      this.searchSheetRef.dismiss();
    }
  }
}
