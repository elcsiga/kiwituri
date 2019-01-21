import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from "@angular/material";
import {SearchService, SearchSheetData} from "../../services/search.service";

@Component({
  selector: 'app-search-sheet',
  templateUrl: './search-sheet.component.html',
  styleUrls: ['./search-sheet.component.css']
})
export class SearchSheetComponent implements OnInit {

  private searchService: SearchService;
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: SearchSheetData) {
    this.searchService = data.service;
  }

  ngOnInit() {
  }

  close() {
    this.searchService.closeCartSheet()
  }
}
