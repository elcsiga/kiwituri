import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from "@angular/material";
import {SearchService, SearchSheetData} from "../../services/search.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {ConfigService} from "../../services/config.service";

@Component({
  selector: 'app-search-sheet',
  templateUrl: './search-sheet.component.html',
  styleUrls: ['./search-sheet.component.css']
})
export class SearchSheetComponent implements OnInit {

  private searchService: SearchService;
  constructor(
    private fb: FormBuilder,
    private configService: ConfigService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: SearchSheetData
  ) {
    this.searchService = data.service;
  }

  searchForm;

  //search$ = this.searchService.search$;
  setting$ = this.configService.settings$;

  ngOnInit() {
    const searchSnapshot = this.searchService.getSearchSnapshot();

    this.searchForm = this.fb.group({
      sex: [searchSnapshot.sex],
      size: [searchSnapshot.size],
    });

    this.searchForm.get('sex').valueChanges.subscribe(sex => this.searchService.setSex(sex));
    this.searchForm.get('size').valueChanges.subscribe(size => this.searchService.setSize(size));

  }

  close() {
    this.searchService.closeCartSheet()
  }

  reset() {
    this.searchService.setSex('ALL');
    this.searchService.setSize('ALL');

    this.searchForm.get('sex').setValue('ALL');
    this.searchForm.get('size').setValue('ALL');
  }

  isFiltering() {
    return this.searchService.isFiltering()
  }

}
