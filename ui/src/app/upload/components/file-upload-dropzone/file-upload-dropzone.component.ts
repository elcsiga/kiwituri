import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload-dropzone.component.html',
  styleUrls: ['./file-upload-dropzone.component.css']
})
export class FileUploadDropzoneComponent implements OnInit {

  dragging = 0;

  @Input() multiple = false;
  @Output() drop : EventEmitter<File[] | File> = new EventEmitter<File[] | File>();

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

    if (this.multiple && $event.dataTransfer.files.length > 0) {
      const files = [];
      for (let i = 0; i < $event.dataTransfer.files.length; i++) {
        files.push($event.dataTransfer.files[i])
      }
      if (files.length > 0) {
        this.drop.emit(files);
      }
    }
    if (!this.multiple && $event.dataTransfer.files.length === 1) {
      this.drop.emit($event.dataTransfer.files[0]);
    }
  }
}
