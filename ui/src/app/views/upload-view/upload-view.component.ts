import { Component, OnInit } from '@angular/core';
import {UploadService} from "../../upload/services/upload.service";

@Component({
  selector: 'app-upload-view',
  templateUrl: './upload-view.component.html',
  styleUrls: ['./upload-view.component.css']
})
export class UploadViewComponent implements OnInit {

  report$ = this.uploadService.reports.value$;

  constructor(
    private uploadService: UploadService) {
  }

  ngOnInit() {
  }

}
