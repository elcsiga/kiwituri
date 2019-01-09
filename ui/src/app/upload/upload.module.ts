import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FileUploadDropzoneComponent} from "./components/file-upload-dropzone/file-upload-dropzone.component";
import {UploadIndicatorComponent} from "./components/upload-indicator/upload-indicator.component";
import {UploadService} from "./services/upload.service";
import {MatButtonModule, MatIconModule, MatProgressBarModule} from "@angular/material";
import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';
import { UploadButtonComponent } from './components/upload-button/upload-button.component';

@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [
    FileUploadDropzoneComponent,
    UploadIndicatorComponent,
    ThumbnailComponent,
    UploadButtonComponent
  ],
  exports: [
    FileUploadDropzoneComponent,
    UploadIndicatorComponent,
    ThumbnailComponent,
    UploadButtonComponent
  ],
  providers: [
    UploadService
  ]
})
export class UploadModule { }
