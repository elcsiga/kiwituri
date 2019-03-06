import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ItemBody, ItemStatus} from "../../../../../server/src/common/interfaces/item";
import {ConfigService} from "../../services/config.service";
import {UserService} from "../../services/user.service";
import {RouterUtilsService} from "../../services/router-utils.service";
import {ItemService} from "../../services/item.service";

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
    private routerUtilsService: RouterUtilsService,
    private configService: ConfigService,
    private userService: UserService
  ) {

  }

  setting$ = this.configService.settings$;
  users$ = this.userService.getUserList();

  ngOnInit(): void {
    this.uploadForm = this.fb.group({
      thumbnail: [this.item.thumbnail, [Validators.required]],
      images: [this.item.images],
      category: [this.item.category, [Validators.required]],
      tags: [this.item.tags],
      sex: [this.item.sex, [Validators.required]],
      size: [this.item.size, [Validators.required]],
      sizeEstimated: [this.item.sizeEstimated],
      description: [this.item.description],
      status: [this.item.status || 'STATUS2_ACTIVE'],
      store: [this.item.store]
    });
  }

  onSubmit() {
    if (this.uploadForm.valid) {
      const modifiedItem: ItemBody = this.uploadForm.value;
      if (this.item.order && this.isOrderAplicable()) {
        modifiedItem.order = this.item.order;
      }
      this.submitForm.emit();
    } else {
      console.error('Trying to submit an invalid form...');
    }
  }

  navigateBack(event) {
    event.preventDefault();
    this.routerUtilsService.goBack('/shop');
  }

  isOrderAplicable() {
    switch ( this.uploadForm.controls['status'].value as ItemStatus) {
      case 'STATUS3_ORDERED':
      case 'STATUS4_SHIPPED':
      case 'STATUS5_SOLD':
        return true;
      case 'STATUS1_HIDDEN':
      case 'STATUS2_ACTIVE':
      default:
       return false;
    }
  }
}
