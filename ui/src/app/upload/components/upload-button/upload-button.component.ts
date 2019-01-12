import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {UploadService} from "../../services/upload.service";

@Component({
  selector: 'app-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.css']
})
export class UploadButtonComponent implements OnInit {

  @ViewChild("hiddenInputField") hiddenInputField: ElementRef;
  @Input() multiple = false;
  @Output() selected: EventEmitter<File[] | File> = new EventEmitter<File[] | File>();
  constructor(private uploadService: UploadService) { }

  ngOnInit() {
  }

  getAcceptPattern() {
    return this.uploadService.acceptPattern;
  }
  selectFiles() {
    this.hiddenInputField.nativeElement.click()
  }
  onFilesSelected($event) {
    if (this.multiple && $event.target.files.length > 0) {
      const files: File[] = [];
      for (let i = 0; i < $event.target.files.length; i++) {
        files.push($event.target.files[i]);
      }
      this.selected.emit(files);
    }
    if (!this.multiple && $event.target.files.length === 1) {
      this.selected.emit($event.target.files[0]);
    }
  }
}
