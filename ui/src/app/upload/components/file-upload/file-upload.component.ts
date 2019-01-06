import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType, HttpRequest} from "@angular/common/http";
import {UploadService} from "../../services/upload.service";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  dragging = 0;

  constructor(
    private uploadService: UploadService
  ) {
  }

  getAcceptPattern() {
    return this.uploadService.acceptPattern;
  }

  @ViewChild("hiddenInputField") hiddenInputField: ElementRef;

  ngOnInit() {
  }

  onClick() {
    this.hiddenInputField.nativeElement.click()
  }

  onFilesSelected($event) {
    const files: File[] = [];
    for (let i = 0; i < $event.target.files.length; i++) {
      files.push($event.target.files[i]);
    }
    this.uploadService.uploadFiles(files);
  }

  onDragEnter($event) {
    this.dragging++;
    $event.preventDefault();
  }

  onDragLeave($event) {
    this.dragging--;
    $event.preventDefault();
  }

  onDragOver($event) {
    $event.preventDefault();
  }

  onDrop($event) {
    this.dragging = 0;
    $event.preventDefault();

    const files = [];
    for (let i = 0; i < $event.dataTransfer.files.length; i++) {
      files.push($event.dataTransfer.files[i])
    }
    this.uploadService.uploadFiles(files);
  }
}
