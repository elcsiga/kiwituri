import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagControlComponent } from './tag-control/tag-control.component';
import { ReactiveFormsModule } from "@angular/forms";
import {
  MatAutocompleteModule, MatChipsModule, MatIconModule, MatInputModule
} from "@angular/material";
import { AttachmentControlComponent } from './attachement-control/attachment-control.component';
import { UploadModule } from "../upload/upload.module";
import { MultipleAttachmentControlComponent } from './multiple-attachment-control/multiple-attachment-control.component';

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
    AttachmentControlComponent,
    MultipleAttachmentControlComponent
  ],
  exports: [
    TagControlComponent,
    AttachmentControlComponent,
    MultipleAttachmentControlComponent
  ]
})
export class FormModule { }
