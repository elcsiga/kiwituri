import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {allTags, sexes, sizes} from "../../../../../server/src/common/attributes";
import {ItemBody} from "../../../../../server/src/common/interfaces/item";
import {Location} from "@angular/common";

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {

  @Input() item: ItemBody;
  @Input() submitLabel: string;
  @Output() submitForm: EventEmitter<ItemBody> = new EventEmitter();

  allTags = allTags;
  sexes = sexes;
  sizes = sizes;

  uploadForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private location: Location
  ) {

  }

  ngOnInit(): void {
    this.uploadForm = this.fb.group({
      thumbnail: [this.item.thumbnail, [Validators.required]],
      images: [this.item.images],
      tags: [this.item.tags],
      sex: [this.item.sex, [Validators.required]],
      size: [this.item.size, [Validators.required]],
      sizeEstimated: [this.item.sizeEstimated],
      description: [this.item.description]
    });
  }

  onSubmit() {
    if (this.uploadForm.valid) {
      this.submitForm.emit(this.uploadForm.value);
    } else {
      console.error('Trying to submit an invalid form...');
    }
  }

  navigateBack(event) {
    event.preventDefault();
    this.location.back();
  }
}
