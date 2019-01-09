import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload-dropzone.component.html',
  styleUrls: ['./file-upload-dropzone.component.css']
})
export class FileUploadDropzoneComponent implements OnInit {

  dragging = 0;

  @Output() drop : EventEmitter<File[]> = new EventEmitter<File[]>();

  constructor() {
  }

  ngOnInit() {
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

    this.drop.emit(files);
  }
}
