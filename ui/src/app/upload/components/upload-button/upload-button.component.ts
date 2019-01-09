import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {UploadService} from "../../services/upload.service";

@Component({
  selector: 'app-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.css']
})
export class UploadButtonComponent implements OnInit {

  @ViewChild("hiddenInputField") hiddenInputField: ElementRef;

  @Output() selected: EventEmitter<File[]> = new EventEmitter<File[]>();
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
    const files: File[] = [];
    for (let i = 0; i < $event.target.files.length; i++) {
      files.push($event.target.files[i]);
    }
    this.selected.emit(files);
  }
}
