
import { Component, forwardRef, HostBinding, Input } from '@angular/core';
import { UploadedFile } from "../../../../../server/src/common/interfaces/upload";
import { UploadService } from "../../upload/services/upload.service";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: 'app-multiple-attachment-control',
  templateUrl: './multiple-attachment-control.component.html',
  styleUrls: ['./multiple-attachment-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultipleAttachmentControlComponent),
      multi: true
    }
  ]
})
export class MultipleAttachmentControlComponent implements ControlValueAccessor {

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
      this.onChange(this.uploadedFiles);
    });
  }

  onChange: (uploadedFiles: UploadedFile[]) => void = () => null;
  onTouched: () => void = () => null;

  writeValue(uploadedFiles: UploadedFile[]): void {
    this.uploadedFiles = uploadedFiles;
    this.onChange(this.uploadedFiles);
  }

  registerOnChange(fn: (uploadedFiles: UploadedFile[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  removeFile(index: number) {
    this.uploadedFiles.splice(index,1);
  }
}
