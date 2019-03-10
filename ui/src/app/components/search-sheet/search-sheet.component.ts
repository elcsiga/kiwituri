import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from "@angular/material";
import {SearchService, SearchSheetData} from "../../services/search.service";
import {FormBuilder} from "@angular/forms";
import {ConfigService} from "../../services/config.service";
import {UserService} from "../../services/user.service";

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
    private userService: UserService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: SearchSheetData
  ) {
    this.searchService = data.service;
  }

  searchForm;

  setting$ = this.configService.settings$;
  users$ = this.userService.users$;
  user$ = this.userService.user$;

  ngOnInit() {
    const searchSnapshot = this.searchService.getSearchSnapshot();

    this.searchForm = this.fb.group({
      sex: [searchSnapshot.sex],
      size: [searchSnapshot.size],
      store:  [searchSnapshot.store],
      status:  [searchSnapshot.status]
    });

    this.searchForm.get('sex').valueChanges.subscribe(sex => this.searchService.setSex(sex));
    this.searchForm.get('size').valueChanges.subscribe(size => this.searchService.setSize(size));
    this.searchForm.get('store').valueChanges.subscribe(store => this.searchService.setStore(store));
    this.searchForm.get('status').valueChanges.subscribe(status => this.searchService.setStatus(status));

  }

  close() {
    this.searchService.closeCartSheet()
  }

  reset() {
    this.searchService.setSex('ALL');
    this.searchService.setSize('ALL');
    this.searchService.setStore('ALL');
    this.searchService.setStatus('ALL');

    this.searchForm.get('sex').setValue('ALL');
    this.searchForm.get('size').setValue('ALL');
    this.searchForm.get('store').setValue('ALL');
    this.searchForm.get('status').setValue('ALL');
  }

  isFiltering() {
    return this.searchService.isFiltering()
  }

}
