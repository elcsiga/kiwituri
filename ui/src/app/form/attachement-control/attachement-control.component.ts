import { Component, forwardRef, HostBinding, Input } from '@angular/core';
import { UploadedFile } from "../../../../../server/src/common/interfaces/upload";
import { UploadService } from "../../upload/services/upload.service";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { TagControlComponent } from "../tag-control/tag-control.component";

@Component({
  selector: 'app-attachement-control',
  templateUrl: './attachement-control.component.html',
  styleUrls: ['./attachement-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AttachementControlComponent),
      multi: true
    }
  ]
})
export class AttachementControlComponent implements ControlValueAccessor {

  uploadedFiles: UploadedFile[] = [];

  report$ = this.uploadService.reports.value$;

  @Input() disabled = false;
  @HostBinding('style.opacity')
  get opacity() {
    return this.disabled ? 0.25 : 1;
  }

  constructor(
    private uploadService: UploadService,
  ) { }

  onFilesDropped(files: File[]) {
    this.uploadService.uploadFiles(files).subscribe( uploadedFile => {
      this.uploadedFiles.push(uploadedFile);
    });
  }

  // Function to call when the rating changes.
  onChange = (uploadedFiles: UploadedFile[]) => {};

  // Function to call when the input is touched (when a star is clicked).
  onTouched = () => {};

  // Allows Angular to update the model (rating).
  // Update the model and changes needed for the view here.
  writeValue(uploadedFiles: UploadedFile[]): void {
    this.uploadedFiles = uploadedFiles;
    this.onChange(this.uploadedFiles);
  }

  // Allows Angular to register a function to call when the model (rating) changes.
  // Save the function as a property to call later here.
  registerOnChange(fn: (uploadedFiles: UploadedFile[]) => void): void {
    this.onChange = fn;
  }

  // Allows Angular to register a function to call when the input has been touched.
  // Save the function as a property to call later here.
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Allows Angular to disable the input.
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
