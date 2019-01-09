import {Component, Input, OnInit} from '@angular/core';
import {Report} from "../../services/upload.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-upload-indicator',
  templateUrl: './upload-indicator.component.html',
  styleUrls: ['./upload-indicator.component.css']
})
export class UploadIndicatorComponent implements OnInit {

  @Input() report: Observable<Report>;

  constructor() {

  }

  ngOnInit() {
  }

  getProgressValue(status) {
    if (status === 0) return 0;
    if (status > 0) return status;
    if (status === "done") return 100;
    return 0;
  }
}
