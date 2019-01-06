import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FileUploadComponent} from "./components/file-upload/file-upload.component";
import {UploadIndicatorComponent} from "./components/upload-indicator/upload-indicator.component";
import {UploadService} from "./services/upload.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FileUploadComponent,
    UploadIndicatorComponent
  ],
  exports: [
    FileUploadComponent,
    UploadIndicatorComponent
  ],
  providers: [
    UploadService
  ]
})
export class UploadModule { }
