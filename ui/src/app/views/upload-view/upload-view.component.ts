import { Component, OnInit } from '@angular/core';
import {UploadService} from "../../upload/services/upload.service";

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FileUploadDropzoneComponent} from "../../upload/components/file-upload-dropzone/file-upload-dropzone.component";
import {UploadedFile} from "../../../../../common/interfaces/upload";

@Component({
  selector: 'app-upload-view',
  templateUrl: './upload-view.component.html',
  styleUrls: ['./upload-view.component.css']
})
export class UploadViewComponent implements OnInit {

  report$ = this.uploadService.reports.value$;

  uploadedFiles: UploadedFile[] = [];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[] = [];
  allTags: string[] = [
    'Póló',
    'Kabát',
    'Pulóver',
    'Cipő',
    'Nadrág',
    'Csizma'
  ];

  sexControl = new FormControl('', [Validators.required]);
  sexes = [
    'Fiú',
    'Lány',
    'Unisex'
  ];


  uploadForm = this.fb.group({
    sex: ['', [Validators.required]],
    size: ['', [Validators.required]],
    description: ['']
  });

  //sizeControl = new FormControl('', [Validators.required]);
  sizes = [
    '0-3 hónap',
    '3-6 hónap',
    '6-9 hónap',
    '86-92',
    '98-104',
    '110-116',
    '122-128',
    '134-140',
    '146-152',
    '158-164',
    'XS',
    'S',
    'M',
    'L',
    'XL',
    'XXL',
  ];

  sizeEstimatedControl = new FormControl();

  constructor(
    private uploadService: UploadService,
    private fb: FormBuilder
  ) {

    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));

  }

  ngOnInit() {
  }

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  add(event: MatChipInputEvent): void {
    // Add tag only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our tag
      if ((value || '').trim()) {
        this.addTag(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.tagCtrl.setValue(null);
    }
  }

  addTag(tag: string): void {
    if (!this.isTagSelected(tag)) {
      this.tags.push(tag);
    }
  }

  isTagSelected(tag: string): boolean {
    return this.tags.includes(tag);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTags.filter(zag => zag.toLowerCase().indexOf(filterValue) === 0);
  }

  onFilesDropped(files: File[]) {
    this.uploadService.uploadFiles(files).subscribe( uploadedFile => {
      this.uploadedFiles.push(uploadedFile);
    });
  }
}
