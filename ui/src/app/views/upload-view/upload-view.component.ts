import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-upload-view',
  templateUrl: './upload-view.component.html',
  styleUrls: ['./upload-view.component.css']
})
export class UploadViewComponent {

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
    thumbnail: [null, [Validators.required]],
    images: [[]],
    tags: [[]],
    sex: [undefined, [Validators.required]],
    size: [undefined, [Validators.required]],
    sizeEstimated: [false],
    description: ['']
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {

  }

  submit() {
    if (this.uploadForm.valid) {
      this.http.post('/api/items', this.uploadForm.value)
        .subscribe( response => {
          console.log(response);
          this.router.navigate(['/']);
        }, error => {
          alert('NEM SIKERÜLT A FELTÜLTÉS');
          console.error(error);
        })
    } else {
      console.error('Trying to submit an invalid form...');
    }
  }

}
