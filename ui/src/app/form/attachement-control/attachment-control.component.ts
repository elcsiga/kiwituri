import { Component, forwardRef, HostBinding, Input } from '@angular/core';
import { UploadedFile } from "../../../../../server/src/common/interfaces/upload";
import { UploadService } from "../../upload/services/upload.service";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: 'app-attachment-control',
  templateUrl: './attachment-control.component.html',
  styleUrls: ['./attachment-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AttachmentControlComponent),
      multi: true
    }
  ]
})
export class AttachmentControlComponent implements ControlValueAccessor {

  uploadedFile: UploadedFile = null;
  report$ = this.uploadService.reports.value$;

  @Input() disabled = false;
  @HostBinding('style.opacity')
  get opacity() {
    return this.disabled ? 0.25 : 1;
  }

  constructor(
    private uploadService: UploadService,
  ) { }

  onFilesDropped(file: File) {
    this.uploadService.uploadFiles([file]).subscribe( uploadedFile => {
      this.uploadedFile = uploadedFile;
      this.onChange(this.uploadedFile);
    });
  }

  onChange: (uploadedFiles: UploadedFile) => void = () => null;
  onTouched: () => void = () => null;

  writeValue(uploadedFile: UploadedFile): void {
    this.uploadedFile = uploadedFile;
    this.onChange(this.uploadedFile);
  }

  registerOnChange(fn: (uploadedFile: UploadedFile) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
