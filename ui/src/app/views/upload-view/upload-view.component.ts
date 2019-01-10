import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload-view',
  templateUrl: './upload-view.component.html',
  styleUrls: ['./upload-view.component.css']
})
export class UploadViewComponent implements OnInit {

  allTags: string[] = [
    'Póló',
    'Kabát',
    'Pulóver',
    'Cipő',
    'Nadrág',
    'Csizma'
  ];

  sexes = [
    'Fiú',
    'Lány',
    'Unisex'
  ];

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

  uploadForm = this.fb.group({
    thumbnail: [[], [Validators.required]],
    images: [[]],
    tags: [[], [Validators.required]],
    sex: [undefined, [Validators.required]],
    size: [undefined, [Validators.required]],
    sizeEstimated: [false],
    description: ['']
  });

  constructor(
    private fb: FormBuilder
  ) {

  }

  ngOnInit() {
  }
}
