import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagControlComponent } from './tag-control/tag-control.component';
import { ReactiveFormsModule } from "@angular/forms";
import {
  MatAutocompleteModule, MatChipsModule, MatIconModule, MatInputModule
} from "@angular/material";
import { AttachementControlComponent } from './attachement-control/attachement-control.component';
import { UploadModule } from "../upload/upload.module";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatInputModule,
    MatIconModule,
    MatAutocompleteModule,
    UploadModule
  ],
  declarations: [
    TagControlComponent,
    AttachementControlComponent
  ],
  exports: [
    TagControlComponent,
    AttachementControlComponent
  ]
})
export class FormModule { }
