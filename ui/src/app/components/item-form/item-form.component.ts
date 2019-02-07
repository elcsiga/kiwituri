import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ItemBody} from "../../../../../server/src/common/interfaces/item";
import {Location} from "@angular/common";
import {ConfigService} from "../../services/config.service";

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {

  @Input() item: ItemBody;
  @Input() submitLabel: string;
  @Output() submitForm: EventEmitter<ItemBody> = new EventEmitter();

  uploadForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private configService: ConfigService
  ) {

  }

  setting$ = this.configService.settings$;

  ngOnInit(): void {
    this.uploadForm = this.fb.group({
      thumbnail: [this.item.thumbnail, [Validators.required]],
      images: [this.item.images],
      category: [this.item.category, [Validators.required]],
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
